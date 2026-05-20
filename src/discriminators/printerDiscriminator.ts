import { Schema } from "mongoose";
import EquipmentModel from "@/models/equipmentBaseSchema";

const printerSchema = new Schema({
  firmwarePass: { type: String, default: "" },
  tonerModel: { type: String, default: "" },
  drumModel: { type: String, default: "" },
});

const Printer =
  EquipmentModel.discriminators?.Multifunctionala ||
  EquipmentModel.discriminator("Multifunctionala", printerSchema);

export default Printer;
