"use client";

import { createContext, ReactNode, useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Requirement } from "@/features/requirement/types/requirementInterface";
import { requirementService } from "@/features/requirement/services/requirementService";

export interface RequirementContextType {
  data: Requirement[] | [];
  isLoading: boolean;
  postOneRqSheet: (payload: Partial<Requirement>) => Promise<Requirement>;
  updateOneRqSheet: (params: {
    id: string;
    payload: Partial<Requirement>;
  }) => Promise<Requirement>;
}

export const RequirementContext = createContext<
  RequirementContextType | undefined
>(undefined);

export function RequirementProvider({
  children,
}: {
  readonly children: ReactNode;
}) {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["requirement"],
    queryFn: requirementService.getAllData,
    refetchOnWindowFocus: false,
    retry: 1,
    staleTime: 1000 * 60 * 5,
  });

  const postOneRqSheet = useMutation({
    mutationFn: requirementService.postOneRequirementSheet,
    onSuccess: (newSheet) => {
      queryClient.setQueryData<Requirement[]>(["requirement"], (old) =>
        old ? [...old, newSheet] : [newSheet],
      );
    },
  });

  const updateOneRqSheet = useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: Partial<Requirement>;
    }) => requirementService.putRequirementSheet(id, payload),

    onSuccess: (updatedSheet) => {
      queryClient.setQueryData<Requirement[]>(["requirement"], (old) =>
        old
          ? old.map((item) =>
              item.id === updatedSheet.id ? updatedSheet : item,
            )
          : [],
      );
    },
  });

  const value = useMemo(() => {
    return {
      data: data ?? [],
      isLoading: isLoading,
      postOneRqSheet: postOneRqSheet.mutateAsync,
      updateOneRqSheet: updateOneRqSheet.mutateAsync,
    };
  }, [isLoading, data, postOneRqSheet, updateOneRqSheet]);

  return (
    <RequirementContext.Provider value={value}>
      {children}
    </RequirementContext.Provider>
  );
}
