import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongo";
import ProjectModel from "@/models/project.model";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  await connectDB();

  const id = await params;

  const project = await ProjectModel.findOne({ id });

  if (!project)
    return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({ data: project });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  await connectDB();

  const { id } = await params;
  const body = await req.json();

  const updated = await ProjectModel.findOneAndUpdate({ id }, body, {
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

  const deleted = await ProjectModel.findOneAndDelete({
    id,
  });

  if (!deleted)
    return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({ data: { id } });
}
