import { Schema } from "mongoose";
import EquipmentModel from "@/models/equipmentBaseSchema";

const hdmiAdaptorSchema = new Schema({});

const HdmiAdaptor =
  EquipmentModel.discriminators?.["Adaptor HDMI"] ||
  EquipmentModel.discriminator("Adaptor HDMI", hdmiAdaptorSchema);

export default HdmiAdaptor;
