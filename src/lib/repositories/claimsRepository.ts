import { Claim, ClaimStatus, Reviewer } from "@/types";
import { MOCK_CLAIMS } from "@/data/fixtures/claimsFixture";
import { MOCK_REVIEWERS } from "@/data/fixtures/reviewersFixture";

export interface ClaimsRepository {
  getAll(): Promise<Claim[]>;
  getById(id: string): Promise<Claim | null>;
  getReviewers(): Promise<Reviewer[]>;
  updateStatus(id: string, status: ClaimStatus, actorName?: string): Promise<Claim>;
  assignReviewer(id: string, reviewerId: string | null, actorName?: string): Promise<Claim>;
  updateNotes(id: string, notes: string): Promise<Claim>;
  confirmCAIField(id: string, fieldId: string, confirmed: boolean, actorName?: string): Promise<Claim>;
  updateCAIField(id: string, fieldId: string, value: string, actorName?: string): Promise<Claim>;
  generateCAIDraft(id: string, actorName?: string): Promise<Claim>;
  confirmInference(id: string, inferenceId: string, confirmed: boolean, actorName?: string): Promise<Claim>;
}

class LocalClaimsRepository implements ClaimsRepository {
  private claims: Claim[];
  private reviewers: Reviewer[];

  constructor() {
    // Deep clone initial fixture to allow local in-memory mutations
    this.claims = JSON.parse(JSON.stringify(MOCK_CLAIMS));
    this.reviewers = [...MOCK_REVIEWERS];
  }

  async getAll(): Promise<Claim[]> {
    return JSON.parse(JSON.stringify(this.claims));
  }

  async getById(id: string): Promise<Claim | null> {
    const found = this.claims.find((c) => c.id.toLowerCase() === id.toLowerCase());
    if (!found) return null;
    return JSON.parse(JSON.stringify(found));
  }

  async getReviewers(): Promise<Reviewer[]> {
    return [...this.reviewers];
  }

  async updateStatus(id: string, status: ClaimStatus, actorName = "Reviewer"): Promise<Claim> {
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

    return JSON.parse(JSON.stringify(claim));
  }

  async assignReviewer(id: string, reviewerId: string | null, actorName = "Reviewer"): Promise<Claim> {
    const claim = this.claims.find((c) => c.id.toLowerCase() === id.toLowerCase());
    if (!claim) throw new Error(`Claim ${id} not found`);

    if (!reviewerId) {
      claim.assignee = null;
      claim.auditTrail.unshift({
        id: `aud-${Date.now()}`,
        timestamp: new Date().toISOString(),
        actor: "REVIEWER",
        actorName,
        action: `Reviewer assignment unassigned`,
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

    return JSON.parse(JSON.stringify(claim));
  }

  async updateNotes(id: string, notes: string): Promise<Claim> {
    const claim = this.claims.find((c) => c.id.toLowerCase() === id.toLowerCase());
    if (!claim) throw new Error(`Claim ${id} not found`);

    claim.reviewerNotes = notes;
    return JSON.parse(JSON.stringify(claim));
  }

  async confirmCAIField(id: string, fieldId: string, confirmed: boolean, actorName = "Reviewer"): Promise<Claim> {
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

    return JSON.parse(JSON.stringify(claim));
  }

  async updateCAIField(id: string, fieldId: string, value: string, actorName = "Reviewer"): Promise<Claim> {
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

    return JSON.parse(JSON.stringify(claim));
  }

  async generateCAIDraft(id: string, actorName = "Reviewer"): Promise<Claim> {
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

    return JSON.parse(JSON.stringify(claim));
  }

  async confirmInference(id: string, inferenceId: string, confirmed: boolean, actorName = "Reviewer"): Promise<Claim> {
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

    return JSON.parse(JSON.stringify(claim));
  }
}

// Singleton instance for client runtime
export const claimsRepository: ClaimsRepository = new LocalClaimsRepository();
