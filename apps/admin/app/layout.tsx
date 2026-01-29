import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tatak Pay - Admin",
  description: "Tatak Pay Owner Portal",
  icons: {
    icon: "/logo.jpg",
  },
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
