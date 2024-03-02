import { currentUser } from "@/lib/auth";
import type { Metadata } from "next";

import CategoriesList from "../_components/categories-list";
import Hero from "../_components/hero";

type Props = {
  params: { category: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = params;
  return {
    title: `Discover ${category}`,
  };
}

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
