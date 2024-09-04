import BlogCard from "./BlogCard";

async function BlogSection() {
  try {
    const result = await fetch("https://strapi-blog.liara.run/api/posts", {
      next: { revalidate: 10 },
    });
    const data = await result.json();
    const posts = data.data;

    return (
      <div className="mt-9 ">
        <h2 className="text-primary text-xl text-center font-bold">
          مقالات من
        </h2>
        <div className="p-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 ">
          {posts?.map((post: any) => {
            const { Title, Context } = post.attributes;

            const image = Context.find((item: any) => item.type === "image")
              ?.image.url;
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
    return <p>خطایی رخ داده است. لطفاً بعداً دوباره تلاش کنید.</p>;
  }
}

export default BlogSection;
