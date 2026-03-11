import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db/mongo";
import ReturnSheetModel from "@/lib/db/models/returnSheets.model";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  await connectDB();

  const id = await params;

  const handoverSheet = await ReturnSheetModel.findOne({ id });

  if (!handoverSheet)
    return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({ data: handoverSheet });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  await connectDB();

  const { id } = await params;
  const body = await req.json();

  const updated = await ReturnSheetModel.findOneAndUpdate({ id }, body, {
    returnDocument: "after",
  });

  if (!updated)
    return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({ data: updated });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  await connectDB();

  const { id } = await params;

  const deleted = await ReturnSheetModel.findOneAndDelete({
    id,
  });

  if (!deleted)
    return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({ data: { id } });
}
