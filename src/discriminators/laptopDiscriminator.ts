import { Schema } from "mongoose";
import EquipmentModel from "@/models/equipmentBaseSchema";

const laptopSchema = new Schema({});

const Laptop =
  EquipmentModel.discriminators?.Laptop ||
  EquipmentModel.discriminator("Laptop", laptopSchema);

export default Laptop;
