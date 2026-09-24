import { redirect } from "next/navigation";

export default function LegacyOverviewPage() {
  redirect("/console/overview");
}
