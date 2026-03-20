"use client";
import Dashboard from "@/app/(dashboard)/page";
import UserOnly from "@/components/auth/UsersOnly";

export default function Home() {
  return (
    <UserOnly>
      <Dashboard />
    </UserOnly>
  );
}
