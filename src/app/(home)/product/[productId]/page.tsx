import { ProductView } from "@/modules/product/views/product-view";
import { HydrateClient, trpc } from "@/trpc/server";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{
    productId: string;
  }>;
}

const page = async ({ params }: Props) => {
  const { productId } = await params;
  void trpc.product.getOne.prefetch({
    id: productId,
  });

  return (
    <HydrateClient>
      <ProductView productId={productId} />
    </HydrateClient>
  );
};

export default page;
