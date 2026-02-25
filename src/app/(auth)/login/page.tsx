import Box from "@mui/material/Box";

import LoginForm from "@/components/auth/LoginForm";
import GuestOnly from "@/components/auth/GuestOnly";

const Login = () => {
  return (
    <GuestOnly>
      <Box sx={{ position: "absolute", top: "200px", left: "35%" }}>
        <LoginForm />
      </Box>
    </GuestOnly>
  );
};

export default Login;
