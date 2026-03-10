import { ItemsListProvider } from "@/contexts/ItemsListContext";
import React from "react";

const RequirementLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <ItemsListProvider>{children}</ItemsListProvider>;
};

export default RequirementLayout;
