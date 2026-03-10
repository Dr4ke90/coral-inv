import {
  createContext,
  useState,
  ReactNode,
  useMemo,
  useContext,
  useCallback,
} from "react";
import { HandoverSheet } from "@/shared/types/handoverSheet.type";
import { RecipientDataType } from "../types/recipientData.type";

const RecipientDataContext = createContext<RecipientDataType | undefined>(
  undefined,
);

export const RecipientDataProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [recipientData, setRecipientData] = useState<Partial<HandoverSheet>>({
    recipientPersonId: "",
    projectId: "",
  });

  const setRecipientPerson = useCallback((data: Partial<HandoverSheet>) => {
    setRecipientData((prev) => ({ ...prev, ...data }));
  }, []);

  const resetRecipient = useCallback(() => {
    setRecipientData({ recipientPersonId: "", projectId: "" });
  }, []);

  const contextValue = useMemo(() => {
    return { recipientData, setRecipientPerson, resetRecipient };
  }, [recipientData, setRecipientPerson, resetRecipient]);

  return (
    <RecipientDataContext.Provider value={contextValue}>
      {children}
    </RecipientDataContext.Provider>
  );
};

export const useRecipientData = () => {
  const context = useContext(RecipientDataContext);
  if (!context)
    throw new Error(
      "useRecipientData trebuie folosit in interiorul unui RecipientDataProvider",
    );
  return context;
};
