"use client";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

interface Stats {
  totalViews: number;
  totalBlogs: number;
  totalCategories: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    fetch("/api/stats")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch(() => toast.error("خطا در دریافت آمار"));

    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  if (!stats)
    return (
      <p className="text-gray-700 dark:text-gray-300 text-center mt-10">
        در حال بارگذاری...
      </p>
    );

  const dateStr = time.toLocaleDateString("fa-IR", {
    month: "long",
    year: "numeric",
    weekday: "long",
    day: "numeric",
  });

  const timeStr = time.toLocaleTimeString("fa-IR");

  return (
    <div className="flex min-h-screen transition-all">
      <main className="flex-1 p-6 md:p-10">
        {/* هدر */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 bg-white dark:bg-[#1e1e22] p-6 rounded-2xl shadow-md hover:shadow-lg transition-all">
          <h1 className="text-4xl md:text-5xl font-extrabold text-accent dark:text-[#00FF99]">
            داشبورد مدیریت
          </h1>

          <div className="flex flex-col md:flex-row items-center gap-4 text-gray-600 dark:text-gray-400 text-lg">
            <div className="text-right">
              <div className="font-medium">{dateStr}</div>
              <div className="font-semibold text-accent dark:text-[#00FF99]">
                {timeStr}
              </div>
            </div>

            {/* دکمه رفتن به سایت */}
            <div>
              <a
                href="/"
                target="_blank"
                className="bg-accent dark:bg-[#00FF99] text-black dark:text-gray-900 font-semibold px-6 py-3 rounded-lg hover:bg-accent/90 hover:shadow-xl transition-all shadow-md"
              >
                رفتن به سایت
              </a>
            </div>
          </div>
        </div>

        {/* کارت‌ها */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-[#1E1E22] p-6 rounded-2xl shadow-md hover:shadow-lg transition-all text-center">
            <h2 className="text-lg md:text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
              تعداد کل وبلاگ‌ها
            </h2>
            <p className="text-3xl md:text-4xl font-bold text-accent dark:text-[#00FF99]">
              {stats.totalBlogs}
            </p>
          </div>

          <div className="bg-white dark:bg-[#1E1E22] p-6 rounded-2xl shadow-md hover:shadow-lg transition-all text-center">
            <h2 className="text-lg md:text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
              تعداد بازدیدکنندگان
            </h2>
            <p className="text-3xl md:text-4xl font-bold text-accent dark:text-[#00FF99]">
              {stats.totalViews.toLocaleString()}
            </p>
          </div>

          <div className="bg-white dark:bg-[#1E1E22] p-6 rounded-2xl shadow-md hover:shadow-lg transition-all text-center">
            <h2 className="text-lg md:text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
              دسته‌بندی‌ها
            </h2>
            <p className="text-3xl md:text-4xl font-bold text-accent dark:text-[#00FF99]">
              {stats.totalCategories}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
