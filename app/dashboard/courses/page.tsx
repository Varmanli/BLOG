"use client";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import {
  FaEdit,
  FaTrashAlt,
  FaPlus,
  FaSort,
  FaSortUp,
  FaSortDown,
  FaBook,
} from "react-icons/fa";
import { uploadFile } from "@/app/actions/file";
import Image from "next/image";

interface Course {
  _id: string;
  title: string;
  lessonsCount: number;
  coverImage?: string;
  createdAt: string;
}

type SortField = "title" | "createdAt" | "lessonsCount";
type SortOrder = "asc" | "desc";

// 📌 Helper برای آیکن سورت
const SortIcon = ({ active, order }: { active: boolean; order: SortOrder }) => {
  if (!active) return <FaSort className="inline ml-1 text-gray-400" />;
  return order === "asc" ? (
    <FaSortUp className="inline ml-1 text-blue-500" />
  ) : (
    <FaSortDown className="inline ml-1 text-blue-500" />
  );
};

// 📌 Modal برای افزودن/ویرایش دوره
function CourseModal({
  isOpen,
  onClose,
  onSave,
  editingCourse,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSave: (payload: { title: string; coverImage?: string }) => void;
  editingCourse: Course | null;
}) {
  const [title, setTitle] = useState(editingCourse?.title || "");
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(
    editingCourse?.coverImage || null
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTitle(editingCourse?.title || "");
    setPreview(editingCourse?.coverImage || null);
    setCoverFile(null);
  }, [editingCourse]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error("نام دوره الزامی است");
      return;
    }
    if (!coverFile && !preview) {
      toast.error("تصویر کاور الزامی است");
      return;
    }

    setLoading(true);
    try {
      let coverUrl = preview;
      if (coverFile) {
        const formData = new FormData();
        formData.append("file", coverFile);
        const uploadResult = await uploadFile(formData);
        if (!uploadResult?.secure_url)
          throw new Error("آپلود تصویر ناموفق بود");
        coverUrl = uploadResult.secure_url;
      }
      onSave({ title, coverImage: coverUrl || undefined });
      onClose();
    } catch (err) {
      toast.error("خطا در ذخیره دوره");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-[#1e1e22] rounded-xl p-6 w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-4">
          {editingCourse ? "ویرایش دوره" : "افزودن دوره جدید"}
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="نام دوره"
            className="p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#242429]"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              setCoverFile(file);
              if (file) setPreview(URL.createObjectURL(file));
            }}
          />
          {preview && (
            <div className="relative w-full h-40 rounded-lg overflow-hidden">
              <Image
                fill
                src={preview}
                alt="preview"
                className="object-cover w-full"
              />
              <button
                type="button"
                onClick={() => {
                  setPreview(null);
                  setCoverFile(null);
                }}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6"
              >
                ×
              </button>
            </div>
          )}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700"
            >
              انصراف
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-lg bg-accent dark:bg-[#00FF99] text-black"
            >
              {loading
                ? "در حال ذخیره..."
                : editingCourse
                ? "بروزرسانی"
                : "افزودن"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// 📌 صفحه مدیریت
export default function ManageCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [sortField, setSortField] = useState<SortField>("createdAt");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchCourses = async () => {
    try {
      const res = await fetch("/api/courses");
      const data = await res.json();
      setCourses(
        data.map((c: any) => ({ ...c, lessonsCount: c.lessons?.length || 0 }))
      );
    } catch {
      toast.error("خطا در دریافت دوره‌ها");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleSave = async (payload: {
    title: string;
    coverImage?: string;
  }) => {
    try {
      if (editingCourse) {
        const res = await fetch(`/api/courses/${editingCourse._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const updated = await res.json();
        setCourses((prev) =>
          prev.map((c) => (c._id === updated._id ? { ...updated } : c))
        );
        toast.success("دوره بروزرسانی شد");
      } else {
        const res = await fetch("/api/courses", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const created = await res.json();
        setCourses((prev) => [...prev, { ...created, lessonsCount: 0 }]);
        toast.success("دوره اضافه شد");
      }
    } catch {
      toast.error("خطا در ذخیره دوره");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("آیا از حذف این دوره مطمئن هستید؟")) return;
    try {
      await fetch(`/api/courses/${id}`, { method: "DELETE" });
      setCourses((prev) => prev.filter((c) => c._id !== id));
      toast.success("دوره حذف شد");
    } catch {
      toast.error("خطا در حذف دوره");
    }
  };

  const sorted = [...courses].sort((a, b) => {
    let valA: any, valB: any;
    if (sortField === "title") {
      valA = a.title;
      valB = b.title;
    } else if (sortField === "createdAt") {
      valA = new Date(a.createdAt).getTime();
      valB = new Date(b.createdAt).getTime();
    } else {
      valA = a.lessonsCount;
      valB = b.lessonsCount;
    }
    if (valA < valB) return sortOrder === "asc" ? -1 : 1;
    if (valA > valB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  if (loading)
    return <p className="text-center mt-10">در حال بارگذاری دوره‌ها...</p>;

  return (
    <main className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-accent">مدیریت دوره‌ها</h1>
        <button
          onClick={() => {
            setEditingCourse(null);
            setModalOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-accent text-black rounded-lg"
        >
          <FaPlus /> افزودن دوره
        </button>
      </div>

      <table className="w-full bg-white dark:bg-[#1e1e22] rounded-xl overflow-hidden">
        <thead>
          <tr>
            {["title", "lessonsCount", "createdAt"].map((field) => (
              <th
                key={field}
                onClick={() => {
                  if (sortField === field) {
                    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                  } else {
                    setSortField(field as SortField);
                    setSortOrder("asc");
                  }
                }}
                className="p-3 cursor-pointer"
              >
                {field === "title" && "نام دوره"}
                {field === "lessonsCount" && "تعداد درس"}
                {field === "createdAt" && "تاریخ ایجاد"}
                <SortIcon active={sortField === field} order={sortOrder} />
              </th>
            ))}
            <th className="p-3">عملیات</th>
          </tr>
        </thead>
        <tbody>
          {sorted.length ? (
            sorted.map((c) => (
              <tr key={c._id} className="hover:bg-gray-600">
                <td className="p-3">{c.title}</td>
                <td className="p-3 text-center">{c.lessonsCount}</td>
                <td className="p-3">
                  {new Date(c.createdAt).toLocaleDateString("fa-IR")}
                </td>
                <td className="p-3 flex gap-3 justify-center">
                  <button
                    onClick={() => handleDelete(c._id)}
                    className="text-red-500"
                  >
                    <FaTrashAlt />
                  </button>
                  <button
                    onClick={() => {
                      setEditingCourse(c);
                      setModalOpen(true);
                    }}
                    className="text-yellow-500"
                  >
                    <FaEdit />
                  </button>
                  <a href={`/dashboard/courses/${c._id}/lessons`}>
                    <FaBook className="text-green-500" />
                  </a>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="text-center p-4">
                هیچ دوره‌ای موجود نیست.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <CourseModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        editingCourse={editingCourse}
      />
    </main>
  );
}
