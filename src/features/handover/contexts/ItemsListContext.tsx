"use client";
import { createContext, useState, ReactNode, useMemo, useContext } from "react";
import { ItemsListContextType } from "../types/itemsListContext.type";
import { HandoverSheet } from "@/shared/types/handoverSheet.type";

const ItemsListContext = createContext<ItemsListContextType | undefined>(
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
    <ItemsListContext.Provider value={providerValues}>
      {children}
    </ItemsListContext.Provider>
  );
};

export const useEquipmentList = () => {
  const context = useContext(ItemsListContext);
  if (!context)
    throw new Error(
      "useItemsList must be used within <EquipmentListProvider />",
    );
  return context;
};
