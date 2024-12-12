import about from "@/public/about.png";
import Image from "next/image";
function page() {
  return (
    <div className="flex flex-col gap-[80px] md:flex-row-reverse justify-center items-center m-10">
      <div className="basis-1/3">
        <Image src={about} alt="about" />
      </div>
      <div className="basis-2/3 flex flex-col gap-4">
        <h2 className="text-primary text-xl font-semibold">درباره من</h2>
        <p className="text-neutral/60 text-sm">
          سلام! من امیرحسین ورمانلی هستم. توسعه‌دهنده وب و عاشق یادگیری و به
          اشتراک‌گذاری دانش. هدف من از راه‌اندازی این وبلاگ، ارائه محتوای مفید و
          کاربردی برای برنامه‌نویسان و علاقه‌مندان به فناوری است. اینجا، از
          تجربیاتم در پروژه‌های مختلف و چالش‌های کاری می‌گویم و سعی می‌کنم
          مفاهیم پیچیده را به زبان ساده توضیح دهم. امیدوارم در این سفر یادگیری
          همراه من باشید.
        </p>
      </div>
    </div>
  );
}

export default page;
