import { Schema } from "mongoose";
import EquipmentModel from "@/models/equipmentBaseSchema";

const routerSchema = new Schema({
  ssid: { type: String, default: "" },
  pass: { type: String, default: "" },
});

const Router =
  EquipmentModel.discriminators?.Router ||
  EquipmentModel.discriminator("Router", routerSchema);

export default Router;
