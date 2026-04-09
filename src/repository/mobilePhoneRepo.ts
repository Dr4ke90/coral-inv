import { MobilePhone } from "@/features/mobilePhones/types/phones.type";
import MobilePhoneModel from "@/models/mobilePhone.model";
import { ClientSession } from "mongoose";

export async function getAllMobilePhones() {
  return await MobilePhoneModel.find({});
}

export async function getMobilePhoneById(id: string) {
  return await MobilePhoneModel.findOne({ id });
}

export async function createMobilePhone(
  data: MobilePhone,
  session?: ClientSession,
) {
  return await MobilePhoneModel.create([data], { session });
}

export async function updateMobilePhoneById(id: string, data: any) {
  return await MobilePhoneModel.findOneAndUpdate({ id }, data, {
    returnDocument: "after",
  });
}

export async function updateMobilePhoneDataInTransaction(
  employeeId: string,
  projectId: string,
  pvId: string,
  eqList: string[],
  session: ClientSession,
) {
  return await MobilePhoneModel.updateMany(
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
