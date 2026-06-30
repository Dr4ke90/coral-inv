import EquipmentModel from "@/models/equipmentBaseSchema";
import { Schema } from "mongoose";

const ramSchema = new Schema({});

const memorieRam =
  EquipmentModel.discriminators?.["Memorie RAM"] ||
  EquipmentModel.discriminator("Memorie RAM", ramSchema);

export default memorieRam;
