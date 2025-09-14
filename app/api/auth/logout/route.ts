import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ message: "خروج موفق" });
  response.cookies.set({
    name: "token",
    value: "",
    httpOnly: true,
    path: "/",
    maxAge: 0,
  });
  return response;
}
