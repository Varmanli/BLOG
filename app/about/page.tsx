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
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده
          از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و
          سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای
          متنوع با هدف بهبود ابزارهای کاربردی می باشد کتابهای زیادی در شصت و سه
          درصد گذشته حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با
          نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان
          خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد در این صورت می توان امید
          داشت که تمام و دشواری موجود در ارائه راهکارها
        </p>
      </div>
    </div>
  );
}

export default page;
