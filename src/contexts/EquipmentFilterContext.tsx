// contexts/EquipmentFilterContext.tsx

"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react";

export type EquipmentGroup =
  | "Toate"
  | "Sisteme-it"
  | "Periferice"
  | "Componente"
  | "Accesorii"
  | "Networking";

interface EquipmentFilterContextValue {
  selectedGroup: EquipmentGroup;
  setSelectedGroup: Dispatch<SetStateAction<EquipmentGroup>>;
}

const EquipmentFilterContext = createContext<
  EquipmentFilterContextValue | undefined
>(undefined);

export const EquipmentFilterProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [selectedGroup, setSelectedGroup] = useState<EquipmentGroup>("Toate");

  const values = useMemo(
    () => ({
      selectedGroup,
      setSelectedGroup,
    }),
    [selectedGroup],
  );

  return (
    <EquipmentFilterContext.Provider value={values}>
      {children}
    </EquipmentFilterContext.Provider>
  );
};

export const useEquipmentFilter = () => {
  const context = useContext(EquipmentFilterContext);

  if (!context) {
    throw new Error(
      "useEquipmentFilter trebuie folosit în EquipmentFilterProvider",
    );
  }

  return context;
};
