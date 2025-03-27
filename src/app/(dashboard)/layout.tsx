import { DashboardLayout } from "@/modules/dashboard/ui/layouts/dashboard-layout";

const layout = ({ children }: { children: React.ReactNode }) => {
  return <DashboardLayout>{children}</DashboardLayout>;
};

export default layout;
