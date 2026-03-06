"use client";
import { createContext, useState, ReactNode, useMemo, useContext } from "react";
import { HeaderDataContextType } from "../types/headerDataContext.type";
import { HandoverSheet } from "@/shared/types/handoverSheet.type";

const HeaderDataContext = createContext<HeaderDataContextType | undefined>(
  undefined,
);

export const ModalHeaderProvider = ({ children }: { children: ReactNode }) => {
  const [headerData, setHeaderData] = useState<Partial<HandoverSheet>>({
    project: "",
    date: undefined,
  });

  const setHeaderValues = (values: Partial<HandoverSheet>) => {
    setHeaderData((prev) => ({
      ...prev,
      ...values,
    }));
  };

  const resetHeader = () => {
    setHeaderData({ project: "", date: undefined });
  };

  const contextValue = useMemo(() => {
    return { headerData, setHeaderValues, resetHeader };
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
