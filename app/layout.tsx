import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "./-component/ScrollToTop";

const vazir = Vazirmatn({
  subsets: ["latin", "arabic"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "NexPad | آموزش برنامه نویسی مدرن",
  description:
    "NexPad یک وبلاگ تخصصی برای یادگیری برنامه نویسی مدرن است. اینجا می‌توانید آموزش‌های جامع و کاربردی درباره JavaScript، React، Next.js، Node.js و تکنولوژی‌های روز دنیای وب بخوانید.",
  keywords: [
    "NexPad",
    "آموزش برنامه نویسی",
    "وبلاگ برنامه نویسی",
    "جاوااسکریپت",
    "React",
    "Next.js",
    "Node.js",
    "وب",
    "فرانت اند",
    "بک اند",
  ],
  icons: {
    icon: "/favicon.png",
  },
  authors: [{ name: "Amirhossein Varmanli" }],
  openGraph: {
    title: "NexPad | آموزش برنامه نویسی مدرن",
    description:
      "وبلاگ NexPad مرجعی برای مقالات آموزشی در زمینه برنامه نویسی وب، جاوااسکریپت، React، Next.js و Node.js.",
    url: "https://nexpad.ir",
    siteName: "NexPad",
    locale: "fa_IR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NexPad | آموزش برنامه نویسی مدرن",
    description:
      "مقالات آموزشی تخصصی در زمینه برنامه نویسی وب و تکنولوژی‌های روز دنیای توسعه.",
    creator: "@nexpad",
  },
  metadataBase: new URL("https://nexpad.com"),
  alternates: { canonical: "/" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" className="dark">
      <body className={`${vazir.className} min-h-screen`}>
        {children}
        <Toaster position="top-center" reverseOrder={false} />
        <ScrollToTop />
      </body>
    </html>
  );
}
