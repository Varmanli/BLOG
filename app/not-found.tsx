import Link from "next/link";

function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full text-center space-y-6">
        {/* شماره خطا */}
        <h1 className="text-8xl md:text-9xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
          404
        </h1>

        {/* متن توضیح */}
        <p className="text-2xl md:text-3xl font-mono font-bold">
          چیزی پیدا نشد!
        </p>
        <p className="text-gray-400 font-mono">
          صفحه‌ای که به دنبال آن هستید وجود ندارد یا پاک شده است.
        </p>

        {/* استایل ترمینال‌طور */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg text-left font-mono text-sm p-4 shadow-lg">
          <p className="text-green-400">~/project ❯</p>
          <p>
            <span className="text-red-400">error:</span> مسیر{" "}
            <span className="text-yellow-400">/this-page</span> پیدا نشد
          </p>
        </div>

        {/* دکمه برگشت */}
        <Link href="/">
          <button className="mt-6 px-6 py-2 rounded-lg font-mono text-sm font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 transition-all">
            ← برگشت به صفحه اصلی
          </button>
        </Link>
      </div>
    </section>
  );
}

export default NotFound;
