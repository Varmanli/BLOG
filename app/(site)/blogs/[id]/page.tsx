import { notFound } from "next/navigation";
import parse from "html-react-parser";
import Image from "next/image";
import BlogViewTracker from "@/app/-component/BlogViewTracker";

interface Blog {
  _id: string;
  title: string;
  content: string;
  coverImage?: string;
  category?: string;
  createdAt?: string;
}

interface Category {
  _id: string;
  name: string;
}

async function getBlog(id: string): Promise<Blog | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs/${id}`,
      { cache: "no-store" }
    );
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Error fetching blog:", error);
    return null;
  }
}

async function getCategory(id: string): Promise<Category | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/categories/${id}`,
      { cache: "no-store" }
    );
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Error fetching category:", error);
    return null;
  }
}

export default async function BlogPage({ params }: { params: { id: string } }) {
  const blog = await getBlog(params.id);
  if (!blog) return notFound();

  let categoryName: string | null = null;
  if (blog.category) {
    const category = await getCategory(blog.category);
    categoryName = category?.name || null;
  }

  return (
    <div className="md:w-[60%] mx-auto py-12 px-6 md:px-10">
      {/* افزایش ویو */}
      <BlogViewTracker blogId={blog._id} />

      {/* ادامه‌ی کدت */}
      {blog.coverImage && (
        <div className="relative w-full mt-[-50px] h-64 md:h-[400px] overflow-hidden rounded-2xl shadow-lg mb-6 z-10">
          <Image
            src={blog.coverImage}
            alt={blog.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            fill
          />
        </div>
      )}

      <h1 className="text-3xl md:text-5xl font-bold text-center text-gray-900 dark:text-gray-100 my-20">
        {blog.title}
      </h1>

      <div
        className="
    prose max-w-none
    text-gray-800 dark:text-gray-200
    prose-headings:text-gray-900 dark:prose-headings:text-gray-100
    prose-headings:font-extrabold
    prose-p:leading-relaxed prose-p:text-gray-800 dark:prose-p:text-gray-200
    prose-strong:text-gray-900 dark:prose-strong:text-gray-100
    prose-em:text-gray-700 dark:prose-em:text-gray-300
    prose-a:text-indigo-600 dark:prose-a:text-indigo-400
    prose-a:underline hover:prose-a:no-underline
    prose-blockquote:border-l-4 prose-blockquote:border-indigo-300 dark:prose-blockquote:border-indigo-500
    prose-blockquote:text-gray-700 dark:prose-blockquote:text-gray-300
    prose-img:rounded-xl prose-img:shadow-lg
    prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-1 prose-code:py-[2px] prose-code:rounded
    prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800 prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto
    prose-ul:list-disc prose-ol:list-decimal
    prose-li:mb-2"
      >
        {parse(blog.content)}
      </div>

      <div className="w-full text-sm md:text-base flex justify-between bg-accent rounded-lg p-1 mt-10">
        {blog.createdAt && (
          <span className="bg-white/10 px-2 py-1 rounded-lg">
            تاریخ انتشار:
            <span className="font-semibold">
              {new Date(blog.createdAt).toLocaleDateString("fa-IR")}
            </span>
          </span>
        )}
        <span className="bg-white/10 px-2 py-1 rounded-lg flex items-center">
          نویسنده: <span className="font-semibold mr-1">امیرحسین ورمانلی</span>
        </span>
      </div>
    </div>
  );
}
