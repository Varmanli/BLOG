"use client";

import Image from "next/image";
import logo from "@/public/logo.png";
import Link from "next/link";
import { FaSun, FaMoon, FaBars, FaTimes } from "react-icons/fa";
import { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeProvider";

function Header() {
  const themeContext = useContext(ThemeContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (!themeContext) return null;

  const { theme, toggleTheme } = themeContext;

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <div className="flex justify-between items-center flex-row-reverse px-5 py-5 md:px-14">
      {/* لوگو */}
      <Link href="/" className="flex items-center">
        <Image src={logo} alt="logo" width={120} />
      </Link>

      {/* منوی همبرگری برای موبایل */}
      <button
        onClick={toggleMenu}
        className="md:hidden p-2 text-gray-700 dark:text-gray-300 hover:scale-110 transition-transform"
        aria-label="باز و بسته کردن منو"
      >
        {isMenuOpen ? (
          <FaTimes size={28} className="text-red-500" />
        ) : (
          <FaBars size={28} className="text-primary dark:text-yellow-400" />
        )}
      </button>

      {/* منوی دسکتاپ */}
      <ul className="hidden md:flex items-center gap-6 font-medium text-gray-700 dark:text-gray-300">
        <li>
          {" "}
          {/* دکمه Dark Mode موبایل */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-700 text-yellow-300 hover:bg-gray-600 transition"
          >
            {theme === "dark" ? <FaSun size={24} /> : <FaMoon size={24} />}
          </button>
        </li>
        <li>
          <Link
            href="/"
            className="hover:text-blue-600 dark:hover:text-accent font-semibold   transition-all"
          >
            صفحه اصلی
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="hover:text-blue-600 dark:hover:text-accent font-semibold  transition-all"
          >
            درباره ما
          </Link>
        </li>
        <li>
          <Link
            href="/contact"
            className="hover:text-blue-600 dark:hover:text-accent font-semibold  transition-all"
          >
            تماس با ما
          </Link>
        </li>
      </ul>

      {/* منوی موبایل */}
      <div
        className={`fixed top-0 right-0 h-screen w-2/3 bg-black/95 text-gray-300 dark:text-gray-100 flex flex-col items-center justify-center gap-8 transition-transform duration-700 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* دکمه بستن */}
        <button
          onClick={toggleMenu}
          className="absolute top-4 right-4 text-red-500 hover:text-white transition-all"
          aria-label="بستن منو"
        >
          <FaTimes size={28} />
        </button>

        <Link
          href="/"
          className="text-lg font-semibold hover:text-yellow-400 transition"
          onClick={() => setIsMenuOpen(false)}
        >
          صفحه اصلی
        </Link>
        <Link
          href="/about"
          className="text-lg font-semibold hover:text-yellow-400 transition"
          onClick={() => setIsMenuOpen(false)}
        >
          درباره من
        </Link>
        <Link
          href="/contact"
          className="text-lg font-semibold hover:text-yellow-400 transition"
          onClick={() => setIsMenuOpen(false)}
        >
          تماس با من
        </Link>
        <button
          onClick={toggleTheme}
          className="p-3 rounded-full bg-gray-700 text-yellow-300 hover:bg-gray-600 transition"
        >
          {theme === "dark" ? <FaSun size={24} /> : <FaMoon size={24} />}
        </button>
      </div>
    </div>
  );
}

export default Header;
