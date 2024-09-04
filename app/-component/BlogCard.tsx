import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface PropsPost {
  image: string;
  title: string;
  paragraph: string;
  id: number;
}

function BlogCard({ image, title, paragraph, id }: PropsPost) {
  return (
    <div className="flex flex-col items-end justify-between gap-4 p-4 border border-[#BAC6D3] rounded-lg ">
      <div>
        <Image
          src={image}
          alt="image"
          className="rounded-xl"
          width={800}
          height={450}
        />
      </div>
      <div className="flex flex-col  gap-4">
        <h1 className="text-primary font-semibold text-base">{title}</h1>
        <p className="text-neutral/80 text-xs">{paragraph.slice(0, 210)}...</p>
      </div>
      <Link href={`/posts/${id}`}>
        <button className="text-primary text-sm w-[140px] py-1 font-bold border border-primary rounded-xl ">
          ادامه مطلب
        </button>
      </Link>
    </div>
  );
}

export default BlogCard;
