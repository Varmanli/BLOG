import Image from "next/image";
import image from "@/public/imagehero.png";

function HeroSection() {
  return (
    <div className="flex flex-col-reverse md:flex-row-reverse justify-center items-center px-7 py-10 bg-gray-50">
      <div className="w-full md:w-1/3 flex justify-center mb-6 md:mb-0">
        <Image src={image} alt="یک پسر پشت کامپیوتر" />
      </div>
      <div className="w-full md:w-2/3 flex flex-col items-start text-right md:pr-10">
        <h2 className="text-primary mb-4 text-3xl font-extrabold leading-relaxed">
          به دنیای برنامه‌نویسی خوش اومدی!
        </h2>
        <p className="text-neutral-700 mb-6 leading-8">
          اینجا جاییه که با هم وارد دنیای برنامه‌نویسی و تکنولوژی می‌شیم. من
          <strong className="text-primary"> امیرحسین </strong>
          هستم و این وبلاگ رو برای یادگیری، به‌اشتراک‌گذاری و رشد توی دنیای کدها
          ساختم. از نکات کاربردی گرفته تا تجربیات واقعی و مقالات تحلیلی، همه
          اینجا منتظرته! پس با من همراه شو و یادگیری رو به یه تجربه جذاب و
          الهام‌بخش تبدیل کن.
        </p>

        <div className="flex gap-4">
          <a
            href="/blogs"
            className="bg-primary text-white px-5 py-2 rounded-md shadow hover:bg-primary/80 transition-all"
          >
            مطالعه بلاگ‌ها
          </a>
          <a
            href="/popular"
            className="bg-transparent text-primary border border-primary px-5 py-2 rounded-md hover:bg-primary hover:text-white transition-all"
          >
            بلاگ‌های محبوب
          </a>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
