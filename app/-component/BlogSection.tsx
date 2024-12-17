import BlogCard from "./BlogCard";

async function BlogSection() {
  try {
    const result = await fetch("https://strapi-blog.liara.run/api/posts", {
      next: { revalidate: 10 },
    });
    const data = await result.json();
    const posts = data.data;

    return (
      <div className="mt-9 bg-gray-50 dark:bg-gray-900 py-10 transition-all">
        {/* عنوان بخش */}
        <h2 className="text-primary dark:text-yellow-400 text-xl text-center font-bold mb-5">
          مقالات من
        </h2>

        {/* شبکه نمایش بلاگ */}
        <div className="p-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts?.map((post: any) => {
            const { Title, Context } = post.attributes;

            // استخراج تصویر از Context
            const image = Context.find((item: any) => item.type === "image")
              ?.image.url;

            // استخراج متن از پاراگراف‌ها
            const paragraph = Context.filter(
              (item: any) => item.type === "paragraph"
            )
              .map((item: any) => item.children[0].text)
              .join(" ");

            return (
              <BlogCard
                key={post.id}
                image={image}
                paragraph={paragraph}
                title={Title}
                id={post.id}
              />
            );
          })}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching posts:", error);
    return (
      <div className="bg-gray-50 dark:bg-gray-900 text-red-600 dark:text-red-500 px-6 py-4 text-center w-full max-w-md mx-auto space-y-4   transition-all">
        <p className="text-base md:text-lg font-semibold">
          خطایی رخ داده است. لطفاً بعداً دوباره تلاش کنید.
        </p>
        <button className="bg-primary hover:bg-yellow-500 font-bold px-6 py-3 rounded-lg transition-all text-white shadow-md hover:shadow-lg dark:bg-yellow-500 dark:hover:bg-yellow-600 dark:text-gray-900">
          تلاش مجدد
        </button>
      </div>
    );
  }
}

export default BlogSection;
