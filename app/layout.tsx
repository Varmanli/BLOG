import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Header from "./-component/Header";
import Footer from "./-component/Footer";
import ThemeProvider from "./context/ThemeProvider";

const iranyekan = localFont({
  src: "../public/IRANYekan.ttf",
});

export const metadata: Metadata = {
  title: "Varmanli Blog",
  description: "وبلاگ های برنامه نویسی",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body className={iranyekan.className}>
        <ThemeProvider>
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
