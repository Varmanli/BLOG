import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Course, { ICourse } from "@/models/Course";

// 🛠 util برای ساخت slug امن
function generateSlug(title: string) {
  return title
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-") // فاصله → خط تیره
    .replace(/[^\w\u0600-\u06FF-]+/g, ""); // فقط حروف، اعداد، فارسی و خط‌تیره
}

// 📌 گرفتن یک دوره بر اساس ID
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const course = await Course.findById(params.id);
    if (!course) {
      return NextResponse.json({ error: "دوره پیدا نشد" }, { status: 404 });
    }

    return NextResponse.json({
      _id: course._id,
      title: course.title,
      slug: course.slug,
      category: course.category || "General",
      description: course.description || "",
      coverImage: course.coverImage,
      createdAt: course.createdAt,
      updatedAt: course.updatedAt,
    });
  } catch (error) {
    console.error("Error fetching course:", error);
    return NextResponse.json({ error: "مشکل در گرفتن دوره" }, { status: 500 });
  }
}

// 📌 بروزرسانی دوره
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const body: Partial<ICourse> = await req.json();

    const existingCourse = await Course.findById(params.id);
    if (!existingCourse) {
      return NextResponse.json({ error: "دوره پیدا نشد" }, { status: 404 });
    }

    // فقط فیلدهای مجاز رو آماده می‌کنیم
    const updateData: Partial<ICourse> = {};

    if (body.title && body.title.trim()) {
      updateData.title = body.title.trim();
      updateData.slug = generateSlug(body.title);
    }

    if (body.category) updateData.category = body.category;
    if (body.description !== undefined)
      updateData.description = body.description;
    if (body.coverImage) updateData.coverImage = body.coverImage;

    const course = await Course.findByIdAndUpdate(
      params.id,
      { $set: updateData },
      { new: true }
    );

    return NextResponse.json({
      _id: course!._id,
      title: course!.title,
      slug: course!.slug,
      category: course!.category || "General",
      description: course!.description || "",
      coverImage: course!.coverImage,
      createdAt: course!.createdAt,
      updatedAt: course!.updatedAt,
    });
  } catch (error) {
    console.error("Error updating course:", error);
    return NextResponse.json(
      { error: "مشکل در بروزرسانی دوره" },
      { status: 500 }
    );
  }
}

// 📌 حذف دوره
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const course = await Course.findByIdAndDelete(params.id);

    if (!course) {
      return NextResponse.json({ error: "دوره پیدا نشد" }, { status: 404 });
    }

    return NextResponse.json({ message: "دوره حذف شد" });
  } catch (error) {
    console.error("Error deleting course:", error);
    return NextResponse.json({ error: "مشکل در حذف دوره" }, { status: 500 });
  }
}
