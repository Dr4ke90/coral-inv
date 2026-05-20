import { fetchUsers } from "@/api/users/fetchAllUsers";
import { User } from "@/types/user.type";
import { useQuery } from "@tanstack/react-query";

export const useUsers = () => {
  const { data, isLoading, isError } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: fetchUsers,
    refetchOnWindowFocus: false,
    retry: 1,
    staleTime: 1000 * 60 * 5,
  });

  return { data, isLoading, isError };
};
