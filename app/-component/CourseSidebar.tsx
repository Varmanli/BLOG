"use client";

import { useState } from "react";
import { HiOutlineMenu } from "react-icons/hi";
import { IoClose } from "react-icons/io5";

interface SidebarProps {
  lessons: { id: string; title: string }[];
  currentLessonId: string;
  onSelectLesson: (id: string) => void;
}

export default function CourseSidebar({
  lessons,
  currentLessonId,
  onSelectLesson,
}: SidebarProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* دکمه منو (فقط موبایل) */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden w-10  fixed h-full top-20 right-0 z-20 rounded-lg bg-[#0F0F20] p-2 text-gray-200 shadow-md hover:bg-gray-700 transition"
      >
        <HiOutlineMenu size={24} />
      </button>

      {/* سایدبار */}
      <div
        className={`
         fixed top-20 right-0 bottom-20 h-full w-[240px] dark:bg-[#0F0F20] border-l border-zinc-600 p-4 shadow-xl z-30
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "translate-x-full"}
          md:translate-x-0 md:shadow-none md:rounded-none
        `}
      >
        {/* دکمه بستن (فقط موبایل) */}
        <div className="flex justify-between items-center mb-6 md:hidden">
          <h2 className="text-lg font-semibold text-white">فهرست دروس</h2>
          <button
            onClick={() => setOpen(false)}
            className="rounded-lg p-1 text-gray-300 hover:bg-gray-700 transition"
          >
            <IoClose size={24} />
          </button>
        </div>

        <ul className="space-y-1 ">
          {lessons.map((lesson) => (
            <li
              key={lesson.id}
              onClick={() => {
                onSelectLesson(lesson.id);
                setOpen(false); // بستن منو بعد از انتخاب
              }}
              className={`
                p-3 rounded-lg cursor-pointer transition-colors select-none
                ${
                  lesson.id === currentLessonId
                    ? "bg-accent text-black shadow-md"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }
              `}
            >
              {lesson.title}
            </li>
          ))}
        </ul>
      </div>

      {/* اوورلی (فقط موبایل) */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-10 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
