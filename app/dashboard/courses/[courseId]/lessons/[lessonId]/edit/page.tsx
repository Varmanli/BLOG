"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import RichEditor from "@/app/-component/rich-editor";

export default function EditLessonPage({
  params,
}: {
  params: { courseId: string; lessonId: string };
}) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [order, setOrder] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // گرفتن اطلاعات اولیه‌ی درس
  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const res = await fetch(
          `/api/courses/${params.courseId}/lessons/${params.lessonId}`
        );
        if (!res.ok) throw new Error("خطا در دریافت اطلاعات درس");
        const data = await res.json();
        setTitle(data.title);
        setContent(data.content);
        setOrder(data.order);
      } catch {
        toast.error("خطا در دریافت اطلاعات درس");
      } finally {
        setFetching(false);
      }
    };

    fetchLesson();
  }, [params.courseId, params.lessonId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim())
      return toast.error("عنوان و محتوا الزامی هستند");

    setLoading(true);
    try {
      const res = await fetch(
        `/api/courses/${params.courseId}/lessons/${params.lessonId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, content, order }),
        }
      );
      if (!res.ok) throw new Error();
      toast.success("درس بروزرسانی شد");
      router.push(`/dashboard/courses/${params.courseId}/lessons`);
    } catch {
      toast.error("خطا در بروزرسانی درس");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <p className="text-center text-accent dark:text-[#00FF99] mt-10">
        در حال بارگذاری اطلاعات درس...
      </p>
    );
  }

  return (
    <main className="p-6 min-h-screen mx-auto text-gray-900 dark:text-gray-100">
      <h1 className="text-2xl font-bold mb-6 text-accent dark:text-[#00FF99]">
        ویرایش درس
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col mx-auto mt-10 gap-6 max-w-5xl"
      >
        {/* عنوان */}
        <input
          type="text"
          placeholder="عنوان درس"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#242429]"
        />

        {/* ترتیب */}
        <div>
          <label className="block mb-2 font-medium">شماره / ترتیب درس</label>
          <input
            type="number"
            placeholder="مثلاً 1، 2، 3 ..."
            value={order}
            onChange={(e) => setOrder(Number(e.target.value))}
            className="p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#242429] max-w-xs"
          />
        </div>

        {/* محتوای درس */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block font-medium">محتوای درس</label>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-lg bg-accent dark:bg-[#00FF99] text-black hover:opacity-90 transition"
            >
              {loading ? "در حال ذخیره..." : "ذخیره تغییرات"}
            </button>
          </div>
          <RichEditor value={content} onChange={setContent} />
        </div>

        {/* دکمه انصراف پایین */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() =>
              router.push(`/dashboard/courses/${params.courseId}/lessons`)
            }
            className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            انصراف
          </button>
        </div>
      </form>
    </main>
  );
}
