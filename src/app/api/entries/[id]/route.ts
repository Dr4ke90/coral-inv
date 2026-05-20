import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongo";
import * as entryService from "@/services/entriesService";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  await connectDB();
  const { id } = await params;

  const entry = await entryService.readEntryById(id);

  if (!entry) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({ data: entry });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  await connectDB();
  const payload = await req.json();
  const { id } = await params;

  const updated = await entryService.updateEntry(id, payload);

  if (!updated)
    return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({ data: updated });
}
