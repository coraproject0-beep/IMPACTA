import { Claim } from "@/types";

export function exportClaimAsJson(claim: Claim): void {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(claim, null, 2));
  const downloadAnchor = document.createElement("a");
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `${claim.id}_IMPACTA_DOSSIER.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}
