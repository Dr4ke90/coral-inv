import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongo";
import * as employeeService from "@/services/employeeService";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const employees = await employeeService.readAllEmployees();

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

    const newEmployee = await employeeService.addEmployee(body);

    return NextResponse.json({ data: newEmployee });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create new employee" },
      { status: 500 },
    );
  }
}
