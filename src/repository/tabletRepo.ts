import { Tablet } from "@/features/tablets/types/tablet.type";
import TabletModel from "@/models/tablet.model";
import { ClientSession } from "mongoose";

export async function getAllTablets() {
  return await TabletModel.find({});
}

export async function getTabletById(id: string) {
  return await TabletModel.findOne({ id });
}

export async function createTablet(data: Tablet, session?: ClientSession) {
  return await TabletModel.create([data], { session });
}

export async function updateTabletById(id: string, data: any) {
  return await TabletModel.findOneAndUpdate({ id }, data, {
    returnDocument: "after",
  });
}

export async function updateTabletDataInTransaction(
  employeeId: string,
  projectId: string,
  pvId: string,
  eqList: string[],
  session: ClientSession,
) {
  return await TabletModel.updateMany(
    { id: { $in: eqList } },
    {
      $set: {
        custodianId: employeeId,
        projectId: projectId,
      },
      $push: { pvRef: pvId },
    },
    { session },
  );
}
