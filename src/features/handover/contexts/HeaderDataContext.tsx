"use client";
import { createContext, useState, ReactNode, useMemo, useContext } from "react";
import { HeaderDataContextType } from "../types/headerDataContext.type";
import { HandoverSheet } from "@/shared/types/handoverSheet.type";
import { generatedId } from "@/shared/utils/generateId";
import { useHandoverSheets } from "../hooks/useHandoverSheets";
import { HANDOVER_PREFIX } from "../constants/constants";
import { useUserContext } from "@/features/users/hooks/useUserContext";

const HeaderDataContext = createContext<HeaderDataContextType | undefined>(
  undefined,
);

export const ModalHeaderProvider = ({ children }: { children: ReactNode }) => {
  const { data } = useHandoverSheets();
  const nextId = generatedId(HANDOVER_PREFIX, data);

  const { user } = useUserContext();

  const [headerData, setHeaderData] = useState<Partial<HandoverSheet>>({
    id: nextId,
    handoverPersonId: user?.employeeId,
    date: new Date(),
  });

  const resetHeader = () => {
    setHeaderData({ handoverPersonId: "", date: undefined, id: "" });
  };

  const contextValue = useMemo(() => {
    return { headerData, resetHeader };
  }, [headerData]);

  return (
    <HeaderDataContext.Provider value={contextValue}>
      {children}
    </HeaderDataContext.Provider>
  );
};

export const useHeaderData = () => {
  const context = useContext(HeaderDataContext);
  if (!context)
    throw new Error(
      "useModalHeader trebuie folosit in interiorul unui ModalHeaderProvider",
    );
  return context;
};
