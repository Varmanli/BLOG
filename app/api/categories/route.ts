import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Category from "@/models/Category";

connectDB();

export async function GET() {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "خطا در دریافت دسته‌بندی‌ها", error },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, slug } = body;

    if (!name || !slug) {
      return NextResponse.json(
        { message: "name و slug الزامی هستند" },
        { status: 400 }
      );
    }

    const existing = await Category.findOne({ slug });
    if (existing) {
      return NextResponse.json(
        { message: "این slug قبلا استفاده شده" },
        { status: 400 }
      );
    }

    const newCategory = await Category.create({ name, slug });
    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "خطا در ایجاد دسته‌بندی", error },
      { status: 500 }
    );
  }
}
