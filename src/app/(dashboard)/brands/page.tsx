import { HydrateClient, trpc } from "@/trpc/server";
import { BrandsView } from "@/modules/brands/ui/views/brands-view";

export const dynamic = "force-dynamic";

const page = async () => {
  void trpc.brands.getMany.prefetch();

  return (
    <HydrateClient>
      <BrandsView />
    </HydrateClient>
  );
};

export default page;
