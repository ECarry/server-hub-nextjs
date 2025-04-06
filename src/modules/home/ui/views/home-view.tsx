import { Hero } from "@/modules/home/ui/components/hero";
import { ProductsSection } from "../sections/products-section";

export const HomeView = async () => {
  return (
    <div className="flex flex-col space-y-6">
      <Hero />
      <div className="">
        <h1 className="text-5xl font-semibold">Discover</h1>
      </div>
      <ProductsSection />
    </div>
  );
};
