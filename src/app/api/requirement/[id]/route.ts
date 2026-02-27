import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongo";
import RequirementSheetModel from "@/features/requirement/models/requirementModel";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  await connectDB();
  const requirement = await RequirementSheetModel.findOne({ id: params.id });
  if (!requirement)
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ data: requirement });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  await connectDB();
  const body = await req.json();
  const updated = await RequirementSheetModel.findOneAndUpdate(
    { id: params.id },
    body,
    { new: true },
  );
  if (!updated)
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ data: updated });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  await connectDB();
  const deleted = await RequirementSheetModel.findOneAndDelete({
    id: params.id,
  });
  if (!deleted)
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ data: { id: params.id } });
}
