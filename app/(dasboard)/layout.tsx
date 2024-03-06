import { auth } from "@/auth";
import RoleGate from "@/components/auth/role-gate";
import { redirect } from "next/navigation";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  if (!session) {
    redirect("/auth/login");
  }

  return <RoleGate allowedRole="ADMIN">{children}</RoleGate>;
};

export default DashboardLayout;
