import { auth } from "@/auth";
import RoleGate from "@/components/auth/role-gate";
import { redirect } from "next/navigation";
import { Metadata } from "next";

import Navbar from "../_components/navbar";

export const metadata: Metadata = {
  title: {
    template: "%s - Dashboard  - Server Hub - DATA & NEXUS",
    default: "Dashboard",
  },
  description: "DATA & NEXUS",
};

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  if (!session) {
    redirect("/auth/login");
  }

  return (
    <RoleGate allowedRole="ADMIN">
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">
          <div className="z-0 flex flex-col gap-y-5 px-container-x-padding pt-[32px]">
            {children}
          </div>
        </main>
      </div>
    </RoleGate>
  );
};

export default DashboardLayout;
