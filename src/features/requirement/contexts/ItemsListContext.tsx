"use client";
import { createContext, useState, ReactNode, useMemo } from "react";
import { RequirementType } from "../types/requiment.type";
import { ItemsListContextType } from "../types/itemsListContext.type";

export const ItemsListContext = createContext<ItemsListContextType | undefined>(
  undefined,
);

export const ItemsListProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<RequirementType["items"]>([]);

  const addItem = (item: Record<string, any>) => {
    setItems((prev) => [...prev, item]);
  };

  const removeItem = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const clearItems = () => setItems([]);

  const providerValues = useMemo(() => {
    return {
      items,
      addItem,
      removeItem,
      clearItems,
    };
  }, [items, addItem, removeItem, clearItems]);

  return (
    <ItemsListContext.Provider value={providerValues}>
      {children}
    </ItemsListContext.Provider>
  );
};
