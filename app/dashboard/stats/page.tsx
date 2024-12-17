"use client";

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

export default function StatsPage() {
  // داده‌های نمودار ستونی
  const barData = {
    labels: ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور"],
    datasets: [
      {
        label: "تعداد بازدیدها",
        data: [120, 150, 180, 220, 300, 280],
        backgroundColor: "#55008A",
      },
    ],
  };

  // داده‌های نمودار خطی
  const lineData = {
    labels: ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور"],
    datasets: [
      {
        label: "تعداد بلاگ‌ها",
        data: [5, 8, 10, 15, 20, 18],
        borderColor: "#FFAB00",
        backgroundColor: "rgba(255, 171, 0, 0.2)",
        tension: 0.3,
      },
    ],
  };

  return (
    <main className="p-6 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-300">
      <h1 className="text-3xl font-bold mb-6 text-primary dark:text-yellow-400">
        آمار و گزارش‌ها
      </h1>

      {/* کارت‌های آمار */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow flex flex-col items-center">
          <FaEye className="text-4xl text-primary dark:text-yellow-400 mb-2" />
          <h2 className="text-lg font-semibold">تعداد بازدیدها</h2>
          <p className="text-2xl font-bold">5,430</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow flex flex-col items-center">
          <FaBlog className="text-4xl text-primary dark:text-yellow-400 mb-2" />
          <h2 className="text-lg font-semibold">تعداد بلاگ‌ها</h2>
          <p className="text-2xl font-bold">25</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow flex flex-col items-center">
          <FaTags className="text-4xl text-primary dark:text-yellow-400 mb-2" />
          <h2 className="text-lg font-semibold">تعداد دسته‌بندی‌ها</h2>
          <p className="text-2xl font-bold">8</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow flex flex-col items-center">
          <FaChartBar className="text-4xl text-primary dark:text-yellow-400 mb-2" />
          <h2 className="text-lg font-semibold">نمودارهای تحلیلی</h2>
          <p className="text-2xl font-bold">فعال</p>
        </div>
      </div>

      {/* نمودارها */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* نمودار ستونی */}
        <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 text-primary dark:text-yellow-400">
            تعداد بازدیدها (ماهانه)
          </h2>
          <Bar data={barData} />
        </div>

        {/* نمودار خطی */}
        <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 text-primary dark:text-yellow-400">
            تعداد بلاگ‌ها (ماهانه)
          </h2>
          <Line data={lineData} />
        </div>
      </div>
    </main>
  );
}
