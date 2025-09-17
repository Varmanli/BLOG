import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Message from "@/models/Message";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: "آیدی پیام الزامی است" },
        { status: 400 }
      );
    }

    const deleted = await Message.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ error: "پیام یافت نشد" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "پیام با موفقیت حذف شد ✅" },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "خطا در حذف پیام" },
      { status: 500 }
    );
  }
}
