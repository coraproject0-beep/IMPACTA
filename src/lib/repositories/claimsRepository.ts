import { Claim, ClaimStatus, Reviewer } from "@/types";
import { DriverDraft } from "@/types/driver";
import { MOCK_CLAIMS } from "@/data/fixtures/claimsFixture";
import { MOCK_REVIEWERS } from "@/data/fixtures/reviewersFixture";
import { mapDriverDraftToClaim } from "@/lib/mappers/driverToClaimMapper";
import { clearAllMediaBlobs } from "./mediaStorage";

const STORAGE_KEY = "impacta_claims_v1";

export interface ClaimsRepository {
  getAll(): Promise<Claim[]>;
  getById(id: string): Promise<Claim | null>;
  getReviewers(): Promise<Reviewer[]>;
  addClaim(claim: Claim): Promise<Claim>;
  createFromDriverDraft(draft: DriverDraft): Promise<Claim>;
  updateStatus(id: string, status: ClaimStatus, actorName?: string): Promise<Claim>;
  assignReviewer(id: string, reviewerId: string | null, actorName?: string): Promise<Claim>;
  updateNotes(id: string, notes: string): Promise<Claim>;
  confirmCAIField(id: string, fieldId: string, confirmed: boolean, actorName?: string): Promise<Claim>;
  updateCAIField(id: string, fieldId: string, value: string, actorName?: string): Promise<Claim>;
  generateCAIDraft(id: string, actorName?: string): Promise<Claim>;
  confirmInference(id: string, inferenceId: string, confirmed: boolean, actorName?: string): Promise<Claim>;
  resetToDefaults(): Promise<void>;
}

class PersistentClaimsRepository implements ClaimsRepository {
  private claims: Claim[] = [];
  private reviewers: Reviewer[] = [];
  private initialized: boolean = false;

  constructor() {
    this.reviewers = [...MOCK_REVIEWERS];
    // Lazy initialize on first call to support SSR
  }

  private initIfNeeded() {
    if (this.initialized) return;

    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            this.claims = parsed;
            this.initialized = true;
            return;
          }
        }
      } catch (err) {
        console.warn("Could not read localStorage for claims, using default fixtures", err);
      }
    }

    // Default fallback
    this.claims = JSON.parse(JSON.stringify(MOCK_CLAIMS));
    this.saveToStorage();
    this.initialized = true;
  }

  private saveToStorage() {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.claims));
      } catch (err) {
        console.error("Failed to save claims to localStorage", err);
      }
    }
  }

  async getAll(): Promise<Claim[]> {
    this.initIfNeeded();
    return JSON.parse(JSON.stringify(this.claims));
  }

  async getById(id: string): Promise<Claim | null> {
    this.initIfNeeded();
    const found = this.claims.find((c) => c.id.toLowerCase() === id.toLowerCase());
    if (!found) return null;
    return JSON.parse(JSON.stringify(found));
  }

  async getReviewers(): Promise<Reviewer[]> {
    return [...this.reviewers];
  }

  async addClaim(claim: Claim): Promise<Claim> {
    this.initIfNeeded();
    // Prepend new claim so it appears at top of ledger
    this.claims = [claim, ...this.claims.filter((c) => c.id !== claim.id)];
    this.saveToStorage();
    return JSON.parse(JSON.stringify(claim));
  }

  async createFromDriverDraft(draft: DriverDraft): Promise<Claim> {
    this.initIfNeeded();
    const claim = mapDriverDraftToClaim(draft, this.claims.length);
    await this.addClaim(claim);
    return claim;
  }

  async updateStatus(id: string, status: ClaimStatus, actorName = "Reviewer"): Promise<Claim> {
    this.initIfNeeded();
    const claim = this.claims.find((c) => c.id.toLowerCase() === id.toLowerCase());
    if (!claim) throw new Error(`Claim ${id} not found`);

    const oldStatus = claim.status;
    claim.status = status;
    claim.auditTrail.unshift({
      id: `aud-${Date.now()}`,
      timestamp: new Date().toISOString(),
      actor: "REVIEWER",
      actorName,
      action: `Status transitioned from ${oldStatus} to ${status}`,
      objectAffected: `ClaimStatus`,
    });

    this.saveToStorage();
    return JSON.parse(JSON.stringify(claim));
  }

  async assignReviewer(id: string, reviewerId: string | null, actorName = "Reviewer"): Promise<Claim> {
    this.initIfNeeded();
    const claim = this.claims.find((c) => c.id.toLowerCase() === id.toLowerCase());
    if (!claim) throw new Error(`Claim ${id} not found`);

    if (!reviewerId) {
      claim.assignee = null;
      claim.auditTrail.unshift({
        id: `aud-${Date.now()}`,
        timestamp: new Date().toISOString(),
        actor: "REVIEWER",
        actorName,
        action: `Reviewer assignment cleared`,
        objectAffected: `ClaimAssignee`,
      });
    } else {
      const rev = this.reviewers.find((r) => r.id === reviewerId);
      if (rev) {
        claim.assignee = rev;
        claim.auditTrail.unshift({
          id: `aud-${Date.now()}`,
          timestamp: new Date().toISOString(),
          actor: "REVIEWER",
          actorName,
          action: `Assigned claim to ${rev.name} (${rev.role})`,
          objectAffected: `ClaimAssignee`,
        });
      }
    }

    this.saveToStorage();
    return JSON.parse(JSON.stringify(claim));
  }

  async updateNotes(id: string, notes: string): Promise<Claim> {
    this.initIfNeeded();
    const claim = this.claims.find((c) => c.id.toLowerCase() === id.toLowerCase());
    if (!claim) throw new Error(`Claim ${id} not found`);

    claim.reviewerNotes = notes;
    this.saveToStorage();
    return JSON.parse(JSON.stringify(claim));
  }

  async confirmCAIField(id: string, fieldId: string, confirmed: boolean, actorName = "Reviewer"): Promise<Claim> {
    this.initIfNeeded();
    const claim = this.claims.find((c) => c.id.toLowerCase() === id.toLowerCase());
    if (!claim) throw new Error(`Claim ${id} not found`);

    const field = claim.caiFields.find((f) => f.id === fieldId);
    if (field) {
      field.isConfirmed = confirmed;
      if (confirmed) {
        field.requiresConfirmation = false;
      }
      claim.auditTrail.unshift({
        id: `aud-${Date.now()}`,
        timestamp: new Date().toISOString(),
        actor: "REVIEWER",
        actorName,
        action: `${confirmed ? "Confirmed" : "Revoked confirmation on"} CAI field [${field.code}] ${field.label}`,
        objectAffected: `CAIField:${field.code}`,
      });
    }

    this.saveToStorage();
    return JSON.parse(JSON.stringify(claim));
  }

  async updateCAIField(id: string, fieldId: string, value: string, actorName = "Reviewer"): Promise<Claim> {
    this.initIfNeeded();
    const claim = this.claims.find((c) => c.id.toLowerCase() === id.toLowerCase());
    if (!claim) throw new Error(`Claim ${id} not found`);

    const field = claim.caiFields.find((f) => f.id === fieldId);
    if (field) {
      const prev = field.value;
      field.value = value;
      field.isConfirmed = true;
      field.requiresConfirmation = false;
      field.provenance = "MANUAL";
      claim.auditTrail.unshift({
        id: `aud-${Date.now()}`,
        timestamp: new Date().toISOString(),
        actor: "REVIEWER",
        actorName,
        action: `Manually updated CAI field [${field.code}] "${prev}" -> "${value}"`,
        objectAffected: `CAIField:${field.code}`,
      });
    }

    this.saveToStorage();
    return JSON.parse(JSON.stringify(claim));
  }

  async generateCAIDraft(id: string, actorName = "Reviewer"): Promise<Claim> {
    this.initIfNeeded();
    const claim = this.claims.find((c) => c.id.toLowerCase() === id.toLowerCase());
    if (!claim) throw new Error(`Claim ${id} not found`);

    claim.caiDraftGenerated = true;
    claim.caiDraftGeneratedAt = new Date().toISOString();
    claim.status = "CAI_READY";

    claim.auditTrail.unshift({
      id: `aud-${Date.now()}`,
      timestamp: new Date().toISOString(),
      actor: "REVIEWER",
      actorName,
      action: `Generated standardized CAI draft dossier (v1.0-draft)`,
      objectAffected: `CAIWorkspace`,
    });

    this.saveToStorage();
    return JSON.parse(JSON.stringify(claim));
  }

  async confirmInference(id: string, inferenceId: string, confirmed: boolean, actorName = "Reviewer"): Promise<Claim> {
    this.initIfNeeded();
    const claim = this.claims.find((c) => c.id.toLowerCase() === id.toLowerCase());
    if (!claim) throw new Error(`Claim ${id} not found`);

    const inf = claim.aiAnalysis.inferences.find((i) => i.id === inferenceId);
    if (inf) {
      inf.isConfirmedByReviewer = confirmed;
      claim.auditTrail.unshift({
        id: `aud-${Date.now()}`,
        timestamp: new Date().toISOString(),
        actor: "REVIEWER",
        actorName,
        action: `${confirmed ? "Validated" : "Unmarked"} AI inference: "${inf.title}"`,
        objectAffected: `AIInference:${inf.id}`,
      });
    }

    this.saveToStorage();
    return JSON.parse(JSON.stringify(claim));
  }

  async resetToDefaults(): Promise<void> {
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem("impacta_driver_draft_v1");
        await clearAllMediaBlobs();
      } catch (err) {
        console.error("Error clearing local storage", err);
      }
    }
    this.claims = JSON.parse(JSON.stringify(MOCK_CLAIMS));
    this.saveToStorage();
  }
}

export const claimsRepository: ClaimsRepository = new PersistentClaimsRepository();
