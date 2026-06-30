import { ClientSession } from "mongoose";
import TabletModel from "@/discriminators/tabletDiscriminator";
import { MobileDevicesType } from "@/types/mobileDevices.type";

export async function getAllTablets() {
  return await TabletModel.find({}).lean();
}

export async function getTabletById(id: string) {
  return await TabletModel.findOne({ id });
}

export async function createTablet(
  data: MobileDevicesType,
  session?: ClientSession,
) {
  return await TabletModel.create([data], { session });
}

export async function updateTabletById(
  id: string,
  data: Partial<MobileDevicesType>,
) {
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
