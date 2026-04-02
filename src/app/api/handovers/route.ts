import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db/mongo";
import HandoverSheetModel from "@/lib/db/models/handoversSheet.model";
import EmployeeModel from "@/lib/db/models/employee.model";
import EquipmentModel from "@/lib/db/models/equipment.model";
import ProjectModel from "@/lib/db/models/project.model";
import mongoose from "mongoose";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const handoverSheets = await HandoverSheetModel.find({});

    return NextResponse.json({ data: handoverSheets });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch handover sheets" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const [newhandover] = await HandoverSheetModel.create([body], {
        session,
      });

      const updatedEmployee = await EmployeeModel.findOneAndUpdate(
        { id: body.recipientPersonId },
        {
          $push: {
            pv: body.id,
            eqList: { $each: body.eqList },
          },
        },
        { returnDocument: "after", session },
      );

      if (!updatedEmployee) {
        throw new Error("Employee nu a fost găsit. Anulare proces.");
      }

      const updatedProject = await ProjectModel.findOneAndUpdate(
        { id: body.projectId },
        {
          $push: {
            eqList: { $each: body.eqList },
          },
        },
        { returnDocument: "after", session },
      );

      if (!updatedProject) {
        throw new Error("Project nu a fost găsit. Anulare proces.");
      }

      const updateResult = await EquipmentModel.updateMany(
        { id: { $in: body.eqList } },
        {
          $set: {
            custodianId: body.recipientPersonId,
            projectId: body.projectId,
          },
          $push: {
            pv: body.id,
          },
        },
        { session },
      );

      if (updateResult.matchedCount === 0) {
        throw new Error("Niciun echipament nu a fost găsit. Anulare proces.");
      }

      await session.commitTransaction();
      session.endSession();

      return NextResponse.json({ data: newhandover });
    } catch (transactionError: any) {
      await session.abortTransaction();
      session.endSession();

      console.error(
        "Tranzacție eșuată. S-a făcut rollback:",
        transactionError.message,
      );

      return NextResponse.json(
        {
          error:
            transactionError.message ||
            "Failed to create handover sheet. Rollback successful.",
        },
        { status: 400 },
      );
    }
  } catch (error) {
    console.error("Eroare severă la server:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
