"use client";
import React, { createContext, useContext, ReactNode } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { InvoiceType } from "@/types/invoice.type";
import { INVOICE_INITIAL_STATE } from "@/constants/invoiceInitialState";

interface InvoiceFormContextType {
  methods: UseFormReturn<InvoiceType>;
}

const InvoiceFormContext = createContext<InvoiceFormContextType | undefined>(
  undefined,
);

export const InvoiceFormProvider = ({ children }: { children: ReactNode }) => {
  const methods = useForm<InvoiceType>({
    defaultValues: INVOICE_INITIAL_STATE,
  });

  return (
    <InvoiceFormContext.Provider value={{ methods }}>
      {children}
    </InvoiceFormContext.Provider>
  );
};

export const useInvoiceFormContext = () => {
  const context = useContext(InvoiceFormContext);
  if (!context) {
    throw new Error(
      "useInvoiceFormContext must be used within an InvoiceFormProvider",
    );
  }
  return context;
};
