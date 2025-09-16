"use client";

import { useEffect, useState } from "react";
import { IBlog } from "@/models/Blog";
import { ICategory } from "@/models/Category";
import BlogCard from "./BlogCard";
import Link from "next/link";
import Status from "./Status";
import { motion } from "framer-motion";

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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

  // اگه hideTabs فعاله همه رو نشون بده، وگرنه فقط ۹ تا
  const displayBlogs = hideTabs ? filteredBlogs : filteredBlogs.slice(0, 9);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section
      id="blog"
      className={`relative z-20 ${hideTabs ? "py-0" : "py-16"}`}
    >
      <h1
        className={`text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 text-transparent bg-clip-text animate-fadeIn mb-8 text-center ${
          hideTabs ? "pt-10" : "pt-14"
        }`}
      >
        {categoryName === "همه مقالات"
          ? "همه مقالات آموزشی"
          : categoryName
          ? `مقالات آموزشی ${categoryName}`
          : "مقالات آموزشی"}
      </h1>

      {/* تب دسته‌بندی */}
      {!hideTabs && (
        <div className="flex flex-wrap justify-center gap-3 mb-10 z-10 relative">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-5 py-2 rounded-lg font-medium transition ${
              selectedCategory === "all"
                ? "bg-accent text-black"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            همه مقالات
          </button>
          {categories.map((cat) => (
            <button
              key={String(cat._id)}
              onClick={() => setSelectedCategory(String(cat._id))}
              className={`px-5 py-2 rounded-lg font-medium transition ${
                selectedCategory === String(cat._id)
                  ? "bg-accent text-black"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      )}

      {/* لیست بلاگ‌ها */}
      {displayBlogs.length ? (
        <motion.div
          className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 z-10 relative"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {displayBlogs.map((blog) => (
            <motion.div key={String(blog._id)} variants={itemVariants}>
              <BlogCard blog={blog} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400 mt-12 z-10 relative">
          مقاله‌ای برای این دسته‌بندی پیدا نشد.
        </p>
      )}

      {/* دکمه مشاهده همه مقالات */}
      {!hideTabs && (
        <div className="text-center mt-12 z-10 relative">
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

      {/* افکت بک‌گراند */}
      <div
        className="absolute top-1/4 left-0 w-72 h-72 md:w-96 md:h-96 rounded-full 
                bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-400 
                opacity-30 blur-3xl pointer-events-none -z-10"
      ></div>
      <div
        className="absolute top-20 right-0 w-72 h-72 md:w-96 md:h-96 rounded-full 
                bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-400 
                opacity-30 blur-3xl pointer-events-none -z-10"
      ></div>
    </section>
  );
}
