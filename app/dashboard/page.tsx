

export default function DashboardPage() {
  return (
    <div className="flex">
      <main className="flex-1 p-6 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-300">
        <h1 className="text-3xl font-bold mb-6 text-primary dark:text-yellow-400">
          صفحه اصلی داشبورد
        </h1>

        {/* کارت‌های آمار */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
              تعداد کل وبلاگ‌ها
            </h2>
            <p className="text-3xl font-bold text-primary dark:text-yellow-400">
              25
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
              تعداد بازدیدکنندگان
            </h2>
            <p className="text-3xl font-bold text-primary dark:text-yellow-400">
              1,542
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
              دسته‌بندی‌های موجود
            </h2>
            <p className="text-3xl font-bold text-primary dark:text-yellow-400">
              8
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
