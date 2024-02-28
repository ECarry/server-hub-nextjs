"use client";

import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";

const EmpyCollection = () => {
  const { onOpen } = useModal();

  return (
    <div className="flex flex-col items-center gap-y-8 pb-16">
      <h2 className="text-heading-small">No collections yet</h2>
      <p className="w-[300px] text-center text-body-medium text-gray-500">
        You haven&apos;t created any collections yet. When you do, it&apos;ll
        show up here.
      </p>
      <div className="flex w-[240px] flex-col items-stretch">
        <Button onClick={() => onOpen("CreateCollection")}>
          Create a collection
        </Button>
      </div>
    </div>
  );
};

export default EmpyCollection;
