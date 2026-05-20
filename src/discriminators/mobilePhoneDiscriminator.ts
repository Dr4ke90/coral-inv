import { Schema } from "mongoose";
import EquipmentModel from "@/models/equipmentBaseSchema";

const phoneSchema = new Schema({
  imei: { type: String, default: "" },
  simNo: { type: String, default: "" },
  simSn: { type: String, default: "" },
});

const MobilePhoneModel =
  EquipmentModel.discriminators?.Telefon ||
  EquipmentModel.discriminator("Telefon", phoneSchema);

export default MobilePhoneModel;
