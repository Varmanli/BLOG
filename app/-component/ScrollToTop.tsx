"use client";

import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  // بررسی موقعیت اسکرول
  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300); // بعد از 300px دکمه نمایش داده می‌شود
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 md:right-12 z-50 p-4 rounded-full bg-gradient-to-tr from-pink-500 via-purple-500 to-indigo-500 shadow-lg text-white text-xl transition-transform duration-300 ${
        visible ? "scale-100 opacity-100" : "scale-0 opacity-0"
      } hover:scale-110 `}
      aria-label="بازگشت به بالا"
    >
      <FaArrowUp />
    </button>
  );
}
