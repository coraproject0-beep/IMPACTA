import { redirect } from "next/navigation";

export default function LegacyClaimDetailPage({
  params,
}: {
  params: { id: string };
}) {
  redirect(`/console/claims/${params.id}`);
}
