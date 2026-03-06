import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db/mongo";
import EmployeeModel from "@/lib/db/models/employee.model";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const employees = await EmployeeModel.find({});

    return NextResponse.json({ data: employees });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch employees" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();

    const newEmployee = await EmployeeModel.create(body);

    return NextResponse.json({ data: newEmployee });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create new employee" },
      { status: 500 },
    );
  }
}
