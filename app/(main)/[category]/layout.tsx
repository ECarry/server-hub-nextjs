import CategoriesList from "../_components/categories-list";
import Hero from "../_components/hero";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <Hero />

      <div className="z-0 flex flex-col gap-y-5 px-container-x-padding pt-[32px]">
        <h1 className="text-heading-medium md:text-heading-large">Discover</h1>
        <CategoriesList />
        {children}
      </div>
    </main>
  );
}
