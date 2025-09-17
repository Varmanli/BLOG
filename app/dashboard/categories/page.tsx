"use client";

import { useState, useEffect } from "react";
import {
  FaEdit,
  FaTrashAlt,
  FaCheck,
  FaTimes,
  FaPlus,
  FaSort,
  FaSortUp,
  FaSortDown,
} from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

interface Category {
  _id: string;
  name: string;
  slug: string;
  blogCount?: number;
}

type SortKey = "name" | "blogCount";
type SortOrder = "asc" | "desc";

export default function ManageCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newCategory, setNewCategory] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");
  const [modalCategoryId, setModalCategoryId] = useState<string | null>(null);
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("خطا در دریافت دسته‌بندی‌ها");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;
    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newCategory,
          slug: newCategory.trim().toLowerCase(),
        }),
      });
      if (!res.ok) throw new Error("خطا در ایجاد دسته‌بندی");
      setNewCategory("");
      fetchCategories();
      toast.success("دسته‌بندی اضافه شد");
    } catch {
      toast.error("خطا در ایجاد دسته‌بندی");
    }
  };

  const handleDeleteCategory = async (id: string) => {
    try {
      const res = await fetch(`/api/categories/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setCategories(categories.filter((cat) => cat._id !== id));
      toast.success("دسته‌بندی حذف شد");
    } catch {
      toast.error("خطا در حذف دسته‌بندی");
    } finally {
      setModalCategoryId(null);
    }
  };

  const sortedCategories = [...categories].sort((a, b) => {
    const aValue = a[sortKey] || "";
    const bValue = b[sortKey] || "";
    if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
    if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const renderSortIcon = (key: SortKey) => {
    if (sortKey !== key) return <FaSort className="inline ml-1" />;
    return sortOrder === "asc" ? (
      <FaSortUp className="inline ml-1" />
    ) : (
      <FaSortDown className="inline ml-1" />
    );
  };

  if (loading)
    return (
      <p className="p-6 text-center text-gray-700 dark:text-gray-300">
        در حال بارگذاری...
      </p>
    );

  return (
    <main className="p-6 text-gray-900 dark:text-gray-100 min-h-screen relative">
      <Toaster position="top-right" />

      <h1 className="text-3xl font-bold mb-6 text-primary dark:text-[#00FF99]">
        مدیریت دسته‌بندی‌ها
      </h1>

      {/* فرم افزودن دسته‌بندی */}
      <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="نام دسته‌بندی جدید"
          className="w-full md:w-1/3 p-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-accent dark:focus:outline-[#00FF99] bg-white dark:bg-[#1e1e22] text-gray-900 dark:text-gray-100"
        />
        <button
          onClick={handleAddCategory}
          className="flex items-center gap-2 px-4 py-3 bg-accent dark:bg-[#00FF99] text-black rounded-lg hover:opacity-90 transition-all"
        >
          <FaPlus /> افزودن
        </button>
      </div>

      {/* جدول دسته‌بندی‌ها */}
      {error && <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>}

      <div className="overflow-x-auto rounded-xl shadow-lg">
        <table className="w-full border-collapse bg-white dark:bg-[#1e1e22] text-sm">
          <thead>
            <tr className="bg-gray-100 dark:bg-[#2a2a2e] text-gray-700 dark:text-gray-300">
              <th
                className="p-3 text-right cursor-pointer"
                onClick={() => toggleSort("name")}
              >
                نام دسته‌بندی {renderSortIcon("name")}
              </th>
              <th
                className="p-3 text-center cursor-pointer"
                onClick={() => toggleSort("blogCount")}
              >
                تعداد وبلاگ {renderSortIcon("blogCount")}
              </th>
              <th className="p-3 text-center">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {sortedCategories.map((category) => (
              <tr
                key={category._id}
                className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#2f2f35] transition"
              >
                <td className="p-3 text-right">
                  {editingId === category._id ? (
                    <input
                      type="text"
                      value={editingName}
                      onChange={(e) => setEditingName(e.target.value)}
                      className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-accent dark:focus:outline-[#00FF99] bg-white dark:bg-[#1e1e22] text-gray-900 dark:text-gray-100"
                    />
                  ) : (
                    category.name
                  )}
                </td>
                <td className="p-3 text-center">{category.blogCount ?? 0}</td>
                <td className="p-3 flex justify-center gap-4">
                  {editingId === category._id ? (
                    <>
                      <button
                        onClick={() => {
                          if (!editingName.trim()) return;
                          fetch(`/api/categories/${category._id}`, {
                            method: "PUT",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                              name: editingName,
                              slug: editingName.trim().toLowerCase(),
                            }),
                          }).then(() => {
                            setEditingId(null);
                            setEditingName("");
                            fetchCategories();
                            toast.success("ویرایش انجام شد");
                          });
                        }}
                        className="text-green-500 hover:text-green-700"
                      >
                        <FaCheck size={18} />
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTimes size={18} />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => setModalCategoryId(category._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTrashAlt size={18} />
                      </button>
                      <button
                        onClick={() => {
                          setEditingId(category._id);
                          setEditingName(category.name);
                        }}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <FaEdit size={18} />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
            {categories.length === 0 && (
              <tr>
                <td
                  colSpan={3}
                  className="p-3 text-center text-gray-500 dark:text-gray-400"
                >
                  هیچ دسته‌بندی‌ای موجود نیست.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal حذف */}
      {modalCategoryId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-[#1e1e22] p-6 rounded-xl shadow-lg w-80 text-right">
            <p className="mb-4 text-gray-800 dark:text-gray-100">
              آیا از حذف این دسته‌بندی مطمئن هستید؟
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => handleDeleteCategory(modalCategoryId)}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
              >
                بله
              </button>
              <button
                onClick={() => setModalCategoryId(null)}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg"
              >
                خیر
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
