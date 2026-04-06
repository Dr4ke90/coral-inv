import Printer from "@/discriminators/printerDiscriminator";
import Router from "@/discriminators/routerDiscriminator";
import { Model } from "mongoose";
import Laptop from "@/discriminators/laptopDiscriminator";
import Desktop from "@/discriminators/desktopDiscriminator";

const discriminatorsMap: Record<string, Model<any>> = {
  Printer: Printer,
  Router: Router,
  Laptop: Laptop,
  Desktop: Desktop,
};

export default discriminatorsMap;
