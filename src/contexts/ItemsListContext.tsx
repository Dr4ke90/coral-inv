"use client";
import { createContext, useState, ReactNode, useMemo, useContext } from "react";

export interface ItemsListContextType<T> {
  items: T[];
  addItem: (item: T) => void;
  removeItem: (index: number) => void;
  clearItems: () => void;
}

export const ItemsListContext = createContext<
  ItemsListContextType<any> | undefined
>(undefined);

interface ProviderProps {
  children: ReactNode;
}

export const ItemsListProvider = <T extends { id: string | void }>({
  children,
}: ProviderProps) => {
  const [items, setItems] = useState<T[]>([]);

  const addItem = (item: T) => {
    setItems((prev) => {
      const exists = prev.some((e) => e.id === item.id);

      if (exists) {
        console.log("Echipamentul este deja adăugat");
        return prev;
      }

      return [...prev, item];
    });
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
  }, [items]);

  return (
    <ItemsListContext.Provider value={providerValues}>
      {children}
    </ItemsListContext.Provider>
  );
};

export const useItemsList = <T,>() => {
  const context = useContext(ItemsListContext) as
    | ItemsListContextType<T>
    | undefined;

  if (context === undefined) {
    throw new Error(
      "useItemsList trebuie folosit in interiorul unui ItemsListProvider",
    );
  }

  return context;
};
