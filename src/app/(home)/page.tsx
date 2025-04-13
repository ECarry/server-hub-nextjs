import { HydrateClient, trpc } from "@/trpc/server";
import { HomeView } from "@/modules/home/ui/views/home-view";

export const dynamic = "force-dynamic";

interface Props {
  searchParams: Promise<{ brandId?: string; categoryId?: string }>;
}

const page = async ({ searchParams }: Props) => {
  const { brandId, categoryId } = await searchParams;

  void trpc.productCategories.getMany.prefetch();
  void trpc.brands.getMany.prefetch();
  void trpc.home.getManyProducts.prefetchInfinite({
    brandId,
    categoryId,
    limit: 10,
  });

  return (
    <HydrateClient>
      <HomeView brandId={brandId} categoryId={categoryId} />
    </HydrateClient>
  );
};

export default page;
