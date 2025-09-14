import Image from "next/image";
import Link from "next/link";

interface PropsPost {
  image?: string;
  title: string;
  paragraph: React.ReactNode;
  slug: string;
  id?: string;
}

export default function BlogCard({
  image,
  title,
  paragraph,
  slug,
  id,
}: PropsPost) {
  return (
    <div className="flex flex-col items-end justify-between gap-4 p-4 border border-[#BAC6D3] rounded-2xl bg-white dark:bg-background dark:border-gray-700 transition-all hover:shadow-lg">
      {/* تصویر */}
      {image && (
        <div className="w-full h-[200px] md:h-[180px] lg:h-[220px] relative overflow-hidden rounded-xl">
          <Image
            src={image}
            alt={title}
            className="object-cover w-full h-full transition-transform hover:scale-105"
            fill
          />
        </div>
      )}

      {/* متن */}
      <div className="flex flex-col gap-3 w-full text-right">
        <h2 className="text-primary dark:text-[#00FF99] font-bold text-lg line-clamp-2">
          {title}
        </h2>
        <p className="text-neutral-700 dark:text-gray-300 text-sm line-clamp-4">
          {paragraph}
        </p>
      </div>

      {/* دکمه ادامه مطلب */}
      <Link href={`/posts/${id || slug}`}>
        <button className="text-primary dark:text-[#00FF99] text-sm w-full py-2 font-semibold border border-primary dark:border-[#00FF99] rounded-xl hover:bg-primary hover:text-white dark:hover:bg-[#00FF99] dark:hover:text-gray-900 transition-all">
          ادامه مطلب
        </button>
      </Link>
    </div>
  );
}
