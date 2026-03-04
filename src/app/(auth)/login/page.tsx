import Box from "@mui/material/Box";

import LoginForm from "@/shared/components/auth/LoginForm";
import GuestOnly from "@/shared/components/auth/GuestOnly";

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
