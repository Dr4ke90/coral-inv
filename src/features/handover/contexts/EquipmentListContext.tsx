"use client";
import { createContext, useState, ReactNode, useMemo, useContext } from "react";
import { HandoverSheet } from "@/shared/types/handoverSheet.type";
import { EquipmentListType } from "../types/eqListContext.type";

const EquipmentListContext = createContext<EquipmentListType | undefined>(
  undefined,
);

export const EquipmentListProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [eqList, setEqList] = useState<HandoverSheet["eqList"]>([]);

  const addItem = (item: Record<string, any>) => {
    setEqList((prev) => [...prev, item]);
  };

  const removeItem = (index: number) => {
    setEqList((prev) => prev.filter((_, i) => i !== index));
  };

  const clearItems = () => setEqList([]);

  const providerValues = useMemo(() => {
    return {
      eqList,
      addItem,
      removeItem,
      clearItems,
    };
  }, [eqList, addItem, removeItem, clearItems]);

  return (
    <EquipmentListContext.Provider value={providerValues}>
      {children}
    </EquipmentListContext.Provider>
  );
};

export const useEquipmentList = () => {
  const context = useContext(EquipmentListContext);
  if (!context)
    throw new Error(
      "useEquipmentList must be used within <EquipmentListProvider />",
    );
  return context;
};
