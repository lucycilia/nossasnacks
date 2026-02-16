import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nossa Snacks — Em breve",
  description: "Snacks brasileiros incríveis chegando em breve. Entre na lista de espera.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
