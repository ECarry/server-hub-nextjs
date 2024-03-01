import { getCollectionById } from "@/data/collection";
import CollectionAction from "../../_components/cllection-actions";

interface CollectionIdPageProps {
  params: {
    collectionId: string;
  };
}

const CollectionIdPage = async ({ params }: CollectionIdPageProps) => {
  const collection = await getCollectionById(params.collectionId);

  if (!collection) {
    return <div>Collection not found!</div>;
  }

  return (
    <div className="z-0 flex flex-col gap-y-5 px-3 md:px-6 lg:px-8 xl:px-20  pb-6 pt-8">
      <div className="flex items-center gap-4">
        <h1 className="line-clamp-3 text-ellipsis break-words text-heading-large">
          {collection.name}
        </h1>
        <CollectionAction collection={collection} />
      </div>
    </div>
  );
};

export default CollectionIdPage;
