interface CollectionIdPageProps {
  params: {
    collectionId: string;
  };
}

const CollectionIdPage = ({ params }: CollectionIdPageProps) => {
  return <div>{params.collectionId}</div>;
};

export default CollectionIdPage;
