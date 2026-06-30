import { Schema } from "mongoose";
import EquipmentModel from "@/models/equipmentBaseSchema";

const MouseSchema = new Schema({});

const Mouse =
  EquipmentModel.discriminators?.["Mouse"] ||
  EquipmentModel.discriminator("Mouse", MouseSchema);

export default Mouse;
