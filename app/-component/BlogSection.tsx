"use client";

import { useEffect, useState } from "react";
import { IBlog } from "@/models/Blog";
import { ICategory } from "@/models/Category";
import Link from "next/link";
import BlogCard from "./BlogCard";

export default function BlogSection() {
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [blogsRes, categoriesRes] = await Promise.all([
          fetch("/api/blogs"),
          fetch("/api/categories"),
        ]);

        if (!blogsRes.ok) throw new Error("خطا در دریافت بلاگ‌ها");
        if (!categoriesRes.ok) throw new Error("خطا در دریافت دسته‌بندی‌ها");

        const blogsData: IBlog[] = await blogsRes.json();
        const categoriesData: ICategory[] = await categoriesRes.json();

        setBlogs(blogsData);
        setCategories(categoriesData);
      } catch (err) {
        console.error(err);
        setError("خطا در دریافت داده‌ها");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <section className="py-16 z-20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-accent dark:text-[#00FF99] text-lg animate-pulse">
            در حال بارگذاری بلاگ‌ها...
          </p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-red-600 dark:text-red-400 text-lg">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 z-20">
      <div className="container mx-auto px-4">
        {categories.map((category, catIndex) => {
          const categoryBlogs = blogs.filter(
            (blog) => String(blog.category) === String(category._id)
          );
          if (!categoryBlogs.length) return null;

          return (
            <div key={String(category._id)} className="mb-16 ">
              <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 text-transparent bg-clip-text animate-fadeIn mb-8 pt-4 text-center">
                مقالات آموزشی
              </h1>
              {/* دسته بندی */}
              <div className="flex justify-between items-center text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  {category.name}
                </h2>
                <button className="text-black font-semibold bg-accent rounded-lg px-4 py-1 hover:scale-105 transition-transform">
                  مشاهده همه
                </button>
              </div>
              {/* بلاگ‌ها */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {categoryBlogs.slice(0, 3).map((blog) => (
                  <BlogCard key={String(blog._id)} blog={blog} />
                ))}
              </div>
              {/* دکمه نمایش همه */}
              {categoryBlogs.length > 3 && (
                <div className="text-center mt-10">
                  <Link
                    href={`/blogs?category=${category._id}`}
                    className="inline-block px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow hover:scale-105 transition-transform"
                  >
                    نمایش همه مقالات {category.name}
                  </Link>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
