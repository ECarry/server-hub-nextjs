import { trpc } from "@/trpc/server";
import { HydrateClient } from "@/trpc/server";
import { ProductsView } from "@/modules/products/ui/views/products-view";

export const dynamic = "force-dynamic";

const page = async () => {
  void trpc.products.getMany.prefetch();
  void trpc.productCategories.getMany.prefetch();
  void trpc.brands.getMany.prefetch();
  void trpc.series.getMany.prefetch();

  return (
    <HydrateClient>
      <ProductsView />
    </HydrateClient>
  );
};

export default page;
