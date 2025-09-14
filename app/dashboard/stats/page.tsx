"use client";

import { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  PointElement,
  LineElement,
  Legend,
} from "chart.js";
import { FaChartBar, FaEye, FaBlog, FaTags } from "react-icons/fa";
import { toast } from "react-hot-toast";

// ثبت کامپوننت‌های Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
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

export default function StatsPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/stats")
      .then((res) => res.json())
      .then((data: Stats) => {
        setStats(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("خطا در دریافت آمار");
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <p className="p-6 text-center text-gray-700 dark:text-gray-300">
        در حال بارگذاری آمار...
      </p>
    );

  if (!stats)
    return (
      <p className="p-6 text-center text-red-600 dark:text-red-400">
        امکان بارگذاری آمار وجود ندارد.
      </p>
    );

  const months = [
    "فروردین",
    "اردیبهشت",
    "خرداد",
    "تیر",
    "مرداد",
    "شهریور",
    "مهر",
    "آبان",
    "آذر",
    "دی",
    "بهمن",
    "اسفند",
  ];

  const barData = {
    labels: months,
    datasets: [
      {
        label: "تعداد بازدیدها",
        data: stats.monthlyViews,
        backgroundColor: "#55008A",
      },
    ],
  };

  const lineData = {
    labels: months,
    datasets: [
      {
        label: "تعداد بلاگ‌ها",
        data: stats.monthlyBlogs,
        borderColor: "#FFAB00",
        backgroundColor: "rgba(255, 171, 0, 0.2)",
        tension: 0.3,
      },
    ],
  };

  return (
    <main className="p-6 bg-gray-50 dark:bg-[#1c1c22] text-gray-900 dark:text-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-primary dark:text-accent">
        آمار و گزارش‌ها
      </h1>

      {/* کارت‌های آمار */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-[#1e1e22] p-6 rounded-2xl shadow flex flex-col items-center transition-all hover:shadow-lg">
          <FaEye className="text-5xl text-primary dark:text-accent mb-3" />
          <h2 className="text-lg font-semibold mb-1">تعداد بازدیدها</h2>
          <p className="text-3xl font-bold">
            {stats.totalViews.toLocaleString()}
          </p>
        </div>

        <div className="bg-white dark:bg-[#1e1e22] p-6 rounded-2xl shadow flex flex-col items-center transition-all hover:shadow-lg">
          <FaBlog className="text-5xl text-primary dark:text-accent mb-3" />
          <h2 className="text-lg font-semibold mb-1">تعداد بلاگ‌ها</h2>
          <p className="text-3xl font-bold">{stats.totalBlogs}</p>
        </div>

        <div className="bg-white dark:bg-[#1e1e22] p-6 rounded-2xl shadow flex flex-col items-center transition-all hover:shadow-lg">
          <FaTags className="text-5xl text-primary dark:text-accent mb-3" />
          <h2 className="text-lg font-semibold mb-1">تعداد دسته‌بندی‌ها</h2>
          <p className="text-3xl font-bold">{stats.totalCategories}</p>
        </div>

        <div className="bg-white dark:bg-[#1e1e22] p-6 rounded-2xl shadow flex flex-col items-center transition-all hover:shadow-lg">
          <FaChartBar className="text-5xl text-primary dark:text-accent mb-3" />
          <h2 className="text-lg font-semibold mb-1">نمودارهای تحلیلی</h2>
          <p className="text-2xl font-bold">فعال</p>
        </div>
      </div>

      {/* نمودارها */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-[#1e1e22] p-6 rounded-2xl shadow transition-all hover:shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-primary dark:text-accent">
            تعداد بازدیدها (ماهانه)
          </h2>
          <Bar data={barData} />
        </div>

        <div className="bg-white dark:bg-[#1e1e22] p-6 rounded-2xl shadow transition-all hover:shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-primary dark:text-accent">
            تعداد بلاگ‌ها (ماهانه)
          </h2>
          <Line data={lineData} />
        </div>
      </div>
    </main>
  );
}
