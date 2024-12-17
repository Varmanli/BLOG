"use client";

import { useState } from "react";
import { FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";

interface Category {
  id: number;
  name: string;
}

export default function ManageCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([
    { id: 1, name: "برنامه‌نویسی" },
    { id: 2, name: "تکنولوژی" },
    { id: 3, name: "فرانت‌اند" },
  ]);

  const [newCategory, setNewCategory] = useState("");

  // افزودن دسته‌بندی جدید
  const handleAddCategory = () => {
    if (newCategory.trim() === "") return;

    const newId = categories.length
      ? Math.max(...categories.map((cat) => cat.id)) + 1
      : 1;
    const updatedCategories = [...categories, { id: newId, name: newCategory }];
    setCategories(updatedCategories);
    setNewCategory("");
  };

  // حذف دسته‌بندی
  const handleDeleteCategory = (id: number) => {
    const updatedCategories = categories.filter((cat) => cat.id !== id);
    setCategories(updatedCategories);
  };

  return (
    <main className="p-6 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-300">
      <h1 className="text-3xl font-bold mb-6 text-primary dark:text-yellow-400">
        مدیریت دسته‌بندی‌ها
      </h1>

      {/* فرم افزودن دسته‌بندی */}
      <div className="flex items-center gap-4 mb-6">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="نام دسته‌بندی جدید"
          className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-primary"
        />
        <button
          onClick={handleAddCategory}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition"
        >
          <FaPlus /> افزودن
        </button>
      </div>

      {/* لیست دسته‌بندی‌ها */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white dark:bg-gray-800 shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
              <th className="p-3 text-right">نام دسته‌بندی</th>
              <th className="p-3 text-center">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr
                key={category.id}
                className="border-b hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <td className="p-3">{category.name}</td>
                <td className="p-3 flex justify-center gap-4">
                  <button className="text-blue-500 hover:text-blue-700">
                    <FaEdit size={18} />
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(category.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrashAlt size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {categories.length === 0 && (
              <tr>
                <td
                  colSpan={2}
                  className="p-3 text-center text-gray-500 dark:text-gray-400"
                >
                  هیچ دسته‌بندی‌ای موجود نیست.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
