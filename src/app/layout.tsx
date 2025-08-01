import type { Metadata } from "next";
import { Fira_Code, Inconsolata, Bitcount_Grid_Double, Inter } from "next/font/google";
import "./globals.css";

const firaCode = Fira_Code({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fira-code",
});

const inconsolata = Inconsolata({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inconsolata",
});

const bitcountGridDouble = Bitcount_Grid_Double({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bitcount-grid-double",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fira-code",
});

export const metadata: Metadata = {
  title: "Gym_Mania",
  description: "Get fit and healthy with GYM_MANIA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${firaCode.variable} ${inconsolata.variable} ${bitcountGridDouble.variable} ${inter.variable}`}>
      <body className="font-fira">

        {children}
      </body>
    </html>
  );
}