import { Box } from "@mui/material";

const Loader = () => (
  <Box className="flex items-center justify-center h-screen w-full">
    <Box className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></Box>
  </Box>
);

export default Loader;
