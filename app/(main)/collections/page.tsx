import { Button } from "@/components/ui/button";
import React from "react";

const CollectionsPage = () => {
  return (
    <div className="flex flex-col gap-y-5 px-container-x-padding pb-6 pt-8">
      <h1 className="text-heading-large">Collections</h1>
      <div className="flex grow items-center justify-center py-20">
        <div className="flex flex-col items-center gap-y-8 pb-16">
          <h2 className="text-heading-small">No collections yet</h2>
          <p className="w-[300px] text-center text-body-medium text-gray-500">
            You haven&apos;t created any collections yet. When you do,
            it&apos;ll show up here.
          </p>
          <div className="flex w-[240px] flex-col items-stretch">
            <Button>Create a collection</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionsPage;
