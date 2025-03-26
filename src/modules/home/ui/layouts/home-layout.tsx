import { HomeNavbar } from "../components/home-navbar";

export const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <HomeNavbar />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
};
