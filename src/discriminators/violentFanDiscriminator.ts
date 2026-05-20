import { Schema } from "mongoose";
import EquipmentModel from "@/models/equipmentBaseSchema";

const violentFanSchema = new Schema({});

const ViolentFan =
  EquipmentModel.discriminators?.["Suflanta"] ||
  EquipmentModel.discriminator("Suflanta", violentFanSchema);

export default ViolentFan;
