import UserOnly from "@/shared/components/auth/UsersOnly";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <UserOnly>{children}</UserOnly>;
}
