import { Hero } from "@/modules/home/ui/components/hero";
import { ProductsSection } from "../sections/products-section";

export const HomeView = async () => {
  return (
    <div className="flex flex-col space-y-6">
      <Hero />
      <div className="px-5 sm:px-6 md:px-8 lg:px-12 xl:px-20 space-y-6 pb-8">
        <h1 className="text-[44px] font-semibold">Discover</h1>
        <ProductsSection />
      </div>
    </div>
  );
};
