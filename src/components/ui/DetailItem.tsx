import { Box, Typography } from "@mui/material";

type DetailItemProps = {
  label: string;
  value?: string;
};

const DetailItem = ({ value, label }: DetailItemProps) => {
  return (
    <Box className="min-w-0 rounded-lg border border-slate-200 bg-slate-50 p-3">
      <Typography
        component="dt"
        className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500"
      >
        {label}
      </Typography>

      <Typography
        component="dt"
        className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500"
      >
        {value}
      </Typography>
    </Box>
  );
};

export default DetailItem;
