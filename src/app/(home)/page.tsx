import { HydrateClient, trpc } from "@/trpc/server";
import { HomeView } from "@/modules/home/ui/views/home-view";

export const dynamic = "force-dynamic";

interface Props {
  searchParams: Promise<{ brandId?: string }>;
}

const page = async ({ searchParams }: Props) => {
  const { brandId } = await searchParams;

  void trpc.brands.getMany.prefetch();
  void trpc.home.getManyProducts.prefetchInfinite({
    limit: 10,
  });

  return (
    <HydrateClient>
      <HomeView brandId={brandId} />
    </HydrateClient>
  );
};

export default page;
