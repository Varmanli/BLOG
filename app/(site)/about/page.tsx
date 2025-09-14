import about from "@/public/about.png";
import Image from "next/image";

function Page() {
  return (
    <div className="flex flex-col-reverse md:flex-row-reverse items-center gap-10 px-6 py-20 mx-4 md:mx-10 bg-white dark:bg-background transition-all duration-500 rounded-2xl shadow-sm ">
      {/* بخش تصویر */}
      <div className="w-full md:w-1/3 flex justify-center">
        <Image
          src={about}
          alt="about"
          className="rounded-xl shadow-xl hover:scale-105 transition-transform duration-500 mix-blend-lighten"
        />
      </div>

      {/* بخش متن */}
      <div className="w-full md:w-2/3 text-right">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-accent">
          درباره من
        </h2>
        <p className="text-gray-700 dark:text-gray-300 text-lg leading-8">
          سلام 👋 من <strong className="text-accent">امیرحسین ورمانلی</strong>{" "}
          هستم؛ یه توسعه‌دهنده وب که عاشق یادگیری و به اشتراک‌گذاری دانشه. این
          وبلاگ رو ساختم تا تجربه‌هام از{" "}
          <span className="text-accent">پروژه‌های واقعی</span>، چالش‌ها و
          راهکارهایی که پیدا کردم رو با شما به اشتراک بذارم. هدفم اینه که مفاهیم
          سخت رو ساده کنم تا مسیر یادگیری برات جذاب‌تر و کاربردی‌تر بشه. 🚀
          خوشحال می‌شم توی این سفر یادگیری همراهم باشی.
        </p>
      </div>
    </div>
  );
}

export default Page;
