"use client";
import Dashboard from "@/app/(dashboard)/page";
import UserOnly from "@/shared/components/auth/UsersOnly";

export default function Home() {
  return (
    <UserOnly>
      <Dashboard />
    </UserOnly>
  );
}
