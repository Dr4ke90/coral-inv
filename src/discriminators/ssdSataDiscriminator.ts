import EquipmentModel from "@/models/equipmentBaseSchema";
import { Schema } from "mongoose";

const SsdSataSchema = new Schema({});

const SsdSata =
  EquipmentModel.discriminators?.["SSD Sata"] ||
  EquipmentModel.discriminator("SSD Sata", SsdSataSchema);

export default SsdSata;
