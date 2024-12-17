import Image from "next/image";
import contact from "@/public/contact.png";

function Page() {
  return (
    <div className="flex flex-col gap-10 mt-[30px] mb-[50px] bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-all">
      {/* اطلاعات تماس */}
      <div className="flex flex-col gap-2 p-4 md:mx-[30px]">
        <h1 className="text-primary dark:text-yellow-400 text-xl font-semibold">
          اطلاعات تماس
        </h1>
        <p className="text-neutral-700 dark:text-gray-300 text-sm">
          سوالی دارید؟ با من در ارتباط باشید! خوشحال می‌شوم دیدگاه‌ها و نظرات
          شما را درباره مقالات وبلاگ بشنوم. می‌توانید از طریق فرم تماس زیر پیام
          بفرستید یا به ایمیل من پیام دهید.
        </p>
      </div>

      {/* تصویر و فرم */}
      <div className="flex flex-col md:flex-row md:justify-center md:items-center lg:mx-[50px]">
        {/* بخش تصویر */}
        <div className="flex flex-col md:flex-col-reverse basis-1/2">
          <Image src={contact} alt="callimage" />
          <h2 className="text-primary dark:text-yellow-400 text-center text-lg font-semibold">
            از تمام نظرات و پیشنهادات و انتقادات استقبال می‌کنم.
          </h2>
        </div>

        {/* فرم */}
        <form className="flex flex-col p-5 gap-4 basis-1/2">
          <input
            type="text"
            className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg p-4 focus:outline-primary dark:focus:outline-yellow-400"
            placeholder="نام و نام خانوادگی"
          />
          <input
            type="email"
            className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg p-4 focus:outline-primary dark:focus:outline-yellow-400"
            placeholder="ایمیل"
          />
          <textarea
            className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg p-4 focus:outline-primary dark:focus:outline-yellow-400 h-[150px]"
            placeholder="متن پیام"
          ></textarea>
          <button
            type="submit"
            className="bg-primary dark:bg-yellow-400 dark:text-gray-900 text-white py-3 rounded-xl hover:bg-primary/80 dark:hover:bg-yellow-500 transition-all"
          >
            ارسال پیام
          </button>
        </form>
      </div>
    </div>
  );
}

export default Page;
