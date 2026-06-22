import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ezzeta Backoffice",
  description: "Panel de productos e inventario de Ezzeta",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}