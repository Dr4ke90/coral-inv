import { useContext } from "react";
import { ItemsListContext } from "../contexts/ItemsListContext";

export const useItemsListContext = () => {
  const context = useContext(ItemsListContext);
  if (!context)
    throw new Error("useItemsList must be used within <ItemsListProvider />");
  return context;
};
