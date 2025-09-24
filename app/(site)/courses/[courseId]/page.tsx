import { redirect } from "next/navigation";

type PageProps = {
  params: { courseId: string };
};

export default async function CourseRedirectPage({ params }: PageProps) {
  // Fetch lessons for this course and redirect to the first one
  const base = process.env.NEXT_PUBLIC_BASE_URL || "";
  const res = await fetch(`${base}/api/courses/${params.courseId}/lessons`, {
    cache: "no-store",
  });

  if (!res.ok) {
    // If lessons can't be fetched, show a simple fallback
    return (
      <div className="mx-auto max-w-3xl p-6 text-center">
        <h1 className="text-xl font-semibold">خطا در دریافت درس‌ها</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          لطفاً بعداً دوباره تلاش کنید.
        </p>
      </div>
    );
  }

  const lessons: { _id: string; title: string; order?: number }[] =
    await res.json();
  if (!Array.isArray(lessons) || lessons.length === 0) {
    return (
      <div className="mx-auto max-w-3xl p-6 text-center">
        <h1 className="text-xl font-semibold">
          هنوز درسی برای این دوره ثبت نشده است
        </h1>
      </div>
    );
  }

  // Ensure we go to the first by order (API already sorts by order, but sort again just in case)
  const sorted = [...lessons].sort((a, b) => (a.order || 0) - (b.order || 0));
  const first = sorted[0];

  redirect(`/courses/${params.courseId}/lessons/${first._id}`);
}
