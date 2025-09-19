import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Course, { ICourse } from "@/models/Course";

// 🛠 util برای ساخت slug امن
function generateSlug(title: string) {
  return title
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-") // فاصله‌ها → خط تیره
    .replace(/[^\w\u0600-\u06FF-]+/g, ""); // حذف کاراکترهای غیرمجاز (فقط حروف، عدد، خط تیره، فارسی)
}

// 📌 گرفتن همه دوره‌ها
export async function GET() {
  try {
    await connectDB();
    const courses = await Course.find().sort({ createdAt: -1 });

    return NextResponse.json(
      courses.map((c) => ({
        _id: c._id,
        title: c.title,
        slug: c.slug,
        category: c.category || "General",
        description: c.description || "",
        coverImage: c.coverImage,
        createdAt: c.createdAt,
        updatedAt: c.updatedAt,
      }))
    );
  } catch (error) {
    console.error("Error fetching courses:", error);
    return NextResponse.json(
      { error: "مشکل در گرفتن دوره‌ها" },
      { status: 500 }
    );
  }
}

// 📌 ایجاد دوره جدید
export async function POST(req: Request) {
  try {
    await connectDB();
    const body: Partial<ICourse> = await req.json();

    if (!body.title?.trim()) {
      return NextResponse.json(
        { error: "عنوان دوره الزامی است" },
        { status: 400 }
      );
    }

    if (!body.coverImage) {
      return NextResponse.json(
        { error: "تصویر کاور الزامی است" },
        { status: 400 }
      );
    }

    const slug = generateSlug(body.title);

    const course = await Course.create({
      title: body.title.trim(),
      slug,
      category: body.category || "General",
      description: body.description || "",
      coverImage: body.coverImage,
    });

    return NextResponse.json({
      _id: course._id,
      title: course.title,
      slug: course.slug,
      category: course.category,
      description: course.description,
      coverImage: course.coverImage,
      createdAt: course.createdAt,
      updatedAt: course.updatedAt,
    });
  } catch (error) {
    console.error("Error creating course:", error);
    return NextResponse.json({ error: "مشکل در ایجاد دوره" }, { status: 500 });
  }
}
