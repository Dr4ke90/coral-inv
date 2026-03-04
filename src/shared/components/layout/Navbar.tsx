"use client";
import { Toolbar, Box, Typography, Button } from "@mui/material";
import Image from "next/image";
import logo from "../../../../public/assets/coral.png";
import { useUserContext } from "@/features/users/hooks/useUserContext";
import { useRouter } from "next/navigation";

export function Navbar() {
  const { user, logout } = useUserContext();
  const router = useRouter();

  return (
    <Box className="bg-blue-500/50">
      <Toolbar>
        <Box className="ml-10">
          <Image
            src={logo}
            alt="Logo"
            width={80}
            className="cursor-pointer"
            onClick={() => router.push("/")}
          />
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <Box className="flex flex-col items-center mr-10">
          <Typography>{user?.name}</Typography>
          {user ? (
            <Button variant="outlined" color="error" onClick={() => logout()}>
              Logout
            </Button>
          ) : null}
        </Box>
      </Toolbar>
    </Box>
  );
}
