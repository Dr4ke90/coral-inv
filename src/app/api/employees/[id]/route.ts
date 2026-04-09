import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongo";
import * as employeeSerevice from "@/services/employeeService";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  await connectDB();
  const { id } = await params;

  const employee = await employeeSerevice.readEmployeeById(id);

  if (!employee)
    return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({ data: employee });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  await connectDB();
  const body = await req.json();
  const { id } = await params;

  const updated = await employeeSerevice.updateEmployee(id, body);

  if (!updated)
    return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({ data: updated });
}
