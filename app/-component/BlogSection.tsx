import { IBlog } from "@/models/Blog";
import { ICategory } from "@/models/Category";
import Link from "next/link";
import BlogCard from "./BlogCard";

async function fetchBlogs(): Promise<IBlog[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("خطا در دریافت بلاگ‌ها");
  return res.json();
}

async function fetchCategories(): Promise<ICategory[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) throw new Error("خطا در دریافت دسته‌بندی‌ها");
  return res.json();
}

export default async function BlogSection() {
  let blogs: IBlog[] = [];
  let categories: ICategory[] = [];

  try {
    [blogs, categories] = await Promise.all([fetchBlogs(), fetchCategories()]);
  } catch (err) {
    console.error(err);
    return (
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-red-600 dark:text-red-400 text-lg">
            خطا در دریافت داده‌ها
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 z-20">
      <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 text-transparent bg-clip-text animate-fadeIn mb-8 pt-4 text-center">
        مقالات آموزشی
      </h1>
      <div className="container mx-auto px-4">
        {categories.map((category) => {
          const categoryBlogs = blogs.filter(
            (blog) => String(blog.category) === String(category._id)
          );
          if (!categoryBlogs.length) return null;

          return (
            <div key={String(category._id)} className="mb-16">
              <div className="flex justify-between items-center text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  {category.name}
                </h2>
                <button className="text-black font-semibold bg-accent rounded-lg px-4 py-1 hover:scale-105 transition-transform">
                  مشاهده همه
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {categoryBlogs.slice(0, 3).map((blog) => (
                  <BlogCard key={String(blog._id)} blog={blog} />
                ))}
              </div>

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
