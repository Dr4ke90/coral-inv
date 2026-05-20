"use client";

import { createContext, ReactNode, useContext, useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchCurrentUser } from "../api/auth/fetchCurrentUser";
import { loginUser } from "../api/auth/login";
import { logoutUser } from "../api/auth/logout";
import { User } from "../types/user.type";
import { LoginDataType } from "@/types/loginData.type";

export interface UserContextType {
  user: User | null;
  authChecked: boolean;
  login: (data: LoginDataType) => Promise<any>;
  isLoginLoading: boolean;
  logout: () => void;
}

export const AuthContext = createContext<UserContextType | undefined>(
  undefined,
);

export function AuthProvider({ children }: { readonly children: ReactNode }) {
  const queryClient = useQueryClient();

  const { data: user, isLoading: isFetchingUser } = useQuery({
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
      authChecked: !isFetchingUser,
      login: login.mutateAsync,
      isLoginLoading: login.isPending,
      logout,
    };
  }, [isFetchingUser, user, login.mutateAsync, login.isPending]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useUser = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useUser must be used within AuthProvider");
  return context;
};
