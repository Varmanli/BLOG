import { notFound } from "next/navigation";
import PostForm from "@/app/-component/PostForm";
import { IBlog } from "@/models/Blog";

interface EditPostPageProps {
  params: { id: string };
}

/**
 * گرفتن پست از سرور با شناسه مشخص
 * @param id شناسه بلاگ
 * @returns IBlog یا null در صورت عدم موفقیت
 */
async function getPost(id: string): Promise<IBlog | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/blogs/${id}`, {
      cache: "no-store", 
    });

    if (!res.ok) {
      console.error("Error fetching post:", res.status, res.statusText);
      return null;
    }

    const data = await res.json();
    // بررسی ساده اینکه داده معتبر است
    if (!data || data.error) return null;

    return data as IBlog;
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

/**
 * صفحه ویرایش پست
 * - اگر پست وجود نداشت، notFound فراخوانی می‌شود (404)
 * - فرم PostForm در حالت edit با داده پست پر می‌شود
 */
export default async function EditPostPage({ params }: EditPostPageProps) {
  const post = await getPost(params.id);

  if (!post) {
    notFound(); // نمایش صفحه 404
  }

  return (
    <div className="min-h-screen ">
      <div className="container mx-auto py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            ویرایش پست
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            پست {post.title} را ویرایش کنید
          </p>
        </header>

        <PostForm mode="edit" post={post} />
      </div>
    </div>
  );
}
