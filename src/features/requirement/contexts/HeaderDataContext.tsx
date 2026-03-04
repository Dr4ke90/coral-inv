"use client";
import { createContext, useState, ReactNode, useMemo } from "react";
import { RequirementType } from "../types/requiment.type";
import { HeaderDataContextType } from "../types/headerDataContext.type";

export const HeaderDataContext = createContext<
  HeaderDataContextType | undefined
>(undefined);

export const ModalHeaderProvider = ({ children }: { children: ReactNode }) => {
  const [headerData, setHeaderData] = useState<Partial<RequirementType>>({
    project: "",
    date: null,
    createdBy: "",
  });

  const setHeaderValues = (values: Partial<RequirementType>) => {
    setHeaderData((prev) => ({
      ...prev,
      ...values,
    }));
  };

  const resetHeader = () => {
    setHeaderData({ project: "", date: null, createdBy: "" });
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
