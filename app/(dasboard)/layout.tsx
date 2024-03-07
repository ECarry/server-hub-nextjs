import { auth } from "@/auth";
import RoleGate from "@/components/auth/role-gate";
import { redirect } from "next/navigation";

import Navbar from "./_components/navbar";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  if (!session) {
    redirect("/auth/login");
  }

  return (
    <RoleGate allowedRole="ADMIN">
      <Navbar />
      {children}
    </RoleGate>
  );
};

export default DashboardLayout;
