import { HydrateClient, trpc } from "@/trpc/server";
import { HomeView } from "@/modules/home/ui/views/home-view";

export const dynamic = "force-dynamic";

const page = async () => {
  void trpc.brands.getMany.prefetch();

  return (
    <HydrateClient>
      <HomeView />
    </HydrateClient>
  );
};

export default page;
