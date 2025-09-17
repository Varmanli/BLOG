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
  FaHome,
} from "react-icons/fa";
import { MdOutlineMessage } from "react-icons/md";

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
        className="p-4 text-primary dark:text-accent md:hidden"
      >
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* سایدبار */}
      <aside
        className={`fixed md:static top-0 left-0 h-full md:h-auto w-64 p-5 bg-gray-100 dark:bg-background text-gray-700 dark:text-gray-300 transition-transform duration-500 md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* عنوان داشبورد */}
        <h1 className="text-2xl font-bold mb-6 text-primary dark:text-accent text-center">
          داشبورد مدیریت
        </h1>

        {/* لینک‌ها */}
        <ul className="space-y-10">
          <li>
            <Link
              href="/dashboard"
              className="flex items-center gap-3 hover:text-primary dark:hover:text-accent transition"
            >
              <FaHome className="text-accent text-2xl" /> صفحه اصلی
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/posts"
              className="flex items-center gap-3 hover:text-primary dark:hover:text-accent transition"
            >
              <FaList className="text-accent text-2xl" /> مدیریت بلاگ‌ها
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/posts/create"
              className="flex items-center gap-3 hover:text-primary dark:hover:text-accent transition"
            >
              <FaPlus className="text-accent text-2xl" /> افزودن بلاگ جدید
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/categories"
              className="flex items-center gap-3 hover:text-primary dark:hover:text-accent transition"
            >
              <FaTags className="text-accent text-2xl" /> مدیریت دسته‌بندی‌ها
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/message"
              className="flex items-center gap-3 hover:text-primary dark:hover:text-accent transition"
            >
              <MdOutlineMessage className="text-accent text-2xl" /> پیغام ها
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/stats"
              className="flex items-center gap-3 hover:text-primary dark:hover:text-accent transition"
            >
              <FaChartBar className="text-accent text-2xl" /> آمار و گزارش‌ها
            </Link>
          </li>
        </ul>
      </aside>
    </div>
  );
}

export default Sidebar;
