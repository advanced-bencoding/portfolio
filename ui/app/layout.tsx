import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Benjamin Joseph",
  description: "Portfolio of Benjamin Joseph, a full stack engineer experienced in React, .NET Core, SQL Server",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <body className="h-screen">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
