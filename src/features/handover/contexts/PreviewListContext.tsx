"use client";
import { createContext, useState, ReactNode, useMemo, useContext } from "react";
import { ItemsListContextProps } from "../types/eqListContext.type";
import { toast } from "react-toastify";

const PreviewListContext = createContext<ItemsListContextProps | undefined>(
  undefined,
);

export const PreviewListProvider = ({ children }: { children: ReactNode }) => {
  const [previewList, setPreviewList] = useState<EquipmentType[]>([]);

  const addItem = (item: EquipmentType) => {
    setPreviewList((prev) => {
      const exists = prev.some((e) => e.id === item.id);

      if (exists) {
        toast.warning("Echipamentul este deja adăugat");
        return prev;
      }

      return [...prev, item];
    });
  };

  const removeItem = (index: number) => {
    setPreviewList((prev) => prev.filter((_, i) => i !== index));
  };

  const clearItems = () => setPreviewList([]);

  const providerValues = useMemo(() => {
    return {
      previewList,
      addItem,
      removeItem,
      clearItems,
    };
  }, [previewList, addItem, removeItem, clearItems]);

  return (
    <PreviewListContext.Provider value={providerValues}>
      {children}
    </PreviewListContext.Provider>
  );
};

export const usePreviewList = () => {
  const context = useContext(PreviewListContext);
  if (!context)
    throw new Error(
      "usePreviewList must be used within <PreviewListContext />",
    );
  return context;
};
