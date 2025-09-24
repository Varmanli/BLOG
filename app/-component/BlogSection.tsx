"use client";

import { useEffect, useState } from "react";
import { IBlog } from "@/models/Blog";
import { ICategory } from "@/models/Category";
import Card from "./Card";
import Link from "next/link";
import Status from "./Status";
import { motion } from "framer-motion";
import { FaFire, FaSortAmountDownAlt, FaSortAmountUp } from "react-icons/fa";

interface BlogSectionProps {
  hideTabs?: boolean;
  initialCategoryId?: string;
  categoryName?: string;
}

export default function BlogSection({
  hideTabs = false,
  initialCategoryId = "all",
  categoryName,
}: BlogSectionProps) {
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [selectedCategory, setSelectedCategory] =
    useState<string>(initialCategoryId);
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest" | "popular">(
    "newest"
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const [blogsRes, categoriesRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs`, {
            cache: "no-store",
          }),
          fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`, {
            cache: "no-store",
          }),
        ]);
        if (!blogsRes.ok || !categoriesRes.ok)
          throw new Error("خطا در دریافت داده‌ها");

        const blogsData = await blogsRes.json();
        const categoriesData = await categoriesRes.json();

        setBlogs(blogsData);
        setCategories(categoriesData);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading)
    return <Status type="loading" message="در حال دریافت بلاگ‌ها..." />;
  if (error) return <Status type="error" message="خطا در دریافت داده‌ها" />;

  const filteredBlogs =
    selectedCategory === "all"
      ? blogs
      : blogs.filter((blog) => String(blog.category) === selectedCategory);

  const sortedBlogs = [...filteredBlogs].sort((a, b) => {
    if (sortOrder === "newest")
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    if (sortOrder === "oldest")
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    if (sortOrder === "popular") return b.views - a.views;
    return 0;
  });

  const displayBlogs = hideTabs ? sortedBlogs : sortedBlogs.slice(0, 9);

  return (
    <section id="blog" className={`relative z-20 md:px-14 `}>
      <h1
        className={`text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 text-transparent bg-clip-text animate-fadeIn mb-8 text-center ${
          hideTabs ? "pt-10" : "pt-14"
        }`}
      >
        {categoryName === "همه مقالات"
          ? "همه مقالات"
          : categoryName
          ? `مقالات ${categoryName}`
          : "مقالات"}
      </h1>

      {/* دکمه‌های دسته‌بندی و مرتب‌سازی */}
      {!hideTabs && (
        <div className="container mx-auto px-4 flex flex-row-reverse justify-between items-center gap-4 mb-6  z-20 relative">
          <div className="relative w-48 md:w-56">
            {/* Dropdown */}
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-full flex justify-between items-center px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 font-medium shadow-sm hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-1"
            >
              <span className="truncate">
                {selectedCategory === "all"
                  ? "همه مقالات"
                  : categories.find((c) => String(c._id) === selectedCategory)
                      ?.name || "انتخاب دسته‌بندی"}
              </span>
              <svg
                className={`w-4 h-4 ml-2 transition-transform duration-200 ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {dropdownOpen && (
              <div className="absolute mt-2 w-full rounded-lg bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 z-50 overflow-hidden animate-dropdown-fade">
                <div
                  onClick={() => {
                    setSelectedCategory("all");
                    setDropdownOpen(false);
                  }}
                  className={`px-4 py-2 cursor-pointer text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white transition-colors duration-200 ${
                    selectedCategory === "all"
                      ? "bg-purple-200 dark:bg-accent font-semibold"
                      : ""
                  } rounded-t-lg`}
                >
                  همه مقالات
                </div>
                {categories.map((cat, idx) => (
                  <div
                    key={String(cat._id)}
                    onClick={() => {
                      setSelectedCategory(String(cat._id));
                      setDropdownOpen(false);
                    }}
                    className={`px-4 py-2 cursor-pointer text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white transition-colors duration-200 ${
                      selectedCategory === String(cat._id)
                        ? "bg-purple-200 dark:bg-accent font-semibold"
                        : ""
                    } ${idx === categories.length - 1 ? "rounded-b-lg" : ""}`}
                  >
                    {cat.name}
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* مرتب‌سازی */}
          <div className="relative inline-block">
            <div className="relative inline-block group">
              <button className="w-full flex justify-between items-center gap-3 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 font-medium shadow-sm hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-1">
                {sortOrder === "newest" && (
                  <>
                    جدیدترین <FaSortAmountDownAlt />
                  </>
                )}
                {sortOrder === "oldest" && (
                  <>
                    قدیمی‌ترین <FaSortAmountUp />
                  </>
                )}
                {sortOrder === "popular" && (
                  <>
                    محبوب‌ترین <FaFire />
                  </>
                )}
              </button>
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute mt-2 w-40 rounded-xl bg-white dark:bg-gray-800 shadow-xl z-20 overflow-hidden border border-gray-200 dark:border-gray-700 opacity-0 scale-95 invisible group-hover:visible group-hover:opacity-100 group-hover:scale-100 transition-all duration-200"
              >
                {["newest", "oldest", "popular"].map((option) => (
                  <div
                    key={option}
                    onClick={() =>
                      setSortOrder(option as "newest" | "oldest" | "popular")
                    }
                    className="px-4 py-2 cursor-pointer text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white transition-colors duration-200"
                  >
                    {option === "newest"
                      ? "جدیدترین"
                      : option === "oldest"
                      ? "قدیمی‌ترین"
                      : "محبوب‌ترین"}
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      )}

      {/* نمایش لیست بلاگ‌ها */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 md:px-6">
        {displayBlogs.length ? (
          displayBlogs.map((blog) => (
            <div key={String(blog._id)} className="p-5">
              <Card
                id={String(blog._id)}
                title={blog.title}
                coverImage={blog.coverImage}
                buttonText="مطالعه مقاله"
                itemType="blog"
              />
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400 mt-12 z-10 relative">
            مقاله‌ای برای این دسته‌بندی پیدا نشد.
          </p>
        )}
      </div>

      {/* دکمه مشاهده همه مقالات */}
      {!hideTabs && (
        <div className="text-center my-5 z-10 relative">
          <Link
            href={
              selectedCategory === "all"
                ? "/blogs"
                : `/blogs/category/${selectedCategory}`
            }
            className="inline-block px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow hover:scale-105 transition-transform"
          >
            مشاهده همه مقالات
          </Link>
        </div>
      )}

      {/* بک‌گراند گرافیکی */}
      <div className="absolute top-1 left-[30%] w-72 h-72 md:w-[700px] md:h-[700px] rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-400 opacity-30 blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute top-1/4 left-0 w-72 h-72 md:w-[400px] md:h-[400px] rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-400 opacity-30 blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute top-20 right-0 w-72 md:w-[400px] md:h-[400px] rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-400 opacity-30 blur-3xl pointer-events-none -z-10"></div>
    </section>
  );
}
