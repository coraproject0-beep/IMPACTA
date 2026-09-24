import React from "react";
import type { Metadata } from "next";
import { GlobalShell } from "@/components/shell/GlobalShell";

export const metadata: Metadata = {
  title: "IMPACTA Console | Claims Operations",
  description: "Road accident intelligence and insurance claims-intake console",
};

export default function ConsoleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
