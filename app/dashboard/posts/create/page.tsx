import PostForm from "@/app/-component/PostForm";

export default function CreatePostPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark">
      <div className="container mx-auto py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            ایجاد پست جدید
          </h1>
        </div>
        <PostForm mode="create" />
      </div>
    </div>
  );
}
