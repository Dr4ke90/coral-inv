import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongo";
import ReturnSheetModel from "@/models/returnSheets.model";
import mongoose from "mongoose";
import EmployeeModel from "@/models/employee.model";
import EquipmentModel from "@/models/equipment.model";
import ProjectModel from "@/models/project.model";
import { processReturn, readAllReturnSheets } from "@/services/returnService";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const returnSheets = await readAllReturnSheets();

    return NextResponse.json({ data: returnSheets });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch return sheets" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();

    const newReturn = await processReturn(body);

    return NextResponse.json({ data: newReturn });
  } catch (error: any) {
    console.error("Eroare severă la server:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: error.statusCode || 500 },
    );
  }
}
