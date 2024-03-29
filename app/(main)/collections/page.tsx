import { currentUser } from "@/lib/auth";
import { getCollectionsByUserId } from "@/data/collection";
import type { Metadata } from "next";

import EmpyCollection from "../_components/empy-collection";
import { CollectionTable } from "@/components/collection-table";

export const metadata: Metadata = {
  title: "Collections",
};

const CollectionsPage = async () => {
  const user = await currentUser();

  if (!user) {
    return null;
  }
  const collections = await getCollectionsByUserId(user?.id);

  if (!collections) {
    return null;
  }

  return (
    <div className="flex flex-col gap-y-5 px-3 md:px-6 lg:px-8 xl:px-20  pb-6 pt-8">
      <h1 className="text-heading-large">Collections</h1>
      {/* TODO: Collection not empy username div & search div  */}
      {collections.length > 0 ? (
        <CollectionTable collections={collections} />
      ) : (
        <div className="flex grow items-center justify-center py-20">
          <EmpyCollection />
        </div>
      )}
    </div>
  );
};

export default CollectionsPage;
