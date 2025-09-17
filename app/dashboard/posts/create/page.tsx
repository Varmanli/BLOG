import PostForm from "@/app/-component/PostForm";

export default function CreatePostPage() {
  return (
    <div className="min-h-screen  transition-colors">
      <div className="container mx-auto py-12 px-4 md:px-0">
        {/* هدر صفحه */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-[#00FF99]">
            ایجاد پست جدید
          </h1>
        </div>

        {/* فرم */}
        <div className="rounded-2xl shadow-lg p-6 md:p-10 transition-all">
          <PostForm mode="create" />
        </div>
      </div>
    </div>
  );
}
