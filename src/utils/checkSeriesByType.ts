import { toast } from "react-toastify";

export const checkEmptySeries = (items: any[]) => {
  const hasEmptySeries = items.some(
    (item) => !item.series || item.series.trim() === "",
  );

  if (hasEmptySeries) {
    toast.warning("Toate echipamentele trebuie să aibă o serie validă!");
    return true;
  }

  return false;
};
