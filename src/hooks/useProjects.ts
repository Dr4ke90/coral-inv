import { getAllProjects } from "@/features/project/api/getAllProjects";
import { Project } from "@/features/project/types/project.type";
import { useQuery } from "@tanstack/react-query";

export const useProjects = () => {
  const { data, isLoading, isError } = useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: getAllProjects,
    refetchOnWindowFocus: false,
    retry: 1,
    staleTime: 1000 * 60 * 5,
  });

  return { data, isLoading, isError };
};
