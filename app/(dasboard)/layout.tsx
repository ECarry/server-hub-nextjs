import { auth } from "@/auth";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();

  if (session?.user.role !== "ADMIN") {
    return <h1>401</h1>;
  }
  return <div>{children}</div>;
};

export default DashboardLayout;
