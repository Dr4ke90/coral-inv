import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongo";
import {
  readMobilePhoneById,
  updateMobilePhone,
} from "@/services/mobilePhoneService";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  await connectDB();

  const { id } = await params;

  const equipment = await readMobilePhoneById(id);

  if (!equipment)
    return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({ data: equipment });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  await connectDB();

  const body = await req.json();

  const { id } = await params;

  if (!id || id === "undefined") {
    return NextResponse.json({ error: "ID invalid" }, { status: 400 });
  }

  const updated = await updateMobilePhone(id, body);

  if (!updated)
    return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({ data: updated });
}
