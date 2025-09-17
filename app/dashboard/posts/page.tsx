"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FaEdit,
  FaTrashAlt,
  FaPlus,
  FaSort,
  FaSortUp,
  FaSortDown,
} from "react-icons/fa";
import { toast } from "react-hot-toast";

interface Post {
  _id: string;
  title: string;
  slug: string;
  createdAt: string;
  views?: number;
}

type SortField = "title" | "createdAt" | "views";
type SortOrder = "asc" | "desc";

export default function ManagePostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortField, setSortField] = useState<SortField>("createdAt");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/blogs");
      if (!res.ok) throw new Error("خطا در دریافت بلاگ‌ها");
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error(err);
      setError("خطا در دریافت بلاگ‌ها");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm("آیا از حذف این بلاگ مطمئن هستید؟");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/blogs/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      toast.success("بلاگ حذف شد");
      setPosts(posts.filter((post) => post._id !== id));
    } catch {
      toast.error("خطا در حذف بلاگ");
    }
  };

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      // تغییر جهت مرتب‌سازی
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const sortedPosts = [...posts].sort((a, b) => {
    let valA: number | string = "";
    let valB: number | string = "";

    if (sortField === "title") {
      valA = a.title;
      valB = b.title;
    } else if (sortField === "createdAt") {
      valA = new Date(a.createdAt).getTime();
      valB = new Date(b.createdAt).getTime();
    } else if (sortField === "views") {
      valA = a.views ?? 0;
      valB = b.views ?? 0;
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
      <main className="p-6 text-gray-800 dark:text-gray-100 min-h-screen">
        <p className="text-center text-accent dark:text-[#00FF99] mt-10">
          در حال بارگذاری بلاگ‌ها...
        </p>
      </main>
    );

  return (
    <main className="p-6 min-h-screen text-gray-900 dark:text-gray-100">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-accent dark:text-[#00FF99]">
          مدیریت بلاگ‌ها
        </h1>
        <Link href="/dashboard/posts/create">
          <button className="flex items-center gap-2 px-4 py-2 bg-accent dark:bg-[#00FF99] text-black rounded-lg hover:opacity-90 transition-all">
            <FaPlus /> افزودن بلاگ جدید
          </button>
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
                عنوان {renderSortIcon("title")}
              </th>
              <th
                className="p-4 text-right cursor-pointer hover:text-blue-500"
                onClick={() => handleSort("createdAt")}
              >
                تاریخ {renderSortIcon("createdAt")}
              </th>
              <th
                className="p-4 text-right cursor-pointer hover:text-blue-500"
                onClick={() => handleSort("views")}
              >
                بازدید {renderSortIcon("views")}
              </th>
              <th className="p-4 text-center">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {sortedPosts.map((post, i) => (
              <tr
                key={post._id}
                className={`transition-all ${
                  i % 2 === 0
                    ? "bg-gray-50 dark:bg-[#242429]"
                    : "bg-white dark:bg-[#1e1e22]"
                } hover:bg-blue-50 dark:hover:bg-[#2e2e34]`}
              >
                <td className="p-4 font-medium">{post.title}</td>
                <td className="p-4">
                  {new Date(post.createdAt).toLocaleDateString("fa-IR")}
                </td>
                <td className="p-4">{post.views ?? 0}</td>
                <td className="p-4 flex justify-center gap-4">
                  <Link href={`/dashboard/posts/edit/${post._id}`}>
                    <button className="text-blue-500 hover:text-blue-700 transition pt-1.5">
                      <FaEdit size={20} />
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="text-red-500 hover:text-red-700 transition"
                  >
                    <FaTrashAlt size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="p-4 text-center text-gray-500 dark:text-gray-400"
                >
                  هیچ بلاگی موجود نیست.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
