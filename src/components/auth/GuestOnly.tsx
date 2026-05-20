"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loader from "../ui/Loader";
import { useUser } from "@/contexts/AuthContext";

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
