import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/modules/dashboard/ui/components/dashboard-sidebar";
import { DashboardNavbar } from "@/modules/dashboard/ui/components/dashboard-navbar";

export const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <SidebarProvider>
      <div className="w-full">
        <DashboardNavbar />
        <div className="flex min-h-screen pt-[4rem]">
          <DashboardSidebar />
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
};
