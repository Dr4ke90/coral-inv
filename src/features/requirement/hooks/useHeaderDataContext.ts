import { useContext } from "react";
import { HeaderDataContext } from "../contexts/HeaderDataContext";

export const useHeaderDataContext = () => {
  const context = useContext(HeaderDataContext);
  if (!context)
    throw new Error(
      "useModalHeader trebuie folosit in interiorul unui ModalHeaderProvider",
    );
  return context;
};
