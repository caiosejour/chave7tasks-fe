import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {

  title: "C7 - Tasks",
  description: "Gerenciador de Tarefas Chave7",

}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>

        {children}

      </body>
    </html>
  );
}
