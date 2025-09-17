"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { FaGithub, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";

function Page() {
  const [loading, setLoading] = useState(false);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = Object.fromEntries(new FormData(form).entries()) as {
      name: string;
      email: string;
      message: string;
    };

    // --- ولیدیشن سمت کلاینت ---
    let hasError = false;

    if (!formData.name.trim()) {
      toast.error("نام و نام خانوادگی الزامی است");
      hasError = true;
    }

    if (!formData.email.trim()) {
      toast.error("ایمیل الزامی است");
      hasError = true;
    } else if (!validateEmail(formData.email)) {
      toast.error("ایمیل معتبر نیست");
      hasError = true;
    }

    if (!formData.message.trim()) {
      toast.error("متن پیام الزامی است");
      hasError = true;
    }

    if (hasError) return; // اگر خطا داشتیم، ارسال نکن

    // --- ارسال به سرور ---
    setLoading(true);
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const resData = await res.json();

      if (!res.ok) {
        // خطاهای سمت سرور
        if (resData.errors) {
          Object.values(resData.errors).forEach((msg) => {
            if (typeof msg === "string") toast.error(msg);
          });
        } else {
          toast.error(resData.error || "ارسال پیام موفقیت‌آمیز نبود.");
        }
        return;
      }

      toast.success(resData.message);
      form.reset();
    } catch (err) {
      console.log(err);
      toast.error("خطای سرور. دوباره تلاش کنید.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-12 mt-10 mb-16 px-6 md:px-12 lg:px-20 text-gray-900 dark:text-gray-100 transition-all duration-500">
      {/* عنوان */}
      <div className="flex flex-col gap-4 text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-green-500 dark:text-accent">
          ارتباط با ما
        </h1>
        <p className="text-gray-700 dark:text-gray-300 leading-7">
          سوالی داری؟ خوشحال می‌شم نظرات، پیشنهادات و حتی انتقاداتت رو بشنوم.
          می‌تونی از طریق فرم زیر پیام بدی یا مستقیم برام ایمیل بفرستی. ✉️
        </p>
      </div>

      {/* اطلاعات تماس + فرم */}
      <div className="flex flex-col md:flex-row md:items-center justify-between md:gap-12">
        {/* اطلاعات تماس */}
        <div className="max-w-md mx-auto flex flex-col justify-between items-center gap-10 rounded-2xl shadow-lg p-6 transition-all duration-500">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 text-center">
            اطلاعات تماس
          </h2>

          <div className="flex flex-col gap-8 text-gray-800 dark:text-gray-300 text-base">
            <div className="flex justify-between items-center gap-20 border-b border-gray-200 dark:border-gray-700 pb-2">
              <span className="font-semibold">شماره تماس:</span>
              <span className="text-green-500 dark:text-accent font-semibold">
                09016828270
              </span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-2">
              <span className="font-semibold">ایمیل:</span>
              <a
                href="mailto:nexpad1404@gmail.com"
                className="text-green-500 dark:text-accent font-semibold underline"
              >
                nexpad1404@gmail.com
              </a>
            </div>
            <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-2">
              <span className="font-semibold">آدرس:</span>
              <span className="font-semibold">تهران، ایران</span>
            </div>
          </div>

          {/* شبکه‌های اجتماعی */}
          <div className="flex justify-center gap-6 mt-4">
            <a
              href="https://instagram.com/nexpad"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500 hover:text-pink-400 transition-colors text-2xl"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="https://linkedin.com/in/nexpad"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:text-blue-600 transition-colors text-2xl"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://youtube.com/nexpad"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-600 hover:text-red-500 transition-colors text-2xl"
              aria-label="YouTube"
            >
              <FaYoutube />
            </a>
            <a
              href="https://github.com/nexpad"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-800 dark:text-gray-100 hover:text-gray-500 transition-colors text-2xl"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
          </div>
        </div>

        {/* فرم تماس */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 basis-1/2 mt-8 md:mt-0"
        >
          <input
            type="text"
            name="name"
            required
            className="text-gray-900 bg-gray-100 dark:bg-dark dark:text-gray-100 border-2 border-gray-50/10 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-accent"
            placeholder="نام و نام خانوادگی"
          />
          <input
            type="email"
            name="email"
            required
            className="bg-gray-100 dark:bg-dark text-gray-900 dark:text-gray-100 border-2 border-gray-50/10 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-accent"
            placeholder="ایمیل"
          />
          <textarea
            name="message"
            required
            className="bg-gray-100 dark:bg-dark text-gray-900 dark:text-gray-100 rounded-lg p-4 border-2 border-gray-50/10 h-[150px] focus:outline-none focus:ring-2 focus:ring-accent"
            placeholder="متن پیام"
          ></textarea>

          <button
            type="submit"
            disabled={loading}
            className="bg-accent text-black font-semibold py-3 rounded-lg hover:bg-accent/80 transition-all shadow-md disabled:opacity-50"
          >
            {loading ? "در حال ارسال..." : "ارسال پیام"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Page;
