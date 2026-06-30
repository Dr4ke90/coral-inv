import { Box, Typography, Link, IconButton, Tooltip } from "@mui/material";
import LaunchIcon from "@mui/icons-material/Launch";

interface ActionableCellProps {
  value: string | undefined | null;
  targetId: string | undefined | null;
  basePath?: string; // Opțional, în caz că rutele diferă în viitor
  fontSize?: string;
}

export const ActionableCell = ({
  value,
  targetId,
  basePath = "/detalii",
  fontSize = "13px",
}: ActionableCellProps) => {
  if (!value || value === "-") return "-";

  return (
    <Box display="flex" alignItems="center" gap={0.5}>
      <Typography sx={{ fontSize, color: "#007bff" }}>{value}</Typography>

      {targetId && (
        <Tooltip title="Deschide detalii" arrow placement="top">
          <IconButton
            component={Link}
            href={`${basePath}/${targetId}`}
            target="_blank"
            rel="noopener noreferrer"
            size="small"
            onClick={(e) => e.stopPropagation()}
            sx={{
              padding: "2px",
              color: "#020202",
              "&:hover": {
                color: "#ff9100",
                backgroundColor: "rgba(0, 123, 255, 0.04)",
              },
            }}
          >
            <LaunchIcon sx={{ fontSize: "13px" }} />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );
};
