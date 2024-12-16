import about from "@/public/about.png";
import Image from "next/image";

function Page() {
  return (
    <div className="flex flex-col-reverse md:flex-row-reverse items-center gap-10 px-6 py-12 mx-4 md:mx-10">
      {/* بخش تصویر */}
      <div className="w-full md:w-1/3 flex justify-center">
        <Image
          src={about}
          alt="about"
          className=" hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* بخش متن */}
      <div className="w-full md:w-2/3 text-right">
        <h2 className="text-primary text-3xl font-extrabold mb-4 ">
          درباره من
        </h2>
        <p className="text-neutral-700 text-base leading-8">
          سلام! من <strong>امیرحسین ورمانلی</strong> هستم. توسعه‌دهنده وب و عاشق
          یادگیری و به اشتراک‌گذاری دانش. هدف من از راه‌اندازی این وبلاگ، ارائه
          محتوای مفید و کاربردی برای برنامه‌نویسان و علاقه‌مندان به فناوری است.
          اینجا، از تجربیاتم در پروژه‌های مختلف و چالش‌های کاری می‌گویم و سعی
          می‌کنم مفاهیم پیچیده را به زبان ساده توضیح دهم. امیدوارم در این سفر
          یادگیری همراه من باشید.
        </p>
      </div>
    </div>
  );
}

export default Page;
