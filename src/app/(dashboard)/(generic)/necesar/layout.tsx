import React from "react";
import { ItemsListProvider } from "@/features/requirement/contexts/ItemsListContext";

const RequirementLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <ItemsListProvider>{children}</ItemsListProvider>;
};

export default RequirementLayout;
