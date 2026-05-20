import EquipmentModel from "@/models/equipmentBaseSchema";
import { Schema } from "mongoose";

const SsdNvmeSchema = new Schema({});

const SsdNvme =
  EquipmentModel.discriminators?.["SSD NVMe"] ||
  EquipmentModel.discriminator("SSD NVMe", SsdNvmeSchema);

export default SsdNvme;
