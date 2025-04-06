import { HomeNavbar } from "../components/home-navbar";

export const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col isolate mx-auto max-w-[3840px]">
      <div className="flex flex-col grow">
        <div className="">
          <HomeNavbar />
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </div>
    </div>
  );
};
