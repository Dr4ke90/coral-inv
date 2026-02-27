import { RequirementProvider } from "@/features/requirement/RequirementContext";

import React from "react";

const RequirementLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <RequirementProvider>{children}</RequirementProvider>;
};

export default RequirementLayout;
