import { Box } from "@mui/material";
import { ReactNode } from "react";

export type TopToolbarProps = {
  actions?: ReactNode;
};

const TopToolbarActions = ({ actions }: TopToolbarProps) => {
  return <Box className="flex items-center gap-2 p-2">{actions}</Box>;
};

export default TopToolbarActions;
