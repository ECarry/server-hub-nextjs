import { getProductBySlug } from "@/data/product";

interface ProudctEditPageProps {
  params: {
    slug: string;
  };
}
const ProudctEditPage = async ({ params }: ProudctEditPageProps) => {
  const { slug } = params;

  const product = await getProductBySlug(slug);

  console.log(product);

  return <div>Product: {params.slug}</div>;
};

export default ProudctEditPage;
