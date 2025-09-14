import { notFound } from "next/navigation";
import parse from "html-react-parser";
import Image from "next/image";

interface Blog {
  _id: string;
  title: string;
  content: string;
  coverImage?: string;
  category?: string; // اینجا آیدی دسته‌بندی میاد
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
    <div className="max-w-5xl mx-auto py-12 px-6 md:px-10">
      {/* عکس بالای صفحه */}
      {blog.coverImage && (
        <div className="relative w-full mt-[-50px] h-64 md:h-80 overflow-hidden rounded-2xl shadow-lg mb-6 z-10">
          <Image
            src={blog.coverImage}
            alt={blog.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            fill
          />

          {/* گرادیانت تیره پایین عکس */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

          {/* اطلاعات دسته‌بندی، تاریخ و نویسنده روی عکس */}
          <div className="absolute bottom-4 left-0 right-0 px-6 flex text-[10px] md:text-sm  items-center  gap-2 md:gap-8 text-white">
            {categoryName && (
              <span className="px-3 py-1 rounded-full bg-indigo-600/80 font-medium">
                {categoryName}
              </span>
            )}
            {blog.createdAt && (
              <span>
                {new Date(blog.createdAt).toLocaleDateString("fa-IR")}
              </span>
            )}
            <span>
              نویسنده: <span className="font-semibold">امیرحسین ورمانلی</span>
            </span>
          </div>
        </div>
      )}

      {/* عنوان */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-100 mb-8 mt-4">
        {blog.title}
      </h1>

      {/* محتوا */}
      <div
        className="
    prose prose-lg max-w-none
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
    prose-li:mb-2
  "
      >
        {parse(blog.content)}
      </div>
    </div>
  );
}
