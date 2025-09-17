"use client";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Stats {
  totalViews: number;
  totalBlogs: number;
  totalCategories: number;
  monthlyViews: number[];
  monthlyBlogs: number[];
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch("/api/stats")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => toast.error("خطا در دریافت آمار"));
  }, []);

  const today = new Date().toLocaleDateString("fa-IR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  if (!stats)
    return (
      <p className="text-gray-700 dark:text-gray-300">در حال بارگذاری...</p>
    );

  return (
    <div className="flex min-h-screen transition-all">
      <main className="flex-1 p-6 md:p-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-accent dark:text-[#00FF99]">
            داشبورد مدیریت
          </h1>
          <p className="text-gray-600 dark:text-gray-400">{today}</p>
        </div>

        <div className="flex justify-end mb-6">
          <a
            href="/"
            target="_blank"
            className="bg-accent text-black font-semibold px-4 py-2 rounded-lg hover:bg-accent/80 transition-shadow shadow-md"
          >
            رفتن به سایت
          </a>
        </div>

        {/* کارت‌ها */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <div className="bg-white dark:bg-[#1E1E22] p-6 rounded-2xl shadow-md hover:shadow-lg transition-all">
            <h2 className="text-lg md:text-xl font-semibold text-gray-700 dark:text-gray-300">
              تعداد کل وبلاگ‌ها
            </h2>
            <p className="text-3xl md:text-4xl font-bold text-accent dark:text-[#00FF99]">
              {stats.totalBlogs}
            </p>
          </div>

          <div className="bg-white dark:bg-[#1E1E22] p-6 rounded-2xl shadow-md hover:shadow-lg transition-all">
            <h2 className="text-lg md:text-xl font-semibold text-gray-700 dark:text-gray-300">
              تعداد بازدیدکنندگان
            </h2>
            <p className="text-3xl md:text-4xl font-bold text-accent dark:text-[#00FF99]">
              {stats.totalViews.toLocaleString()}
            </p>
          </div>

          <div className="bg-white dark:bg-[#1E1E22] p-6 rounded-2xl shadow-md hover:shadow-lg transition-all">
            <h2 className="text-lg md:text-xl font-semibold text-gray-700 dark:text-gray-300">
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
