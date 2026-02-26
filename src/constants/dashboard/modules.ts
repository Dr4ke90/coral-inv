import { ModuleSection } from "@/types/dashboard/moduleInterface";

export const MODULES: ModuleSection[] = [
  {
    id: 1,
    departament: "general",
    list: ["necesar", "predare", "retur", "proiecte", "angajati"],
  },
  {
    id: 2,
    departament: "it",
    list: ["echipament", "componente", "tablete", "telefoane", "consumabile"],
  },
];