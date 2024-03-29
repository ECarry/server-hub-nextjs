import { Metadata } from "next";
import { getAllProucts } from "@/data/product";

import DataTable from "@/app/(dasboard)/_components/table/data-table";
import { Heading } from "@/components/ui/heading";
import { columns } from "./columns";

export const metadata: Metadata = {
  title: "Products",
};

const ProductsPage = async () => {
  const products = await getAllProucts();

  return (
    <div className="space-y-4">
      <Heading title={"Products"} description={"Manage products"} />
      <DataTable
        data={products || []}
        columns={columns}
        searchPlaceholder="name"
        showCreateButton
      />
    </div>
  );
};

export default ProductsPage;
