"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import Card from "./Card";
import Loading from "../loading";

export default function Tutorial() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch("/api/courses");
        if (!res.ok) throw new Error("خطا در دریافت دوره‌ها");
        const data = await res.json();
        setCourses(data);
      } catch (err) {
        console.error("خطا در fetch دوره‌ها:", err);
        setError("مشکلی در ارتباط با سرور پیش آمد");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p className="text-center text-red-500 mt-6">{error}</p>;
  }

  return (
    <section className="py-16 md:px-14 relative">
      <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 text-transparent bg-clip-text animate-fadeIn mb-12 pt-8 text-center">
        دوره‌های آموزشی
      </h1>

      <Swiper
        modules={[Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        spaceBetween={24}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
        loop
        className="md:px-6 relative"
      >
        {courses.map((course) => (
          <SwiperSlide key={course._id}>
            <div className="pb-[100px] p-4">
              <Card
                id={course._id}
                title={course.title}
                coverImage={course.coverImage}
                itemType="course"
                buttonText="مشاهده دوره"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {/* بک‌گراند گرافیکی */}
      <div
        className="absolute top-0 left-[33%]  w-72 h-72 md:w-[600px] md:h-[500px] 
                      rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-400 
                      opacity-40 blur-3xl pointer-events-none"
      ></div>
    </section>
  );
}
