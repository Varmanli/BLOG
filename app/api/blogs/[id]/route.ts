import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Blog, { IBlog } from "@/models/Blog";
import { Types } from "mongoose";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    if (!Types.ObjectId.isValid(params.id)) {
      return NextResponse.json({ error: "Invalid blog ID" }, { status: 400 });
    }

    const blog = await Blog.findById(params.id);
    if (!blog)
      return NextResponse.json({ error: "پست پیدا نشد" }, { status: 404 });

    return NextResponse.json(blog);
  } catch (error) {
    return NextResponse.json({ error: "مشکل در گرفتن بلاگ" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    if (!Types.ObjectId.isValid(params.id)) {
      return NextResponse.json({ error: "Invalid blog ID" }, { status: 400 });
    }

    const body: Partial<IBlog> = await req.json();
    const updated = await Blog.findByIdAndUpdate(params.id, body, {
      new: true,
    });

    if (!updated)
      return NextResponse.json({ error: "پست پیدا نشد" }, { status: 404 });

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json(
      { error: "مشکل در بروزرسانی بلاگ" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    if (!Types.ObjectId.isValid(params.id)) {
      return NextResponse.json({ error: "Invalid blog ID" }, { status: 400 });
    }

    const deleted = await Blog.findByIdAndDelete(params.id);
    if (!deleted)
      return NextResponse.json({ error: "پست پیدا نشد" }, { status: 404 });

    return NextResponse.json({ message: "پست حذف شد" });
  } catch (error) {
    return NextResponse.json({ error: "مشکل در حذف بلاگ" }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    if (!Types.ObjectId.isValid(params.id)) {
      return NextResponse.json({ error: "Invalid blog ID" }, { status: 400 });
    }

    const blog = await Blog.findById(params.id);
    if (!blog)
      return NextResponse.json({ error: "پست پیدا نشد" }, { status: 404 });

    blog.views += 1;
    await blog.save();

    return NextResponse.json(blog);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "خطا در آپدیت ویو" }, { status: 500 });
  }
}
