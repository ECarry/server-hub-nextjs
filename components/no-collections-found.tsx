"use client";

import { Button } from "@/components/ui/button";

interface NoCollectionsFoundProps {
  onClick: () => void;
}

const NoCollectionsFound = ({ onClick }: NoCollectionsFoundProps) => {
  return (
    <div className="flex flex-col items-center gap-y-8 pb-16">
      <h2 className="text-heading-small">No collections found</h2>
      <p className="w-[300px] text-center text-body-medium text-gray-500">
        We couldn&apos;t find any collections matching your query. Try another
        query.
      </p>
      <div className="flex w-[240px] flex-col items-stretch">
        <Button onClick={() => onClick()}>Start a new search</Button>
      </div>
    </div>
  );
};

export default NoCollectionsFound;
