import { currentUser } from "@/lib/auth";
import CategoriesList from "../_components/categories-list";
import Hero from "../_components/hero";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();

  return (
    <main>
      {!user && <Hero />}

      <div className="z-0 flex flex-col gap-y-5 px-container-x-padding pt-[32px]">
        <h1 className="text-heading-medium md:text-heading-large">Discover</h1>
        <CategoriesList />
        {children}
      </div>
    </main>
  );
}
