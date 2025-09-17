import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Category from "@/models/Category";
import Blog from "@/models/Blog";

// GET دسته‌بندی‌ها
export async function GET() {
  try {
    await connectDB();

    // همه دسته‌ها
    const categories = await Category.find().sort({ createdAt: -1 }).lean();

    // شمارش بلاگ‌ها برای هر دسته
    const withCounts = await Promise.all(
      categories.map(async (cat) => {
        const count = await Blog.countDocuments({ category: cat._id });
        return { ...cat, blogCount: count };
      })
    );

    return NextResponse.json(withCounts, { status: 200 });
  } catch (error: any) {
    console.error("GET /api/categories error:", error);
    return NextResponse.json(
      { message: "خطا در دریافت دسته‌بندی‌ها", error: error.message },
      { status: 500 }
    );
  }
}
// POST ایجاد دسته‌بندی جدید
export async function POST(req: NextRequest) {
  try {
    await connectDB(); // اینجا هم اتصال زده میشه
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
  } catch (error: any) {
    console.error("POST /api/categories error:", error);
    return NextResponse.json(
      { message: "خطا در ایجاد دسته‌بندی", error: error.message },
      { status: 500 }
    );
  }
}
