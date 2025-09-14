import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

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
      <body className={`${iranyekan.className} min-h-screen`}>
        {children}
      </body>
    </html>
  );
}

