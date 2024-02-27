import React from "react";
import { TagsList } from "../../_components/tags-list";
import CardsList from "@/components/cards-list";

const page = ({
  params,
}: {
  params: {
    category: string;
    manufacturer: string;
  };
}) => {
  const { category, manufacturer } = params;
  return (
    <div className="flex flex-col gap-y-6">
      <TagsList />

      <div>
        <CardsList category={category} manufacturer={manufacturer} />
      </div>

      <div></div>
    </div>
  );
};

export default page;
