import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongo";
import * as usersService from "@/services/usersService";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  await connectDB();
  const { id } = await params;

  const user = await usersService.readUserById(id);

  if (!user) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({ data: user });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  await connectDB();
  const body = await req.json();
  const { id } = await params;

  const updated = await usersService.updateUser(id, body);

  if (!updated)
    return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({ data: updated });
}
