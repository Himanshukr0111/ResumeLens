import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ResumeLens — Premium AI Resume Intelligence & Design System",
  description:
    "Design system and component foundation for ResumeLens, inspired by Linear, Stripe, and Apple.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full font-sans bg-background text-foreground antialiased selection:bg-brand-100 selection:text-brand-900">
        {children}
      </body>
    </html>
  );
}
