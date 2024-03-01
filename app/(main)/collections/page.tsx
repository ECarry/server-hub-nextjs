import React from "react";
import { currentUser } from "@/lib/auth";
import { getCollectionsByUserId } from "@/data/collection";

import EmpyCollection from "../_components/empy-collection";
import { CollectionTable } from "@/components/collection-table";
import { Button } from "@/components/ui/button";

const CollectionsPage = async () => {
  const user = await currentUser();

  if (!user) {
    return null;
  }
  const collections = await getCollectionsByUserId(user?.id);

  return (
    <div className="flex flex-col gap-y-5 px-3 md:px-6 lg:px-8 xl:px-20  pb-6 pt-8">
      <h1 className="text-heading-large">Collections</h1>
      {/* TODO: Collection not empy username div & search div  */}
      {collections ? (
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
