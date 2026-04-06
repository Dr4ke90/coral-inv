import { Schema } from "mongoose";
import EquipmentModel from "@/models/equipment.model";

const desktopSchema = new Schema({});

const Desktop =
  EquipmentModel.discriminators?.Desktop ||
  EquipmentModel.discriminator("Desktop", desktopSchema);

export default Desktop;
