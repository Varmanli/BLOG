export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-background dark:bg-[#1c1c22] transition-all">
      <main className="flex-1 p-6 md:p-10">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-8 text-accent dark:text-[#00FF99]">
          صفحه اصلی داشبورد
        </h1>

        {/* کارت‌های آمار */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* تعداد کل وبلاگ‌ها */}
          <div className="bg-white dark:bg-[#1E1E22] p-6 rounded-2xl shadow-md hover:shadow-lg transition-all">
            <h2 className="text-lg md:text-xl font-semibold text-gray-700 dark:text-gray-300">
              تعداد کل وبلاگ‌ها
            </h2>
            <p className="text-3xl md:text-4xl font-bold text-accent dark:text-[#00FF99]">
              25
            </p>
          </div>

          {/* تعداد بازدیدکنندگان */}
          <div className="bg-white dark:bg-[#1E1E22] p-6 rounded-2xl shadow-md hover:shadow-lg transition-all">
            <h2 className="text-lg md:text-xl font-semibold text-gray-700 dark:text-gray-300">
              تعداد بازدیدکنندگان
            </h2>
            <p className="text-3xl md:text-4xl font-bold text-accent dark:text-[#00FF99]">
              1,542
            </p>
          </div>

          {/* دسته‌بندی‌ها */}
          <div className="bg-white dark:bg-[#1E1E22] p-6 rounded-2xl shadow-md hover:shadow-lg transition-all">
            <h2 className="text-lg md:text-xl font-semibold text-gray-700 dark:text-gray-300">
              دسته‌بندی‌های موجود
            </h2>
            <p className="text-3xl md:text-4xl font-bold text-accent dark:text-[#00FF99]">
              8
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
