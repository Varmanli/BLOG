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
        <p className="text-neutral/90">
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده
          از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و
          سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای
          متنوع با هدف بهبود ابزارهای کاربردی می باشد کتابهای زیادی در شصت و سه
          درصد گذشته حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با
          نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان
          خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد در این صورت می توان امید
          .داشت که تمام و دشواری موجود در ارائه راهکارها
        </p>
      </div>
    </div>
  );
}

export default HeroSection;
