import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Movie Insight Builder",
  description:
    "Analyze movie details and audience sentiment using AI. Built with Next.js and OpenAI.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="animated-bg min-h-screen">
        {children}
      </body>
    </html>
  );
}