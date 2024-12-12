import Image from "next/image";
import image from "@/public/imagehero.png";
function HeroSection() {
  return (
    <div className="flex flex-col justify-center items-center md:flex-row-reverse px-7 ">
      <div className=" mx-auto md:basis-1/3">
        <Image src={image} alt="image" />
      </div>
      <div className="md:basis-1/2">
        <h2 className="text-primary mb-4 text-xl font-semibold">
          اینجا وبلاگ منه!
        </h2>
        <p className="text-neutral/90 ">
          اینجا جاییه که با هم وارد دنیای برنامه‌نویسی و تکنولوژی می‌شیم. <br />
          من امیرحسین هستم و این وبلاگ رو راه انداختم تا تجربیات و دانسته‌هام رو
          درباره موضوعات مختلف مثل برنامه‌نویسی، ابزارها، فریم‌ورک‌ها و
          تکنولوژی‌های جدید با شما به اشتراک بذارم. هدفم اینه که نه تنها اطلاعات
          مفیدی بهتون ارائه بدم، بلکه بهتون کمک کنم توی مسیر یادگیری‌تون راحت‌تر
          پیش برید. از نکات کاربردی و تجربیات واقعی تا مقالات آموزشی و تحلیلی،
          همه اینجا پیدا می‌شه. امیدوارم نوشته‌هام بهتون کمک کنه تا هم ایده‌های
          جدیدی بگیرید و هم انگیزه‌تون برای یادگیری و پیشرفت بیشتر بشه. پس اگر
          شما هم عاشق یادگیری و کنجکاوی توی دنیای کد هستید، جای درستی اومدید.
          همراه من باشید تا این مسیر رو با هم بهتر و جذاب‌تر کنیم!
        </p>
      </div>
    </div>
  );
}

export default HeroSection;
