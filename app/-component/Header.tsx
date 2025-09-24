"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useContext } from "react";
import { FaSun, FaMoon, FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import { ThemeContext } from "../context/ThemeProvider";
import { ICategory } from "@/models/Category";
import logo from "@/public/logo.png";

export default function Header() {
  const themeContext = useContext(ThemeContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [categories, setCategories] = useState<ICategory[]>([]);

  const theme = themeContext?.theme;
  const toggleTheme = themeContext?.toggleTheme;

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`,
          {
            cache: "no-store",
          }
        );
        if (!res.ok) throw new Error("خطا در دریافت دسته‌بندی‌ها");
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchCategories();
  }, []);

  if (!themeContext) return null;

  return (
    <header className="flex flex-row-reverse justify-between z-20 items-center px-5 py-5 relative md:mx-10">
      <Link href="/" className="flex items-center">
        <Image src={logo} alt="logo" width={150} />
      </Link>

      {/* منوی دسکتاپ */}
      <ul className="hidden md:flex items-center gap-6 font-medium text-gray-700 dark:text-gray-300">
        <li>
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
            className="hover:text-blue-600 text-lg dark:hover:text-accent font-semibold transition-all"
          >
            صفحه اصلی
          </Link>
        </li>

        <li className="relative group text-lg">
          <button className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-accent font-semibold transition-all">
            مقالات <FaChevronDown size={14} />
          </button>
          <ul className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
            <li>
              <Link
                href="/blogs"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                همه مقالات
              </Link>
            </li>
            {categories.map((cat) => (
              <li key={String(cat._id)}>
                <Link
                  href={`/blogs/category/${cat._id}`}
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </li>

        <li>
          <Link
            href="/about"
            className="hover:text-blue-600 dark:hover:text-accent text-lg font-semibold transition-all"
          >
            درباره ما
          </Link>
        </li>
        <li>
          <Link
            href="/contact"
            className="hover:text-blue-600 dark:hover:text-accent text-lg font-semibold transition-all"
          >
            تماس با ما
          </Link>
        </li>
      </ul>

      {/* منوی موبایل */}
      <button
        onClick={() => setIsMenuOpen((prev) => !prev)}
        className="md:hidden p-2 text-gray-700 dark:text-gray-300 hover:scale-110 transition-transform"
        aria-label="باز و بسته کردن منو"
      >
        {isMenuOpen ? (
          <FaTimes size={28} className="text-red-500" />
        ) : (
          <FaBars size={28} className="text-green-500 dark:text-accent" />
        )}
      </button>

      <div
        className={`fixed top-0 right-0 h-screen w-3/4 max-w-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col items-start justify-center z-50 gap-6 p-6 transition-transform duration-300 ease-in-out shadow-lg ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          onClick={() => setIsMenuOpen(false)}
          className="absolute top-5 right-5 text-red-500 hover:text-white p-2 rounded-full hover:bg-red-600 transition-all"
        >
          <FaTimes size={28} />
        </button>

        <Link
          href="/"
          className="text-xl font-bold hover:text-accent transition-colors"
          onClick={() => setIsMenuOpen(false)}
        >
          صفحه اصلی
        </Link>

        {/* دراپ‌داون موبایل */}
        <div className="h-7 text-left relative">
          <button
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            className="flex items-center justify-between w-full text-xl font-semibold hover:text-accent transition-colors"
          >
            مقالات
            <FaChevronDown
              size={16}
              className={`transform transition-transform duration-300 ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>
          <div
            className={` bg-white dark:bg-gray-900 shadow-md rounded-md overflow-hidden transform transition-all duration-300 origin-top text-right ${
              isDropdownOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
            }`}
          >
            <Link
              href="/blogs"
              onClick={() => {
                setIsMenuOpen(false);
                setIsDropdownOpen(false);
              }}
              className="block py-2  text-sm hover:text-accent transition-colors"
            >
              همه مقالات
            </Link>
            {categories.map((cat) => (
              <Link
                key={String(cat._id)}
                href={`/blogs/category/${cat._id}`}
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsDropdownOpen(false);
                }}
                className="block py-2 text-sm hover:text-accent transition-colors"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>

        <Link
          href="/about"
          className="text-xl font-bold hover:text-accent transition-colors"
          onClick={() => setIsMenuOpen(false)}
        >
          درباره ما
        </Link>
        <Link
          href="/contact"
          className="text-xl font-bold hover:text-accent transition-colors"
          onClick={() => setIsMenuOpen(false)}
        >
          تماس با ما
        </Link>

        <button
          onClick={toggleTheme}
          className="p-3 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-yellow-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          {theme === "dark" ? <FaSun size={24} /> : <FaMoon size={24} />}
        </button>
      </div>
    </header>
  );
}
