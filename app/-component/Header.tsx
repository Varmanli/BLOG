"use client";

import Image from "next/image";
import logo from "@/public/logo.png";
import Link from "next/link";
import { FaSun, FaMoon } from "react-icons/fa";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeProvider";

function Header() {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) return null;

  const { theme, toggleTheme } = themeContext;

  return (
    <div className="flex justify-between items-center flex-row-reverse px-10 border-b bg-white dark:bg-gray-900">
      <Link href="/" className="flex items-center">
        <Image src={logo} alt="logo" width={80} height={40} />
      </Link>
      <ul className="flex items-center gap-6 md:gap-10 font-medium text-gray-700 dark:text-gray-300">
        <li>
          <Link
            href="/"
            className="hover:text-blue-600 dark:hover:text-yellow-400 relative group transition-all"
          >
            صفحه اصلی
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="hover:text-blue-600 dark:hover:text-yellow-400 relative group transition-all"
          >
            درباره من
          </Link>
        </li>
        <li>
          <Link
            href="/contact"
            className="hover:text-blue-600 dark:hover:text-yellow-400 relative group transition-all"
          >
            تماس با من
          </Link>
        </li>
      </ul>

      {/* دکمه تغییر تم */}
      <button
        onClick={toggleTheme}
        className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-yellow-300 hover:shadow-md transition"
        aria-label="تغییر تم"
      >
        {theme === "dark" ? <FaSun size={20} /> : <FaMoon size={20} />}
      </button>
    </div>
  );
}

export default Header;
