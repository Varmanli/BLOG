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
  FaBook,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { MdOutlineMessage } from "react-icons/md";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<null | "blog" | "course">(null);

  const toggleSidebar = () => setIsOpen((prev) => !prev);
  const toggleMenu = (menu: "blog" | "course") => {
    setOpenMenu((prev) => (prev === menu ? null : menu));
  };

  const linkClasses =
    "flex items-center justify-between px-4 py-3 rounded-lg transition-all hover:bg-accent/20 dark:hover:bg-[#00FF9920] hover:shadow-lg font-medium";

  const subLinkClasses =
    "flex items-center gap-2 pr-10 py-2 rounded-lg transition-all hover:bg-accent/10 dark:hover:bg-[#00FF9920] ";

  return (
    <div className="flex">
      {/* دکمه همبرگری */}
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
        <h1 className="text-2xl font-bold mb-8 text-center text-accent dark:text-[#00FF99]">
          داشبورد مدیریت
        </h1>

        <ul className="space-y-3">
          <li>
            <Link href="/dashboard" className={linkClasses}>
              صفحه اصلی
            </Link>
          </li>

          {/* وبلاگ */}
          <li>
            <button
              onClick={() => toggleMenu("blog")}
              className={linkClasses + " w-full text-left"}
            >
              <span className="flex items-center gap-3">مدیریت وبلاگ</span>
              {openMenu === "blog" ? (
                <FaChevronUp className="text-gray-500 dark:text-gray-300" />
              ) : (
                <FaChevronDown className="text-gray-500 dark:text-gray-300" />
              )}
            </button>
            {openMenu === "blog" && (
              <ul className="mt-1 bg-[#0F0F20] rounded-md">
                {[
                  {
                    href: "/dashboard/posts",
                    label: "لیست بلاگ‌ها",
                  },
                  {
                    href: "/dashboard/posts/create",
                    label: "افزودن بلاگ",
                  },
                  {
                    href: "/dashboard/categories",
                    label: "دسته‌بندی‌ها",
                  },
                ].map((item, i) => (
                  <li key={i} className={subLinkClasses}>
                    <Link href={item.href}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            )}
          </li>

          {/* دوره‌ها */}
          <li>
            <button
              onClick={() => toggleMenu("course")}
              className={linkClasses + " w-full text-left"}
            >
              <span className="flex items-center gap-3">مدیریت دوره‌ها</span>
              {openMenu === "course" ? (
                <FaChevronUp className="text-gray-500 dark:text-gray-300" />
              ) : (
                <FaChevronDown className="text-gray-500 dark:text-gray-300" />
              )}
            </button>
            {openMenu === "course" && (
              <ul className="mt-1 bg-[#0F0F20] rounded-md">
                {[
                  {
                    href: "/dashboard/courses",
                    label: "لیست دوره‌ها",
                  },
                  {
                    href: "/dashboard/courses/create",
                    label: "افزودن دوره",
                  },
                ].map((item, i) => (
                  <li key={i} className={subLinkClasses}>
                    <Link href={item.href}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            )}
          </li>

          <li>
            <Link href="/dashboard/message" className={linkClasses}>
              پیغام‌ها
            </Link>
          </li>
          <li>
            <Link href="/dashboard/stats" className={linkClasses}>
              آمار و گزارش‌ها
            </Link>
          </li>
        </ul>
      </aside>
    </div>
  );
}

export default Sidebar;
