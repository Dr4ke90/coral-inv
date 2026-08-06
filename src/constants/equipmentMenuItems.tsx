import { EquipmentGroup } from "@/contexts/EquipmentFilterContext";
import {
  Computer as SistemeIcon,
  Keyboard as PerifericeIcon,
  Memory as ComponenteIcon,
  Headphones as AccesoriiIcon,
  Router as NetworkingIcon,
  Diversity2 as Diversity,
} from "@mui/icons-material";
import { ReactNode } from "react";

type MenuItem = {
  text: string;
  value: EquipmentGroup;
  icon: ReactNode;
};

export const equipmentMenuItems: MenuItem[] = [
  {
    text: "Toate",
    value: "Toate",
    icon: <Diversity />,
  },
  {
    text: "Sisteme",
    value: "Sisteme-it",
    icon: <SistemeIcon />,
  },
  {
    text: "Periferice",
    value: "Periferice",
    icon: <PerifericeIcon />,
  },
  {
    text: "Componente",
    value: "Componente",
    icon: <ComponenteIcon />,
  },
  {
    text: "Accesorii",
    value: "Accesorii",
    icon: <AccesoriiIcon />,
  },
  {
    text: "Networking",
    value: "Networking",
    icon: <NetworkingIcon />,
  },
];
