"use client";
import { createContext,useState, ReactNode, useMemo } from "react";
import { Requirement } from "../types/requirementInterface";
import { HeaderDataContextType } from "../types/headerDataContext.type";



export const HeaderDataContext = createContext<HeaderDataContextType | undefined>(
  undefined,
);

export const ModalHeaderProvider = ({ children }: { children: ReactNode }) => {
  const [headerData, setHeaderData] = useState<Partial<Requirement>>({
    project: "",
    date: null,
    createdBy: "",
  });

  const setHeaderValues = (values: Partial<Requirement>) => {
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


