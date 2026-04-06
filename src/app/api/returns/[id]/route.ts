import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongo";
import {
  readReturnSheetDetails,
  updateReturnDetails,
} from "@/services/returnService";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  await connectDB();

  const { id } = await params;

  const returnSheet = await readReturnSheetDetails(id);

  if (!returnSheet)
    return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({ data: returnSheet });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  await connectDB();

  const { id } = await params;
  const body = await req.json();

  const updated = await updateReturnDetails(id, body);

  if (!updated)
    return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({ data: updated });
}
