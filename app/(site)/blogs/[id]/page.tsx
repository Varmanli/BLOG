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
        <div className="relative w-full mt-[-50px] h-64 md:h-80 overflow-hidden rounded-2xl shadow-lg mb-6 z-10">
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

      <div className="prose max-w-none ...">{parse(blog.content)}</div>

      <div className="w-full flex justify-between bg-accent ...">
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
