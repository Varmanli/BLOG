"use client";

import { useEffect, useState } from "react";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

interface Category {
  _id: string;
  name: string;
  createdAt: string;
  blogCount?: number; // 👈 تعداد بلاگ‌های هر دسته
}

type SortField = "name" | "createdAt" | "blogCount";
type SortOrder = "asc" | "desc";

export default function CategoryManagePage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortField, setSortField] = useState<SortField>("createdAt");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/categories");
      if (!res.ok) throw new Error("خطا در دریافت دسته‌بندی‌ها");
      const data = await res.json();

      // فرض می‌کنیم API تعداد بلاگ رو نمی‌ده => باید دستی بگیریم
      const categoriesWithCounts = await Promise.all(
        data.map(async (cat: Category) => {
          try {
            const blogRes = await fetch(`/api/blogs?category=${cat._id}`);
            const blogs = blogRes.ok ? await blogRes.json() : [];
            return { ...cat, blogCount: blogs.length };
          } catch {
            return { ...cat, blogCount: 0 };
          }
        })
      );

      setCategories(categoriesWithCounts);
    } catch (err) {
      console.error(err);
      setError("خطا در دریافت دسته‌بندی‌ها");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const sortedCategories = [...categories].sort((a, b) => {
    let valA: number | string = "";
    let valB: number | string = "";

    if (sortField === "name") {
      valA = a.name;
      valB = b.name;
    } else if (sortField === "createdAt") {
      valA = new Date(a.createdAt).getTime();
      valB = new Date(b.createdAt).getTime();
    } else if (sortField === "blogCount") {
      valA = a.blogCount ?? 0;
      valB = b.blogCount ?? 0;
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
          در حال بارگذاری دسته‌بندی‌ها...
        </p>
      </main>
    );

  return (
    <main className="p-6 min-h-screen text-gray-900 dark:text-gray-100">
      <h1 className="text-3xl font-bold text-accent dark:text-[#00FF99] mb-6">
        مدیریت دسته‌بندی‌ها
      </h1>

      {error && <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>}

      <div className="overflow-x-auto">
        <table className="w-full bg-white dark:bg-[#1e1e22] shadow-xl rounded-2xl overflow-hidden">
          <thead>
            <tr className="bg-gray-100 dark:bg-[#2a2a2e] text-gray-700 dark:text-gray-300">
              <th
                className="p-4 text-right cursor-pointer hover:text-blue-500"
                onClick={() => handleSort("name")}
              >
                نام دسته {renderSortIcon("name")}
              </th>
              <th
                className="p-4 text-right cursor-pointer hover:text-blue-500"
                onClick={() => handleSort("createdAt")}
              >
                تاریخ ایجاد {renderSortIcon("createdAt")}
              </th>
              <th
                className="p-4 text-right cursor-pointer hover:text-blue-500"
                onClick={() => handleSort("blogCount")}
              >
                تعداد بلاگ‌ها {renderSortIcon("blogCount")}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedCategories.map((cat, i) => (
              <tr
                key={cat._id}
                className={`transition-all ${
                  i % 2 === 0
                    ? "bg-gray-50 dark:bg-[#242429]"
                    : "bg-white dark:bg-[#1e1e22]"
                } hover:bg-blue-50 dark:hover:bg-[#2e2e34]`}
              >
                <td className="p-4 font-medium">{cat.name}</td>
                <td className="p-4">
                  {new Date(cat.createdAt).toLocaleDateString("fa-IR")}
                </td>
                <td className="p-4">{cat.blogCount ?? 0}</td>
              </tr>
            ))}
            {categories.length === 0 && (
              <tr>
                <td
                  colSpan={3}
                  className="p-4 text-center text-gray-500 dark:text-gray-400"
                >
                  هیچ دسته‌بندی موجود نیست.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
