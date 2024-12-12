import Image from "next/image";
import contact from "@/public/contact.png";
function page() {
  return (
    <div className="flex flex-col gap-10  mt-[30px] mb-[50px]">
      <div className="flex flex-col gap-2 p-4 md:mx-[30px]">
        <h1 className="text-primary text-xl font-semibold">اطلاعات تماس</h1>
        <p className="text-neutral/80 text-sm">
          سوالی دارید؟ با من در ارتباط باشید! خوشحال می‌شوم دیدگاه‌ها و نظرات
          شما را درباره مقالات وبلاگ بشنوم. می‌توانید از طریق فرم تماس زیر پیام
          بفرستید یا به ایمیل من پیام دهید. 
        </p>
      </div>
      <div className="flex flex-col md:flex-row md:justify-center md:items-center lg:mx-[50px]">
        <div className="flex flex-col md:flex-col-reverse basis-1/2">
          <Image src={contact} alt="callimage" />
          <h2 className="text-primary text-center text-lg font-semibold">
            از تمام نظرات و پیشنهادات و انتقادات استقبال می‌کنم.
          </h2>
        </div>
        <form className=" flex flex-col p-5 gap-4 basis-1/2">
          <input
            type="text"
            className="bg-[#E1E6EB] rounded-lg p-4 focus:outline-primary"
            placeholder="نام و نام خانوادگی"
          />
          <input
            type="email"
            className="bg-[#E1E6EB] rounded-lg p-4 focus:outline-primary"
            placeholder="ایمیل"
          />
          <textarea
            className="bg-[#E1E6EB] rounded-lg p-4 focus:outline-primary h-[150px]"
            placeholder="متن پیام"
          ></textarea>
          <button
            type="submit"
            className="bg-primary text-white py-3 rounded-xl"
          >
            ارسال پیام
          </button>
        </form>
      </div>
    </div>
  );
}

export default page;
