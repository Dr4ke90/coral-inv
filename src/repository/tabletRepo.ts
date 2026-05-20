import { ClientSession } from "mongoose";
import TabletModel from "@/discriminators/tabletDiscriminator";
import { TabletType } from "@/types/mobileDevices.type";

export async function getAllTablets() {
  return await TabletModel.find({});
}

export async function getTabletById(id: string) {
  return await TabletModel.findOne({ id });
}

export async function createTablet(data: TabletType, session?: ClientSession) {
  return await TabletModel.create([data], { session });
}

export async function updateTabletById(id: string, data: Partial<TabletType>) {
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
