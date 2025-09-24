import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Lesson from "@/models/Lesson";
import mongoose from "mongoose";

type Params = { params: { id: string; lessonId: string } };

function makeSlug(title: string) {
  return title.toLowerCase().trim().replace(/\s+/g, "-");
}

export async function PUT(req: Request, { params }: Params) {
  try {
    await connectDB();
    const { id, lessonId } = params;

    // بررسی فرمت ObjectId
    if (
      !mongoose.Types.ObjectId.isValid(id) ||
      !mongoose.Types.ObjectId.isValid(lessonId)
    ) {
      return NextResponse.json({ error: "شناسه نامعتبر است" }, { status: 400 });
    }

    const body = await req.json();

    // فقط فیلدهای مجاز را استخراج می‌کنیم
    const updates: Record<string, any> = {};
    if (body.title !== undefined) updates.title = body.title;
    if (body.content !== undefined) updates.content = body.content;
    if (body.order !== undefined) updates.order = body.order;

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { error: "هیچ داده‌ای برای به‌روزرسانی ارسال نشده" },
        { status: 400 }
      );
    }

    // در صورت تغییر title، slug بساز و یکتا بودنش رو بررسی کن
    if (updates.title) {
      let slug = makeSlug(updates.title);
      const existing = await Lesson.findOne({ slug, _id: { $ne: lessonId } });
      if (existing) {
        // اگر تکراری بود، یک پسوند امن اضافه کن
        slug = `${slug}-${Date.now().toString().slice(-4)}`;
      }
      updates.slug = slug;
    }

    const updatedLesson = await Lesson.findOneAndUpdate(
      { _id: lessonId, course: id },
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedLesson) {
      return NextResponse.json({ error: "درس پیدا نشد" }, { status: 404 });
    }

    return NextResponse.json(updatedLesson);
  } catch (err: any) {
    console.error("Error updating lesson:", err);

    // خطای duplicate key (مثلاً slug تکراری)
    if (err.code === 11000 && err.keyPattern?.slug) {
      return NextResponse.json(
        { error: "slug تکراری است، عنوان را تغییر دهید" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "مشکل در بروزرسانی درس" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request, { params }: Params) {
  try {
    await connectDB();
    const { id, lessonId } = params;

    if (
      !mongoose.Types.ObjectId.isValid(id) ||
      !mongoose.Types.ObjectId.isValid(lessonId)
    ) {
      return NextResponse.json({ error: "شناسه نامعتبر است" }, { status: 400 });
    }

    const deleted = await Lesson.findOneAndDelete({
      _id: lessonId,
      course: id,
    });

    if (!deleted) {
      return NextResponse.json({ error: "درس پیدا نشد" }, { status: 404 });
    }

    return NextResponse.json({
      message: "درس با موفقیت حذف شد",
      lesson: deleted,
    });
  } catch (err) {
    console.error("Error deleting lesson:", err);
    return NextResponse.json({ error: "مشکل در حذف درس" }, { status: 500 });
  }
}
export async function GET(req: Request, { params }: Params) {
  try {
    await connectDB();
    const { id, lessonId } = params;

    if (
      !mongoose.Types.ObjectId.isValid(id) ||
      !mongoose.Types.ObjectId.isValid(lessonId)
    ) {
      return NextResponse.json({ error: "شناسه نامعتبر است" }, { status: 400 });
    }

    const lesson = await Lesson.findOne(
      { _id: lessonId, course: id },
      { title: 1, content: 1, order: 1 }
    ).lean();

    if (!lesson) {
      return NextResponse.json({ error: "درس پیدا نشد" }, { status: 404 });
    }

    return NextResponse.json(lesson);
  } catch (err) {
    console.error("Error fetching lesson:", err);
    return NextResponse.json({ error: "مشکل در دریافت درس" }, { status: 500 });
  }
}
