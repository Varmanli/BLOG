function Page() {
  return (
    <div className="flex flex-col items-center gap-10 px-6 py-20 mx-4 md:mx-20 transition-all duration-500 rounded-2xl ">
      {/* عنوان */}
      <h2 className="text-3xl md:text-5xl font-extrabold mb-6 text-gray-900 dark:text-gray-100 text-center">
        درباره <span className="text-green-500 dark:text-accent">NexPad</span>
      </h2>

      {/* متن توضیح */}
      <div className="max-w-3xl text-right md:text-right space-y-6">
        <p className="text-gray-800 dark:text-gray-300 text-lg md:text-xl leading-8">
          <span className="text-green-500 dark:text-accent font-semibold">
            NexPad
          </span>{" "}
          پلتفرمی آموزشی برای توسعه‌دهنده‌های آینده است. هدف ما این است که
          مفاهیم برنامه‌نویسی و الگوریتم‌ها را به ساده‌ترین و کاربردی‌ترین شکل
          ممکن آموزش دهیم و مسیر یادگیری را برای شما جذاب‌تر کنیم.
        </p>
        <p className="text-gray-700 dark:text-gray-400 text-lg md:text-xl leading-8">
          این وبلاگ توسط تیم{" "}
          <span className="text-green-500 dark:text-accent font-semibold">
            NexPad
          </span>{" "}
          توسعه داده شده و تجربه‌ها، پروژه‌های واقعی و چالش‌های دنیای کدنویسی را
          با شما به اشتراک می‌گذارد.
        </p>
        <p className="text-gray-700 dark:text-gray-400 text-lg md:text-xl leading-8">
          البته من،{" "}
          <strong className="text-green-500 dark:text-accent">
            امیرحسین ورمانلی
          </strong>
          ، هم در کنار تیم با شما در این مسیر یادگیری همراه خواهم بود 🚀
        </p>
      </div>
    </div>
  );
}

export default Page;
