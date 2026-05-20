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
  console.log("AICI AJUNGE?", id);

  const payload = await req.json();
  console.log("PAYLOAD UPDATE", payload);

  const updated = await requirementRepo.updateRequirementById(id, payload);

  if (!updated)
    return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({ data: updated });
}
