import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import localFont from "@next/font/local";
import Header from "./-component/Header";
import Footer from "./-component/Footer";

const inter = Inter({ subsets: ["latin"] });

const iranyekan = localFont({
  src: "../public/IRANYekan.ttf",
});

export const metadata: Metadata = {
  title: "Varmanli Blog",
  description: "وبلاگ های برنامه نویسی",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html dir="rtl">
      <body className={iranyekan.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
