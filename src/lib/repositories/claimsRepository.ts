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
    if (typeof window !== "undefined") {
      try {
        const res = await fetch("/api/claims");
        if (res.ok) {
          const data = await res.json();
          if (data.claims && Array.isArray(data.claims) && data.claims.length > 0) {
            const serverIds = new Set(data.claims.map((c: Claim) => c.id.toLowerCase()));
            const localOnly = this.claims.filter((c) => !serverIds.has(c.id.toLowerCase()));
            this.claims = [...data.claims, ...localOnly];
            this.saveToStorage();
          }
        }
      } catch (e) {
        console.warn("Could not fetch claims from /api/claims, using cache", e);
      }
    }
    return JSON.parse(JSON.stringify(this.claims));
  }

  async getById(id: string): Promise<Claim | null> {
    this.initIfNeeded();
    if (typeof window !== "undefined" && id) {
      try {
        const res = await fetch(`/api/claims/${id}`);
        if (res.ok) {
          const data = await res.json();
          if (data.claim) {
            const idx = this.claims.findIndex((c) => c.id.toLowerCase() === id.toLowerCase());
            if (idx >= 0) {
              this.claims[idx] = data.claim;
            } else {
              this.claims.unshift(data.claim);
            }
            this.saveToStorage();
            return JSON.parse(JSON.stringify(data.claim));
          }
        }
      } catch (e) {
        console.warn(`Could not fetch claim ${id} from server:`, e);
      }
    }

    if (!id) return this.claims.length > 0 ? JSON.parse(JSON.stringify(this.claims[0])) : null;
    const found = this.claims.find((c) => c.id.toLowerCase() === id.toLowerCase());
    if (found) return JSON.parse(JSON.stringify(found));
    const numMatch = id.match(/(\d{3})$/);
    if (numMatch) {
      const byNum = this.claims.find((c) => c.id.endsWith(numMatch[1]));
      if (byNum) return JSON.parse(JSON.stringify(byNum));
    }
    return this.claims.length > 0 ? JSON.parse(JSON.stringify(this.claims[0])) : null;
  }

  async getReviewers(): Promise<Reviewer[]> {
    return [...this.reviewers];
  }

  async addClaim(claim: Claim): Promise<Claim> {
    this.initIfNeeded();
    // Prepend new claim so it appears at top of ledger
    this.claims = [claim, ...this.claims.filter((c) => c.id !== claim.id)];
    this.saveToStorage();

    if (typeof window !== "undefined") {
      try {
        await fetch("/api/claims", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(claim),
        });
      } catch (e) {
        console.warn("Could not sync added claim to /api/claims:", e);
      }
    }

    return JSON.parse(JSON.stringify(claim));
  }

  async createFromDriverDraft(draft: DriverDraft): Promise<Claim> {
    this.initIfNeeded();
    const claim = mapDriverDraftToClaim(draft, this.claims.length);
    await this.addClaim(claim);
    return claim;
  }

  private async syncPatch(id: string, patch: any) {
    if (typeof window !== "undefined") {
      try {
        await fetch(`/api/claims/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(patch),
        });
      } catch (e) {
        console.warn(`Could not sync claim ${id} patch to server:`, e);
      }
    }
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
    this.syncPatch(claim.id, { status: claim.status, audit_trail: claim.auditTrail });
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
    this.syncPatch(claim.id, { audit_trail: claim.auditTrail });
    return JSON.parse(JSON.stringify(claim));
  }

  async updateNotes(id: string, notes: string): Promise<Claim> {
    this.initIfNeeded();
    const claim = this.claims.find((c) => c.id.toLowerCase() === id.toLowerCase());
    if (!claim) throw new Error(`Claim ${id} not found`);

    claim.reviewerNotes = notes;
    this.saveToStorage();
    this.syncPatch(claim.id, { reviewer_notes: notes });
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
    this.syncPatch(claim.id, { cai_fields: claim.caiFields, audit_trail: claim.auditTrail });
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

      this.syncPatch(claim.id, {
        cai_fields: claim.caiFields,
        audit_trail: claim.auditTrail,
        reviewEvent: {
          fieldKey: field.code,
          originalValue: prev,
          correctedValue: value,
          reviewType: "driver_correction",
          reviewerRole: actorName.toLowerCase().includes("driver") ? "driver" : "adjuster",
        },
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
