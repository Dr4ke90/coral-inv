import { toast } from "react-toastify";

export const checkEmptyItems = (items: any[]) => {
  if (items.length === 0) {
    toast.warning("Lista de echipamente nu poate fi goala");
    return true;
  }

  return false;
};
