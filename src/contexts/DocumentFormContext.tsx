"use client";
import { createContext, useContext, ReactNode } from "react";
import { FormProvider, useForm, UseFormReturn } from "react-hook-form";
import { EntryType } from "@/types/entry.type";
import { ENTRY_INITIAL_STATE } from "@/states/entryInitialState";

interface DocumentFormContextType {
  methods: UseFormReturn<EntryType>;
}

const DocumentFormContext = createContext<DocumentFormContextType | undefined>(
  undefined,
);

export const InvoiceFormProvider = ({ children }: { children: ReactNode }) => {
  const methods = useForm<EntryType>({
    defaultValues: { ...ENTRY_INITIAL_STATE, createdAt: new Date() },
  });

  return (
    <DocumentFormContext.Provider value={{ methods }}>
      <FormProvider {...methods}>{children}</FormProvider>
    </DocumentFormContext.Provider>
  );
};

export const useDocumentFormContext = () => {
  const context = useContext(DocumentFormContext);
  if (!context) {
    throw new Error(
      "useDocumentFormContext must be used within an DocumentFormProvider",
    );
  }
  return context;
};
