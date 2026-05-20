import { Schema } from "mongoose";
import EquipmentModel from "@/models/equipmentBaseSchema";

const KeyboardSchema = new Schema({});

const Keyboard =
  EquipmentModel.discriminators?.["Tastatura"] ||
  EquipmentModel.discriminator("Tastatura", KeyboardSchema);

export default Keyboard;
