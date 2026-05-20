import { useMemo } from "react";
import { EquipmentType } from "../../types/equipment.type";

const useSelectedElement = (
  id: string | undefined,
  eqList: Partial<EquipmentType>[],
): Record<string, any> | null => {
  const selectedElement = useMemo(() => {
    const foundItem = eqList.find((item) => item?.id === id);

    return foundItem || null;
  }, [id, eqList]);

  return selectedElement;
};

export default useSelectedElement;
