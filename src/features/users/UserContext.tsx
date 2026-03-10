"use client";

import { createContext, ReactNode, useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { LoginData } from "@/features/users/types/loginData";
import { fetchCurrentUser } from "./api/fetchCurrentUser";
import { loginUser } from "./api/login";
import { logoutUser } from "./api/logout";
import { User } from "./types/user.type";

export interface UserContextType {
  user: User | null;
  authChecked: boolean;
  login: (data: LoginData) => Promise<any>;
  logout: () => void;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined,
);

export function UserProvider({ children }: { readonly children: ReactNode }) {
  const queryClient = useQueryClient();

  const { data: user, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: fetchCurrentUser,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  const login = useMutation({
    mutationFn: loginUser,
    onSuccess: (newUser) => {
      queryClient.setQueryData(["authUser"], newUser);
    },
  });

  const logout = async () => {
    try {
      await logoutUser();
    } finally {
      queryClient.setQueryData<User | null>(["authUser"], null);
    }
  };

  const value = useMemo(() => {
    return {
      user: user ?? null,
      authChecked: !isLoading,
      login: login.mutateAsync,
      isLoading: login.isPending,
      logout: logout,
    };
  }, [isLoading, user, login, isLoading, logout]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
