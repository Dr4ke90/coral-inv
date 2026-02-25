"use client";

import { createContext, ReactNode, useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authService } from "@/services/authService";
import { LoginData, User } from "@/types/users/types";

interface UserContextType {
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
    queryFn: authService.getCurrentUser,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  const login = useMutation({
    mutationFn: authService.login,
    onSuccess: (newUser) => {
      queryClient.setQueryData(["authUser"], newUser);
    },
  });

  const logout = async () => {
    try {
      await authService.logout();
    } finally {
      queryClient.setQueryData<User | null>(["authUser"], null); //
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
