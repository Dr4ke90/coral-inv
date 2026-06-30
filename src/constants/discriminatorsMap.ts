import Printer from "@/discriminators/printerDiscriminator";
import Router from "@/discriminators/routerDiscriminator";
import { Model } from "mongoose";
import Laptop from "@/discriminators/laptopDiscriminator";
import Desktop from "@/discriminators/desktopDiscriminator";
import TabletModel from "@/discriminators/tabletDiscriminator";
import MobilePhoneModel from "@/discriminators/mobilePhoneDiscriminator";
import SsdNvme from "@/discriminators/ssdNvmeDiscriminator";
import ViolentFan from "@/discriminators/violentFanDiscriminator";
import HdmiAdaptor from "@/discriminators/hdmiAdaptorDiscriminator";
import Keyboard from "@/discriminators/keyboardDiscriminator";
import SsdSata from "@/discriminators/ssdSataDiscriminator";
import memorieRam from "@/discriminators/ramDiscriminator";
import Mouse from "@/discriminators/mouseDiscriminator";

const discriminatorsMap: Record<string, Model<any>> = {
  Multifunctionala: Printer,
  Router: Router,
  Laptop: Laptop,
  Desktop: Desktop,
  Tableta: TabletModel,
  Telefon: MobilePhoneModel,
  Suflanta: ViolentFan,
  Tastatura: Keyboard,
  Mouse: Mouse,
  "Adaptor HDMI": HdmiAdaptor,
  "Memorie RAM": memorieRam,
  "SSD NVMe": SsdNvme,
  "SSD Sata": SsdSata,
};

export default discriminatorsMap;
