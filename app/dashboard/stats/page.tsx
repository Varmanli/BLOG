"use client";

import { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
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
        backgroundColor: "#00FF99",
        borderRadius: 6,
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
        tension: 0.4,
        fill: true,
        pointRadius: 5,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: "var(--tw-text-opacity)", // هماهنگ با Tailwind
        },
      },
      tooltip: {
        mode: "index" as const,
        intersect: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: { color: "var(--tw-text-opacity)" },
        grid: { color: "rgba(200,200,200,0.1)" },
      },
      y: {
        ticks: { color: "var(--tw-text-opacity)" },
        grid: { color: "rgba(200,200,200,0.1)" },
      },
    },
  };

  return (
    <main className="p-6 min-h-screen text-gray-900 dark:text-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-primary dark:text-accent">
        آمار و گزارش‌ها
      </h1>

      {/* کارت‌های آمار */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          {
            icon: (
              <FaEye className="text-5xl text-primary dark:text-accent mb-3" />
            ),
            title: "تعداد بازدیدها",
            value: stats.totalViews.toLocaleString(),
          },
          {
            icon: (
              <FaBlog className="text-5xl text-primary dark:text-accent mb-3" />
            ),
            title: "تعداد بلاگ‌ها",
            value: stats.totalBlogs,
          },
          {
            icon: (
              <FaTags className="text-5xl text-primary dark:text-accent mb-3" />
            ),
            title: "تعداد دسته‌بندی‌ها",
            value: stats.totalCategories,
          },
          {
            icon: (
              <FaChartBar className="text-5xl text-primary dark:text-accent mb-3" />
            ),
            title: "نمودارهای تحلیلی",
            value: "فعال",
          },
        ].map((card, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-[#1e1e22] p-6 rounded-2xl shadow flex flex-col items-center transition-all hover:shadow-lg"
          >
            {card.icon}
            <h2 className="text-lg font-semibold mb-1">{card.title}</h2>
            <p className="text-3xl font-bold">{card.value}</p>
          </div>
        ))}
      </div>

      {/* نمودارها */}
      <div className="flex flex-col gap-8">
        {/* نمودار بازدیدها */}
        <div className="bg-white dark:bg-[#1e1e22] p-14 rounded-2xl shadow transition-all hover:shadow-lg w-full h-[450px]">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
            تعداد بازدیدها (ماهانه)
          </h2>
          <Bar
            data={barData}
            options={{
              ...chartOptions,
              plugins: {
                ...chartOptions.plugins,
                legend: {
                  labels: { color: "#fff" }, // حالت روشن
                },
              },
              scales: {
                x: {
                  ticks: { color: "#fff" },
                  grid: { color: "rgba(200,200,200,0.2)" },
                },
                y: {
                  ticks: { color: "#fff" },
                  grid: { color: "rgba(200,200,200,0.2)" },
                },
              },
            }}
          />
        </div>

        {/* نمودار بلاگ‌ها */}
        <div className="bg-white dark:bg-[#1e1e22] p-14 rounded-2xl shadow transition-all hover:shadow-lg w-full h-[450px]">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
            تعداد بلاگ‌ها (ماهانه)
          </h2>
          <Line
            data={lineData}
            options={{
              ...chartOptions,
              plugins: {
                ...chartOptions.plugins,
                legend: {
                  labels: { color: "#fff" },
                },
              },
              scales: {
                x: {
                  ticks: { color: "#fff" },
                  grid: { color: "rgba(200,200,200,0.2)" },
                },
                y: {
                  ticks: { color: "#fff" },
                  grid: { color: "rgba(200,200,200,0.2)" },
                },
              },
            }}
          />
        </div>
      </div>
    </main>
  );
}
