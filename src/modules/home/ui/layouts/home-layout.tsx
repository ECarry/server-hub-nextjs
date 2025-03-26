import { HomeNavbar } from "../components/home-navbar";

export const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col isolate mx-auto max-w-[3840px]">
      <div className="flex flex-col grow">
        <div className="[--container-x-padding:20px] min-720:[--container-x-padding:24px] min-1280:[--container-x-padding:32px] min-1536:[--container-x-padding:80px]">
          <HomeNavbar />
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </div>
    </div>
  );
};
