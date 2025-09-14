import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db"; // فایل اتصال MongoDB
import Blog from "@/models/Blog";
import Category from "@/models/Category";

export async function GET() {
  try {
    await connectDB();

    // تعداد کل بازدیدها
    const totalViewsAgg = await Blog.aggregate([
      { $group: { _id: null, totalViews: { $sum: "$views" } } },
    ]);
    const totalViews = totalViewsAgg[0]?.totalViews || 0;

    // تعداد کل بلاگ‌ها
    const totalBlogs = await Blog.countDocuments();

    // تعداد کل دسته‌بندی‌ها
    const totalCategories = await Category.countDocuments();

    // تعداد بازدید ماهانه (ماه جاری سال جاری)
    const monthlyViewsAgg = await Blog.aggregate([
      {
        $group: {
          _id: {
            month: { $month: "$createdAt" },
            year: { $year: "$createdAt" },
          },
          views: { $sum: "$views" },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    // تعداد بلاگ ماهانه
    const monthlyBlogsAgg = await Blog.aggregate([
      {
        $group: {
          _id: {
            month: { $month: "$createdAt" },
            year: { $year: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    // Map aggregation به آرایه ساده (1 تا 12 ماه)
    const months = Array.from({ length: 12 }, () => 0);
    monthlyViewsAgg.forEach((item) => {
      months[item._id.month - 1] = item.views;
    });
    const monthlyViews = months;

    const blogsPerMonth = Array.from({ length: 12 }, () => 0);
    monthlyBlogsAgg.forEach((item) => {
      blogsPerMonth[item._id.month - 1] = item.count;
    });
    const monthlyBlogs = blogsPerMonth;

    return NextResponse.json({
      totalViews,
      totalBlogs,
      totalCategories,
      monthlyViews,
      monthlyBlogs,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "خطا در دریافت آمار" }, { status: 500 });
  }
}
