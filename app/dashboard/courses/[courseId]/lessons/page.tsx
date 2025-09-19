"use client";

import { useEffect, useState } from "react";
import {
  FaTrashAlt,
  FaPlus,
  FaSort,
  FaSortUp,
  FaSortDown,
  FaEdit,
} from "react-icons/fa";
import { toast } from "react-hot-toast";
import Link from "next/link";

interface Lesson {
  _id: string;
  title: string;
  order: number;
  createdAt: string;
}

type SortField = "title" | "createdAt" | "order";
type SortOrder = "asc" | "desc";

export default function ManageLessonsPage({
  params,
}: {
  params: { courseId: string };
}) {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortField, setSortField] = useState<SortField>("createdAt");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  const fetchLessons = async () => {
    try {
      const res = await fetch(`/api/courses/${params.courseId}/lessons`);
      if (!res.ok) throw new Error("خطا در دریافت درس‌ها");
      const data = await res.json();
      setLessons(data);
    } catch (err) {
      console.error(err);
      setError("خطا در دریافت درس‌ها");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLessons();
  }, []);

  const handleDelete = async (lessonId: string) => {
    if (!confirm("آیا از حذف این درس مطمئن هستید؟")) return;

    try {
      const res = await fetch(
        `/api/courses/${params.courseId}/lessons/${lessonId}`,
        { method: "DELETE" }
      );
      if (!res.ok) throw new Error();
      toast.success("درس حذف شد");
      setLessons(lessons.filter((l) => l._id !== lessonId));
    } catch {
      toast.error("خطا در حذف درس");
    }
  };

  const handleSort = (field: SortField) => {
    if (field === sortField) setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const sortedLessons = [...lessons].sort((a, b) => {
    let valA: number | string = "";
    let valB: number | string = "";

    if (sortField === "title") {
      valA = a.title;
      valB = b.title;
    } else if (sortField === "createdAt") {
      valA = new Date(a.createdAt).getTime();
      valB = new Date(b.createdAt).getTime();
    } else if (sortField === "order") {
      valA = a.order;
      valB = b.order;
    }

    if (valA < valB) return sortOrder === "asc" ? -1 : 1;
    if (valA > valB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const renderSortIcon = (field: SortField) => {
    if (sortField !== field)
      return <FaSort className="inline ml-1 text-gray-400" />;
    return sortOrder === "asc" ? (
      <FaSortUp className="inline ml-1 text-blue-500" />
    ) : (
      <FaSortDown className="inline ml-1 text-blue-500" />
    );
  };

  if (loading)
    return (
      <p className="text-center text-accent dark:text-[#00FF99] mt-10">
        در حال بارگذاری درس‌ها...
      </p>
    );

  return (
    <main className="p-6 min-h-screen text-gray-900 dark:text-gray-100">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-accent dark:text-[#00FF99]">
          مدیریت درس‌ها
        </h1>
        <Link
          href={`/dashboard/courses/${params.courseId}/lessons/new`}
          className="flex items-center gap-2 px-4 py-2 bg-accent dark:bg-[#00FF99] text-black rounded-lg hover:opacity-90 transition-all"
        >
          <FaPlus /> افزودن درس جدید
        </Link>
      </div>

      {error && <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>}

      <div className="overflow-x-auto">
        <table className="w-full bg-white dark:bg-[#1e1e22] shadow-xl rounded-2xl overflow-hidden">
          <thead>
            <tr className="bg-gray-100 dark:bg-[#2a2a2e] text-gray-700 dark:text-gray-300">
              <th
                className="p-4 text-right cursor-pointer hover:text-blue-500"
                onClick={() => handleSort("title")}
              >
                عنوان درس {renderSortIcon("title")}
              </th>
              <th
                className="p-4 text-right cursor-pointer hover:text-blue-500"
                onClick={() => handleSort("order")}
              >
                ترتیب {renderSortIcon("order")}
              </th>
              <th
                className="p-4 text-right cursor-pointer hover:text-blue-500"
                onClick={() => handleSort("createdAt")}
              >
                تاریخ ایجاد {renderSortIcon("createdAt")}
              </th>
              <th className="p-4 text-center">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {sortedLessons.map((lesson, i) => (
              <tr
                key={lesson._id}
                className={`${
                  i % 2 === 0
                    ? "bg-gray-50 dark:bg-[#242429]"
                    : "bg-white dark:bg-[#1e1e22]"
                } hover:bg-blue-50 dark:hover:bg-[#2e2e34]`}
              >
                <td className="p-4 font-medium">{lesson.title}</td>
                <td className="p-4 text-center">{lesson.order}</td>
                <td className="p-4">
                  {new Date(lesson.createdAt).toLocaleDateString("fa-IR")}
                </td>
                <td className="p-4 flex justify-center gap-4">
                  <Link
                    href={`/dashboard/courses/${params.courseId}/lessons/${lesson._id}/edit`}
                    className="text-blue-500 hover:text-blue-700 transition"
                  >
                    <FaEdit size={18} />
                  </Link>
                  <button
                    onClick={() => handleDelete(lesson._id)}
                    className="text-red-500 hover:text-red-700 transition"
                  >
                    <FaTrashAlt size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {lessons.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="p-4 text-center text-gray-500 dark:text-gray-400"
                >
                  هیچ درسی موجود نیست.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
