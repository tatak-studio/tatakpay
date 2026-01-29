import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tatak Pay",
  description: "Fast & Secure Payments powered by Xendit",
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactNode {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
