import React from "react";
import { InvoiceFormProvider } from "@/contexts/InvoiceContext";

const ItLayout = ({ children }: { children: React.ReactNode }) => {
  return <InvoiceFormProvider>{children}</InvoiceFormProvider>;
};

export default ItLayout;
