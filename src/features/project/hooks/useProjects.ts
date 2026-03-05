import { useQuery } from "@tanstack/react-query";
import { ProjectType } from "../types/project.type";
import { getAllProjects } from "../api/getAllProjects";


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
