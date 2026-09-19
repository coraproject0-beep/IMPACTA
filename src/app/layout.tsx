import type { Metadata } from "next";
import "./globals.css";
import { GlobalShell } from "@/components/shell/GlobalShell";

export const metadata: Metadata = {
  title: "IMPACTA | Claims Intelligence Console",
  description: "AI-native road-accident intelligence and insurance claims-intake platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">
        <GlobalShell>{children}</GlobalShell>
      </body>
    </html>
  );
}
