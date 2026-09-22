import type { Metadata } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-archivo",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "IMPACTA | AI Accident Intelligence & Claims Intake",
  description: "AI-native road-accident intelligence and insurance claims-intake platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${archivo.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen bg-[#F4F5F3] text-[#090A0A] font-sans antialiased selection:bg-[#090A0A] selection:text-white">
        {children}
      </body>
    </html>
  );
}
