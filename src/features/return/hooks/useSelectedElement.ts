import { useMemo } from "react";

const useSelectedElement = (
  id: string | undefined,
  eqList: Partial<EquipmentType>[],
): Record<string, any> | null => {
  console.log(id);

  const selectedElement = useMemo(() => {
    const foundItem = eqList.find((item) => item?.id === id);

    return foundItem || null;
  }, [id, eqList]);

  return selectedElement;
};

export default useSelectedElement;
