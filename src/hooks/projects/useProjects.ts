import { getAllProjects } from "@/api/projects/getAllProjects";
import { ProjectType } from "@/types/project.type";
import { useQuery } from "@tanstack/react-query";

export const useProjects = () => {
  const { data, isLoading, isError } = useQuery<ProjectType[]>({
    queryKey: ["projects"],
    queryFn: getAllProjects,
    refetchOnWindowFocus: false,
    retry: 1,
    staleTime: 1000 * 60 * 5,
  });

  return { data, isLoading, isError };
};
