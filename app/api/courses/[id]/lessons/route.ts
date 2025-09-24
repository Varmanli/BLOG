import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Lesson from "@/models/Lesson";
import Course from "@/models/Course";

// گرفتن همه درس‌های یک دوره
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const lessons = await Lesson.find(
      { course: params.id },
      { title: 1, order: 1 }
    )
      .sort({ order: 1 })
      .lean();

    return NextResponse.json(lessons);
  } catch (error) {
    console.error("Error fetching lessons:", error);
    return NextResponse.json(
      { error: "مشکل در گرفتن درس‌ها" },
      { status: 500 }
    );
  }
}

// ایجاد درس جدید
export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const body = await req.json();
    if (!body.title || !body.content) {
      return NextResponse.json(
        { error: "title و content الزامی هستند" },
        { status: 400 }
      );
    }

    // چک کن که دوره وجود داره
    const course = await Course.findById(params.id).select({ _id: 1 }).lean();
    if (!course) {
      return NextResponse.json({ error: "دوره پیدا نشد" }, { status: 404 });
    }

    // ساخت slug
    const slug = body.title.toLowerCase().replace(/\s+/g, "-");

    const lesson = await Lesson.create({
      course: params.id,
      title: body.title,
      slug,
      content: body.content,
      order: body.order || 0,
    });

    return NextResponse.json(lesson);
  } catch (error) {
    console.error("Error creating lesson:", error);
    return NextResponse.json({ error: "مشکل در ایجاد درس" }, { status: 500 });
  }
}
