import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HireU - UI Demo",
  description: "Frontend UI demonstration for HireU platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

