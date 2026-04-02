import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db/mongo";
import ReturnSheetModel from "@/lib/db/models/returnSheets.model";
import mongoose from "mongoose";
import EmployeeModel from "@/lib/db/models/employee.model";
import EquipmentModel from "@/lib/db/models/equipment.model";
import ProjectModel from "@/lib/db/models/project.model";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const handoverSheets = await ReturnSheetModel.find({});

    return NextResponse.json({ data: handoverSheets });
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

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const [newReturn] = await ReturnSheetModel.create([body], { session });

      const updatedEmployee = await EmployeeModel.findOneAndUpdate(
        { id: body.recipientPersonId },
        {
          $push: {
            pv: body.id,
          },
          $pull: {
            eqList: { $in: body.eqList },
          },
        },
        { returnDocument: "after", session },
      );

      if (!updatedEmployee) {
        throw new Error("Angajatul nu a fost găsit. Anulare proces.");
      }

      const updatedProject = await ProjectModel.findOneAndUpdate(
        { id: body.projectId },
        {
          $pull: {
            eqList: { $in: body.eqList },
          },
        },
        { returnDocument: "after", session },
      );

      if (!updatedProject) {
        throw new Error("Projectul nu a fost găsit. Anulare proces.");
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

      return NextResponse.json({ data: newReturn });
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
