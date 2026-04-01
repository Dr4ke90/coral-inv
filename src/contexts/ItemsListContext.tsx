"use client";
import {
  createContext,
  useState,
  ReactNode,
  useMemo,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";

export interface ItemsListContextType<T> {
  items: T[];
  addItem: (item: T) => void;
  addItemsBatch: (newItems: T[]) => void;
  removeItem: (index: number) => void;
  updateItem: (id: string, updatedItem: T) => void;
  clearItems: () => void;
  setItems: Dispatch<SetStateAction<T[]>>;
}

export const ItemsListContext = createContext<
  ItemsListContextType<any> | undefined
>(undefined);

interface ProviderProps {
  children: ReactNode;
}

export const ItemsListProvider = <T extends { id?: string | null }>({
  children,
}: ProviderProps) => {
  const [items, setItems] = useState<T[]>([]);

  const addItem = (item: T) => {
    setItems((prev) => {
      const exists = prev.some((e) => e.id === item.id);
      if (exists) return prev;
      return [...prev, item];
    });
  };

  const addItemsBatch = (newItems: T[]) => {
    setItems((prev) => {
      const existingIds = new Set(prev.map((item) => item.id));

      const filteredNewItems = newItems.filter(
        (newItem) => !existingIds.has(newItem.id),
      );

      return [...prev, ...filteredNewItems];
    });
  };

  const updateItem = (id: string, updatedItem: T) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? updatedItem : item)),
    );
  };

  const removeItem = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const clearItems = () => setItems([]);

  const providerValues = useMemo(() => {
    return {
      items,
      addItem,
      addItemsBatch,
      removeItem,
      updateItem,
      clearItems,
      setItems,
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
  if (!context) {
    throw new Error(
      "useItemsList trebuie folosit in interiorul unui ItemsListProvider",
    );
  }
  return context;
};
