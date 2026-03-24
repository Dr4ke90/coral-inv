import { useItemsList } from "@/contexts/ItemsListContext";
import { useCallback } from "react";

const useUpdateModalTable = () => {
  const { setItems } = useItemsList();

  const update = useCallback(
    (id: string, columnId: string, value: string) => {
      setItems((prevItems: any[]) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, [columnId]: value } : item,
        ),
      );
    },
    [setItems],
  );

  return { update };
};

export default useUpdateModalTable;
