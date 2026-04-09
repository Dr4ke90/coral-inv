import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongo";
import * as requirementRepo from "@/repository/requirementRepo";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  await connectDB();

  const { id } = await params;

  const requirement = await requirementRepo.getRequirementById(id);

  if (!requirement)
    return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({ data: requirement });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  await connectDB();

  const { id } = await params;
  const body = await req.json();

  const updated = await requirementRepo.updateRequirementById(id, body);

  if (!updated)
    return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({ data: updated });
}
