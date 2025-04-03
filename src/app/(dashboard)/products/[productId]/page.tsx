import { HydrateClient, trpc } from "@/trpc/server";
import { ProductView } from "@/modules/products/ui/views/product-view";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{
    productId: string;
  }>;
}

const page = async ({ params }: Props) => {
  void trpc.products.getOne.prefetch({
    id: (await params).productId,
  });

  return (
    <HydrateClient>
      <ProductView productId={(await params).productId} />
    </HydrateClient>
  );
};

export default page;
