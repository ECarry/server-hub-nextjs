import React from "react";
import { TagsList } from "../../_components/tags-list";

const page = ({
  params,
}: {
  params: {
    category: string;
  };
}) => {
  return (
    <div className="flex flex-col">
      <TagsList />
    </div>
  );
};

export default page;
