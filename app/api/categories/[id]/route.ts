import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Category from "@/models/Category";
import Blog from "@/models/Blog";

connectDB();

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const category = await Category.findById(params.id).lean();
    if (!category)
      return NextResponse.json(
        { message: "دسته‌بندی پیدا نشد" },
        { status: 404 }
      );

    // شمارش بلاگ‌های مربوط به همین دسته
    const blogCount = await Blog.countDocuments({ category: params.id });

    return NextResponse.json({ ...category, blogCount });
  } catch (error) {
    return NextResponse.json(
      { message: "خطا در دریافت دسته‌بندی", error },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const { name, slug } = body;
    if (!name || !slug)
      return NextResponse.json(
        { message: "name و slug الزامی هستند" },
        { status: 400 }
      );

    const updated = await Category.findByIdAndUpdate(
      params.id,
      { name, slug },
      { new: true }
    );
    if (!updated)
      return NextResponse.json(
        { message: "دسته‌بندی پیدا نشد" },
        { status: 404 }
      );

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json(
      { message: "خطا در ویرایش دسته‌بندی", error },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const deleted = await Category.findByIdAndDelete(params.id);
    if (!deleted)
      return NextResponse.json(
        { message: "دسته‌بندی پیدا نشد" },
        { status: 404 }
      );
    return NextResponse.json({ message: "دسته‌بندی حذف شد" });
  } catch (error) {
    return NextResponse.json(
      { message: "خطا در حذف دسته‌بندی", error },
      { status: 500 }
    );
  }
}
