"use client";

import Image from "next/image";
import Link from "next/link";

interface CardProps {
  id: string;
  title: string;
  coverImage?: string;
  buttonText?: string;
  itemType?: "course" | "blog"; 
}

export default function Card({
  id,
  title,
  coverImage,
  buttonText = "مشاهده",
  itemType = "course",
}: CardProps) {
  // تعیین مسیر بر اساس نوع آیتم
  const href = itemType === "course" ? `/courses/${id}` : `/blogs/${id}`;

  return (
    <Link href={href} className="group relative block">
      <div className="bg-white dark:bg-[#1e1e22] rounded-3xl overflow-hidden shadow-lg dark:shadow-[#00FF99]/30 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer">
        {/* تصویر کاور */}
        {coverImage ? (
          <div className="relative w-full h-48 overflow-hidden rounded-t-3xl">
            <Image
              fill
              src={coverImage}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
        ) : (
          <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-400">
            بدون تصویر
          </div>
        )}

        {/* محتوا */}
        <div className="p-6 flex flex-col justify-between h-40">
          <h2 className="text-xl font-bold text-gray-900 dark:text-[#00FF99] mb-4 group-hover:text-indigo-400 transition-colors">
            {title}
          </h2>

          <button className="mt-auto w-full py-3 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 text-white font-semibold rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
            {buttonText}
          </button>
        </div>

        {/* افکت overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-30 transition-opacity rounded-3xl pointer-events-none"></div>
      </div>
    </Link>
  );
}
