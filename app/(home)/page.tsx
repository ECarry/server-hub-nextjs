import CategorySlider from "./_components/category-slider";
import ProductGallery from "./_components/proudct-gallery";
import SwiperBanner from "./_components/swiper-banner";

export default function Home() {
  return (
    <main className="container px-4 py-8 space-y-12">
      <SwiperBanner />

      <CategorySlider />

      <ProductGallery />
    </main>
  )
}
