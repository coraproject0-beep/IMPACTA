import { redirect } from "next/navigation";

export default function LegacyAnalyticsPage() {
  redirect("/console/analytics");
}
