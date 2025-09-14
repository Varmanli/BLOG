"use client";

import { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import { IBlog } from "@/models/Blog";

export default function BlogSection() {
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/blogs");
        if (!res.ok) throw new Error("خطا در دریافت بلاگ‌ها");
        const data = await res.json();
        setBlogs(data);
      } catch (err) {
        console.error(err);
        setError("خطا در دریافت بلاگ‌ها");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-accent dark:text-[#00FF99] text-lg">
              در حال بارگذاری بلاگ‌ها...
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-red-600 dark:text-red-400 text-lg">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            آخرین مقالات
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            جدیدترین مطالب و آموزش‌های برنامه‌نویسی را اینجا بخوانید
          </p>
        </div>

        {blogs.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              هیچ بلاگی موجود نیست.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.slice(0, 6).map((blog) => (
              <BlogCard
                key={String(blog._id)}
                title={blog.title}
                slug={blog.slug}
                id={String(blog._id)}
                image={blog.coverImage}
                paragraph={
                  <div
                    dangerouslySetInnerHTML={{
                      __html:
                        typeof blog.content === "string"
                          ? blog.content.substring(0, 150) + "..."
                          : "",
                    }}
                  />
                }
              />
            ))}
          </div>
        )}

        {blogs.length > 6 && (
          <div className="text-center mt-12">
            <a
              href="/posts"
              className="inline-flex items-center px-6 py-3 bg-accent dark:bg-[#00FF99] text-black font-semibold rounded-lg hover:opacity-90 transition-all"
            >
              مشاهده همه مقالات
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
