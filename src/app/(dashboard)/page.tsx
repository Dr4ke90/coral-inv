import { useUserContext } from "@/hooks/useUserContext";
import { Box, Button, Typography } from "@mui/material";

const Dashboard = () => {
  const { logout } = useUserContext();

  return (
    <Box>
      <Typography>Dashboard Content </Typography>

      <Button variant="outlined" onClick={() => logout()}>
        Logout
      </Button>
    </Box>
  );
};

export default Dashboard;
