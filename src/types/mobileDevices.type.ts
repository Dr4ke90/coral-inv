import { EquipmentType } from "./equipment.type";

export interface MobileDevicesType extends EquipmentType {
  imei?: string;
  simNo?: string;
  simSn?: string;
}
