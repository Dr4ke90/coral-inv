"use client";
import { useUser } from "@/features/users/hooks/useUser";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loader from "../ui/Loader";

const GuestOnly = ({ children }: { readonly children: React.ReactNode }) => {
  const { user, authChecked } = useUser();

  const router = useRouter();

  useEffect(() => {
    if (authChecked && user !== null) {
      router.replace("/");
    }
  }, [user, authChecked]);

  if (!authChecked || user) {
    return <Loader />;
  }

  return <>{children}</>;
};

export default GuestOnly;
