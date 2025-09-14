import Image from "next/image";
import parse from "html-react-parser";

interface PageProps {
  params: { id: string };
}

export default async function Page({ params }: PageProps) {
  // fetch سرور ساید
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/blogs/${
      params.id
    }`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("خطا در بارگذاری بلاگ");
  }

  const post = await res.json();
  const { title, content, coverImage } = post;

  return (
    <div className="min-h-[80vh] bg-background dark:bg-[#1c1c22] text-right text-gray-900 dark:text-gray-100 transition-all px-6 md:px-20 py-10 flex flex-col gap-10">
      {/* تصویر اصلی */}
      {coverImage && (
        <div className="w-full h-[300px] md:h-[400px] relative overflow-hidden rounded-2xl">
          <Image
            src={coverImage}
            alt={title}
            fill
            className="object-cover w-full h-full rounded-2xl"
          />
        </div>
      )}

      {/* عنوان */}
      <h1 className="text-2xl md:text-4xl font-extrabold text-accent dark:text-[#00FF99]">
        {title}
      </h1>

      {/* محتوا */}
      <div className="prose dark:prose-invert max-w-4xl">
        {typeof content === "string" ? parse(content) : content}
      </div>
    </div>
  );
}
