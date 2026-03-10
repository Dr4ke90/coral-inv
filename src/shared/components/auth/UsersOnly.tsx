"use client";

import { useUser } from "@/features/users/hooks/useUser";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loader from "../ui/Loader";

const UserOnly = ({ children }: { readonly children: React.ReactNode }) => {
  const { user, authChecked } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (authChecked && !user) {
      router.replace("/login");
    }
  }, [user, authChecked, router]);

  if (!authChecked) {
    return <Loader />;
  }

  if (!user) return null;

  return <>{children}</>;
};

export default UserOnly;
