import { EQUIPMENT_CATEGORIES } from "./equipmentCategorys";

export const SYSTEMS_IT_TYPES = ["Laptop", "Desktop", "Server"];

export const COMPONENTS_TYPES = [
  "Processor",
  "Memorie RAM",
  "SSD Sata",
  "SSD NVMe",
  "HDD Extern",
  "Placa de baza",
  "Placa video",
  "Sursa",
  "Carcasa",
  "Cooler",
];

export const NETWORKING_TYPES = [
  "Router",
  "Switch",
  "Firewall",
  "Access Point",
  "Modem",
];

export const PERIPHERAL_TYPES = [
  "Multifunctionala",
  "Monitor",
  "Mouse",
  "Tastatura",
  "WebCam",
  "Kit Mouse+Tast",
];

export const ACCESSORIES_TYPES = [
  "Suport Monitor",
  "Mouse Pad",
  "UPS",
  "Suflanta",
  "Adaptor HDMI",
  "Cablu Alimentare",
  "Cablu VGA",
  "Hub USB",
  "Stick USB",
  "Antena Wi-Fi",
  "Geanta Laptop",
];

export const MOBILE_DEVICES_TYPES = "Telefon";

export const TABLET_DEVICES_TYPES = "Tableta";

export const EQUIPMENT_TYPES = [
  ...SYSTEMS_IT_TYPES,
  MOBILE_DEVICES_TYPES,
  TABLET_DEVICES_TYPES,
  ...PERIPHERAL_TYPES,
  ...COMPONENTS_TYPES,
  ...ACCESSORIES_TYPES,
  ...NETWORKING_TYPES,
];

export const EQUIPMENT_TYPES_CONFIG = [
  {
    category: EQUIPMENT_CATEGORIES.PERIPHERALS,
    types: PERIPHERAL_TYPES,
    prefix: "CIT",
  },
  {
    category: EQUIPMENT_CATEGORIES.SYSTEMS_IT,
    types: SYSTEMS_IT_TYPES,
    prefix: "CIT",
  },
  {
    category: EQUIPMENT_CATEGORIES.COMPONENTS,
    types: COMPONENTS_TYPES,
    prefix: "CIT",
  },
  {
    category: EQUIPMENT_CATEGORIES.ACCESSORIES,
    types: ACCESSORIES_TYPES,
    prefix: "CIT",
  },
  {
    category: EQUIPMENT_CATEGORIES.NETWORKING,
    types: NETWORKING_TYPES,
    prefix: "CIT",
  },
  {
    category: EQUIPMENT_CATEGORIES.PHONES,
    types: MOBILE_DEVICES_TYPES,
    prefix: "CTM",
  },
  {
    category: EQUIPMENT_CATEGORIES.TABLETS,
    types: TABLET_DEVICES_TYPES,
    prefix: "CTB",
  },
];
