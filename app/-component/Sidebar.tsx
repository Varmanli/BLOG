"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FaPlus,
  FaList,
  FaChartBar,
  FaTags,
  FaBars,
  FaTimes,
  FaCog,
  FaHome,
} from "react-icons/fa";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="flex">
      {/* دکمه منوی همبرگری */}
      <button
        onClick={toggleSidebar}
        className="p-4 text-primary dark:text-yellow-400 md:hidden"
      >
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* سایدبار */}
      <aside
        className={`fixed md:static top-0 left-0 h-full md:h-auto w-64 p-5 bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 transition-transform duration-500 md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* عنوان داشبورد */}
        <h1 className="text-2xl font-bold mb-6 text-primary dark:text-yellow-400 text-center">
          داشبورد مدیریت
        </h1>

        {/* لینک‌ها */}
        <ul className="space-y-4">
          <li>
            <Link
              href="/dashboard"
              className="flex items-center gap-3 hover:text-primary dark:hover:text-yellow-400 transition"
            >
              <FaHome /> صفحه اصلی
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/posts"
              className="flex items-center gap-3 hover:text-primary dark:hover:text-yellow-400 transition"
            >
              <FaList /> مدیریت بلاگ‌ها
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/posts/create"
              className="flex items-center gap-3 hover:text-primary dark:hover:text-yellow-400 transition"
            >
              <FaPlus /> افزودن بلاگ جدید
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/categories"
              className="flex items-center gap-3 hover:text-primary dark:hover:text-yellow-400 transition"
            >
              <FaTags /> مدیریت دسته‌بندی‌ها
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/stats"
              className="flex items-center gap-3 hover:text-primary dark:hover:text-yellow-400 transition"
            >
              <FaChartBar /> آمار و گزارش‌ها
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/settings"
              className="flex items-center gap-3 hover:text-primary dark:hover:text-yellow-400 transition"
            >
              <FaCog /> تنظیمات کلی سایت
            </Link>
          </li>
        </ul>
      </aside>
    </div>
  );
}

export default Sidebar;
