"use client";
import {
  createContext,
  useState,
  ReactNode,
  useMemo,
  useContext,
  useCallback,
} from "react";
import { ItemsListContextProps } from "../types/eqListContext.type";

const ItemsListContext = createContext<ItemsListContextProps | undefined>(
  undefined,
);

export const ItemsListProvider = ({ children }: { children: ReactNode }) => {
  const [eqList, setEqList] = useState<string[]>([]);
  const [previewList, setPreviewList] = useState<EquipmentType[]>([]);

  const addItem = useCallback((item: EquipmentType) => {
    const itemId = item.id as string;

    setEqList((prev) => [...prev, itemId]); 
    setPreviewList((prev) => [...prev, item]); 
  }, []);

  const removeItem = useCallback((index: number) => {
    setEqList((prev) => prev.filter((_, i) => i !== index));
    setPreviewList((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const clearItems = useCallback(() => {
    setEqList([]);
    setPreviewList([]);
  }, []);

  const providerValues = useMemo(() => {
    return {
      eqList,
      previewList, 
      addItem,
      removeItem,
      clearItems,
    };
  }, [eqList, previewList, addItem, removeItem, clearItems]);

  return (
    <ItemsListContext.Provider value={providerValues}>
      {children}
    </ItemsListContext.Provider>
  );
};

export const useItemsList = () => {
  const context = useContext(ItemsListContext);
  if (!context)
    throw new Error("useItemsList must be used within <ItemsListProvider />");
  return context;
};
