import Image from "next/image";
import Link from "next/link";

interface PropsPost {
  image: string;
  title: string;
  paragraph: string;
  id: number;
}

function BlogCard({ image, title, paragraph, id }: PropsPost) {
  return (
    <div className="flex flex-col items-end justify-between gap-4 p-4 border border-[#BAC6D3] rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 transition-all">
      <div>
        <Image
          src={image}
          alt="image"
          className="rounded-xl"
          width={800}
          height={450}
        />
      </div>
      <div className="flex flex-col gap-4">
        <h1 className="text-primary dark:text-yellow-400 font-semibold text-base">
          {title}
        </h1>
        <p className="text-neutral/80 dark:text-gray-300 text-xs">
          {paragraph.slice(0, 210)}...
        </p>
      </div>
      <Link href={`/posts/${id}`}>
        <button className="text-primary dark:text-yellow-400 text-sm w-[140px] py-1 font-bold border border-primary dark:border-yellow-400 rounded-xl hover:bg-primary hover:text-white dark:hover:bg-yellow-400 dark:hover:text-gray-900 transition-all">
          ادامه مطلب
        </button>
      </Link>
    </div>
  );
}

export default BlogCard;
