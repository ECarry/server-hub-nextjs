import { ProductSection } from "../sections/product-section";

interface Props {
  productId: string;
}

export const ProductView = ({ productId }: Props) => {
  return (
    <div className="px-5 sm:px-6 md:px-8 lg:px-12 xl:px-20 space-y-6 py-8">
      <ProductSection productId={productId} />
    </div>
  );
};
