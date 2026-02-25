import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ success: true });

  response.cookies.set("session", "", {
    path: "/",
    httpOnly: true,
    expires: new Date(0), 
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  return response;
}
