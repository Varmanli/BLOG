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

  const linkClasses =
    "flex items-center gap-3 px-4 py-3 rounded-lg transition-all hover:bg-accent/20 dark:hover:bg-[#00FF9920] hover:shadow-lg";

  return (
    <div className="flex">
      {/* دکمه منوی همبرگری */}
      <button
        onClick={toggleSidebar}
        className="p-4 text-primary dark:text-accent md:hidden focus:outline-none focus:ring-2 focus:ring-accent rounded-lg"
      >
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* سایدبار */}
      <aside
        className={`
          fixed md:static top-0 left-0 h-full w-64 p-6
          bg-white dark:bg-[#1e1e22] text-gray-700 dark:text-gray-300
          shadow-lg md:shadow-none rounded-tr-2xl rounded-br-2xl
          transition-transform duration-500 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
        `}
      >
        {/* عنوان داشبورد */}
        <h1 className="text-2xl font-bold mb-8 text-center text-accent dark:text-[#00FF99]">
          داشبورد مدیریت
        </h1>

        {/* لینک‌ها */}
        <ul className="space-y-3">
          <li>
            <Link href="/dashboard" className={linkClasses}>
              <FaHome className="text-accent text-xl" /> صفحه اصلی
            </Link>
          </li>
          <li>
            <Link href="/dashboard/posts" className={linkClasses}>
              <FaList className="text-accent text-xl" /> مدیریت بلاگ‌ها
            </Link>
          </li>
          <li>
            <Link href="/dashboard/posts/create" className={linkClasses}>
              <FaPlus className="text-accent text-xl" /> افزودن بلاگ جدید
            </Link>
          </li>
          <li>
            <Link href="/dashboard/categories" className={linkClasses}>
              <FaTags className="text-accent text-xl" /> مدیریت دسته‌بندی‌ها
            </Link>
          </li>
          <li>
            <Link href="/dashboard/message" className={linkClasses}>
              <MdOutlineMessage className="text-accent text-xl" /> پیغام‌ها
            </Link>
          </li>
          <li>
            <Link href="/dashboard/stats" className={linkClasses}>
              <FaChartBar className="text-accent text-xl" /> آمار و گزارش‌ها
            </Link>
          </li>
        </ul>
      </aside>
    </div>
  );
}

export default Sidebar;
