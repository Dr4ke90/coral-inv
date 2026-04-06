import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongo";
import EquipmentModel from "@/models/equipment.model";
import {
  readEquipmentById,
  updateEquipment,
  updateEquipmentDataInTransaction,
} from "@/services/equipmentService";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  await connectDB();

  const { id } = await params;

  const equipment = await readEquipmentById(id);

  if (!equipment)
    return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({ data: equipment });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  await connectDB();

  const { id } = await params;
  const body = await req.json();

  const updated = await updateEquipment(id, body);

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

  const deleted = await EquipmentModel.findOneAndDelete({
    id,
  });

  if (!deleted)
    return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({ data: { id } });
}
