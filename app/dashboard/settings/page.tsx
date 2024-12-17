"use client";

import { useState } from "react";
import { FaTrash } from "react-icons/fa";

export default function SettingsPage() {
  const [title, setTitle] = useState("وبلاگ من");
  const [description, setDescription] = useState(
    "وبلاگ شخصی برای مقالات برنامه‌نویسی و تکنولوژی"
  );
  const [logo, setLogo] = useState<File | null>(null);
  const [previewLogo, setPreviewLogo] = useState<string | null>(null);

  // تغییر لوگو و نمایش پیش‌نمایش
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogo(file);
      setPreviewLogo(URL.createObjectURL(file));
    }
  };

  // حذف لوگو
  const handleLogoRemove = () => {
    setLogo(null);
    setPreviewLogo(null);
  };

  // ذخیره تنظیمات
  const handleSave = () => {
    console.log("تنظیمات ذخیره شد:", { title, description, logo });
    alert("تنظیمات با موفقیت ذخیره شد!");
  };

  return (
    <main className="p-6 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-300 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-primary dark:text-yellow-400">
        تنظیمات کلی سایت
      </h1>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        {/* فرم تنظیمات */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
          className="space-y-6"
        >
          {/* عنوان سایت */}
          <div>
            <label className="block text-sm font-medium mb-2">عنوان سایت</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none dark:bg-gray-700 dark:text-white"
              placeholder="عنوان سایت را وارد کنید"
            />
          </div>

          {/* توضیحات سایت */}
          <div>
            <label className="block text-sm font-medium mb-2">
              توضیحات متا سایت
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none dark:bg-gray-700 dark:text-white"
              placeholder="توضیحات سایت را وارد کنید"
            ></textarea>
          </div>

          {/* آپلود لوگو */}
          <div>
            <label className="block text-sm font-medium mb-2">آپلود لوگو</label>
            <div className="flex items-center gap-4">
              <label
                htmlFor="logo-upload"
                className="cursor-pointer bg-primary text-white px-6 py-2 rounded-lg shadow hover:bg-primary/80 transition"
              >
                انتخاب فایل
              </label>
              <input
                id="logo-upload"
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
                className="hidden"
              />
              {logo && (
                <button
                  onClick={handleLogoRemove}
                  className="text-red-500 hover:text-red-600 transition"
                >
                  <FaTrash size={18} />
                </button>
              )}
            </div>

            {/* پیش‌نمایش لوگو */}
            {previewLogo && (
              <div className="mt-4 flex items-center flex-col">
                <p className="text-sm font-medium mb-2">پیش‌نمایش لوگو:</p>
                <img
                  src={previewLogo}
                  alt="پیش‌نمایش لوگو"
                  className="w-32 h-32 object-cover rounded-lg shadow border-2 border-primary"
                />
              </div>
            )}
          </div>

          {/* دکمه ذخیره */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/80 transition"
            >
              ذخیره تغییرات
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
