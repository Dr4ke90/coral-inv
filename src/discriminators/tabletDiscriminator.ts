import { Schema } from "mongoose";
import EquipmentModel from "@/models/equipmentBaseSchema";

const tabletSchema = new Schema({
  imei: { type: String, default: "" },
  simNo: { type: String, default: "" },
  simSn: { type: String, default: "" },
});

const TabletModel =
  EquipmentModel.discriminators && EquipmentModel.discriminators["Tableta"]
    ? (EquipmentModel.discriminators["Tableta"] as any)
    : EquipmentModel.discriminator("Tableta", tabletSchema);

export default TabletModel;
