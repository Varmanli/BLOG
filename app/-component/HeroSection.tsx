import Image from "next/image";
import image from "@/public/imagehero.png";

function HeroSection() {
  return (
    <div className="flex flex-col-reverse md:flex-row-reverse justify-center items-center px-7 py-14 bg-white dark:bg-background">
      {/* تصویر */}
      <div className="w-full md:w-1/3 flex justify-center mb-6 md:mb-0">
        <Image src={image} alt="برنامه‌نویس در حال کدنویسی" priority />
      </div>

      {/* متن */}
      <div className="w-full md:w-2/3 flex flex-col items-start text-right md:pr-10">
        <h2 className="text-accent mb-5 text-2xl md:text-4xl font-extrabold leading-relaxed">
          دنیای کدنویسی همینجاست! 💻
        </h2>

        <p className="text-gray-700 dark:text-gray-400 mb-8 leading-8">
          برنامه‌نویسی فقط یاد گرفتن دستورها نیست، یه سفره به سمت{" "}
          <strong className="text-accent">خلاقیت</strong> و{" "}
          <strong className="text-accent">حل مسئله</strong>.<br /> اینجا قراره
          با هم کدنویسی رو ساده، کاربردی و هیجان‌انگیز یاد بگیریم.
          <br /> از صفر تا پیشرفته، با مثال‌ها و تجربه‌های واقعی جلو میریم.
          آماده‌ای شروع کنی؟ 🚀
        </p>

        {/* دکمه‌ها */}
        <div className="flex gap-4">
          <a
            href="/posts"
            className="bg-accent text-black px-6 py-2 rounded-md shadow hover:bg-accent/80 transition-all"
          >
            شروع یادگیری
          </a>
          <a
            href="/posts"
            className="bg-transparent text-accent border border-accent px-6 py-2 rounded-md hover:bg-accent hover:text-black transition-all"
          >
            همه مقالات
          </a>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
