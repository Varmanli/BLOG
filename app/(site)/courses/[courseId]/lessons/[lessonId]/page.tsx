"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import CourseSidebar from "@/app/-component/CourseSidebar";
import LessonContent from "@/app/-component/LessonContent";
import LessonNavigation from "@/app/-component/LessonNavigation";
import Loading from "@/app/loading";

interface LessonItem {
  _id: string;
  title: string;
  order?: number;
}
interface LessonDetail {
  _id: string;
  title: string;
  content: string;
  order?: number;
}

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params?.courseId as string;
  const lessonId = params?.lessonId as string;

  const [lessons, setLessons] = useState<LessonItem[]>([]);
  const [currentLesson, setCurrentLesson] = useState<LessonDetail | null>(null);
  const [loadingLessons, setLoadingLessons] = useState(true);
  const [loadingLesson, setLoadingLesson] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch lessons list for sidebar
  useEffect(() => {
    if (!courseId) return;
    const fetchLessons = async () => {
      try {
        setLoadingLessons(true);
        const res = await fetch(`/api/courses/${courseId}/lessons`, {
          cache: "no-store",
        });
        if (!res.ok) throw new Error("خطا در دریافت لیست درس‌ها");
        const data = await res.json();
        setLessons(data);
      } catch (err) {
        console.error(err);
        setError("مشکلی در دریافت لیست درس‌ها پیش آمد");
      } finally {
        setLoadingLessons(false);
      }
    };
    fetchLessons();
  }, [courseId]);

  // Fetch current lesson content
  useEffect(() => {
    if (!courseId || !lessonId) return;
    const fetchLesson = async () => {
      try {
        setLoadingLesson(true);
        const res = await fetch(
          `/api/courses/${courseId}/lessons/${lessonId}`,
          { cache: "no-store" }
        );
        if (!res.ok) throw new Error("خطا در دریافت محتوای درس");
        const data = await res.json();
        setCurrentLesson(data);
      } catch (err) {
        console.error(err);
        setError("مشکلی در دریافت محتوای درس پیش آمد");
      } finally {
        setLoadingLesson(false);
      }
    };
    fetchLesson();
  }, [courseId, lessonId]);

  const orderedLessons = useMemo(
    () => [...lessons].sort((a, b) => (a.order || 0) - (b.order || 0)),
    [lessons]
  );

  const currentIndex = useMemo(
    () => orderedLessons.findIndex((l) => l._id === lessonId),
    [orderedLessons, lessonId]
  );

  const goToPrevLesson = () => {
    if (currentIndex > 0) {
      const prev = orderedLessons[currentIndex - 1];
      router.push(`/courses/${courseId}/lessons/${prev._id}`);
    }
  };

  const goToNextLesson = () => {
    if (currentIndex < orderedLessons.length - 1) {
      const next = orderedLessons[currentIndex + 1];
      router.push(`/courses/${courseId}/lessons/${next._id}`);
    }
  };

  if (loadingLessons) return <Loading />;

  return (
    <div className="min-h-screen w-full">
      <div className="flex flex-col-reverse md:flex-row-reverse h-full">
        {/* Left: content */}
        <div className="flex-1 border border-zinc-200 bg-white p-4 shadow-sm transition dark:border-zinc-800 dark:bg-[#1e1e22]">
          <div className="mb-4 mr-9 md:mr-0">
            <LessonNavigation
              goToPrevLesson={goToPrevLesson}
              goToNextLesson={goToNextLesson}
              disablePrev={currentIndex <= 0}
              disableNext={
                currentIndex === orderedLessons.length - 1 ||
                currentIndex === -1
              }
            />
          </div>

          <div className="rounded-xl bg-white p-2 dark:bg-transparent">
            {loadingLesson ? (
              <p className="text-center">در حال دریافت محتوای درس...</p>
            ) : error ? (
              <p className="text-center text-red-500">{error}</p>
            ) : currentLesson ? (
              <LessonContent
                lesson={{
                  id: currentLesson._id,
                  title: currentLesson.title,
                  content: currentLesson.content,
                }}
              />
            ) : (
              <p className="text-center text-gray-500">درسی انتخاب نشده</p>
            )}
          </div>

          <div className="mt-4 ">
            <LessonNavigation
              goToPrevLesson={goToPrevLesson}
              goToNextLesson={goToNextLesson}
              disablePrev={currentIndex <= 0}
              disableNext={
                currentIndex === orderedLessons.length - 1 ||
                currentIndex === -1
              }
            />
          </div>
        </div>

        {/* Right: sidebar */}
        <div className="w-10 md:w-60 border-l dark:border-zinc-800">
          <CourseSidebar
            lessons={orderedLessons.map((l) => ({ id: l._id, title: l.title }))}
            currentLessonId={lessonId}
            onSelectLesson={(id) =>
              router.push(`/courses/${courseId}/lessons/${id}`)
            }
          />
        </div>
      </div>
    </div>
  );
}
