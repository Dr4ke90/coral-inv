"use client";

import { useUser } from "@/features/users/hooks/useUser";
import { Avatar, Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const { login } = useUser();

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    try {
      await login({ username, password });
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError(String(error));
      }
    }
  };

  return (
    <Box className="flex flex-col items-center w-[400px]">
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          label="User"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        {error && <Typography>{error}</Typography>}

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 2, mb: 2 }}
        >
          Sign In
        </Button>
      </Box>
    </Box>
  );
};

export default LoginForm;
