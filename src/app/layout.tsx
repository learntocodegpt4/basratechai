import type { Metadata } from "next";
import "./globals.css";
import MuiProvider from "@/components/MuiProvider";
import { AuthProvider } from "@/contexts/AuthContext";

export const metadata: Metadata = {
  title: "BasraTech AI - Future Ready | AI Solutions & Digital Innovation",
  description: "BasraTech AI provides cutting-edge artificial intelligence solutions, machine learning services, and digital transformation for enterprises. Future Ready technology partner.",
  keywords: "AI, Artificial Intelligence, Machine Learning, Digital Transformation, BasraTech, Technology Solutions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">
        <MuiProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </MuiProvider>
      </body>
    </html>
  );
}
