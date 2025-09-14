import Image from "next/image";
import contact from "@/public/contact.png";

function Page() {
  return (
    <div className="flex flex-col gap-12 mt-10 mb-16 px-6 md:px-12 lg:px-20 bg-white dark:bg-background text-gray-900 dark:text-gray-100 transition-all duration-500">
      {/* اطلاعات تماس */}
      <div className="flex flex-col gap-4 text-right">
        <h1 className="text-2xl md:text-3xl font-extrabold text-accent">
          ارتباط با من
        </h1>
        <p className="text-gray-700 dark:text-gray-300 leading-7">
          سوالی داری؟ خوشحال می‌شم نظرات، پیشنهادات و حتی انتقاداتت رو بشنوم.
          می‌تونی از طریق فرم زیر پیام بدی یا مستقیم برام ایمیل بفرستی. ✉️
        </p>
      </div>

      {/* تصویر و فرم */}
      <div className="flex flex-col md:flex-row md:items-center md:gap-12">
        {/* بخش تصویر */}
        <div className="flex flex-col items-center basis-1/2 gap-4">
          <Image
            src={contact}
            alt="تماس با من"
            className="rounded-xl shadow-lg hover:scale-105 transition-transform duration-500"
          />
          <h2 className="text-center text-lg font-semibold text-accent">
            از تمام پیام‌ها و پیشنهاداتت استقبال می‌کنم 🌟
          </h2>
        </div>

        {/* فرم */}
        <form className="flex flex-col gap-5 basis-1/2 mt-8 md:mt-0">
          <input
            type="text"
            className="bg-gray-100 dark:bg-dark text-gray-900 dark:text-gray-100 border-2 border-gray-50/10  rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-accent"
            placeholder="نام و نام خانوادگی"
          />
          <input
            type="email"
            className="bg-gray-100 dark:bg-dark text-gray-900 dark:text-gray-100 border-2 border-gray-50/10  rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-accent"
            placeholder="ایمیل"
          />
          <textarea
            className="bg-gray-100 dark:bg-dark text-gray-900 dark:text-gray-100 rounded-lg p-4 border-2 border-gray-50/10  h-[150px] focus:outline-none focus:ring-2 focus:ring-accent"
            placeholder="متن پیام"
          ></textarea>
          <button
            type="submit"
            className="bg-accent text-black font-semibold py-3 rounded-lg hover:bg-accent/80 transition-all shadow-md"
          >
            ارسال پیام
          </button>
        </form>
      </div>
    </div>
  );
}

export default Page;
