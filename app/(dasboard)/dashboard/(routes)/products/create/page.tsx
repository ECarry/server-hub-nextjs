import { Metadata } from "next";

import ProductForm from "@/app/(dasboard)/_components/form/product-form";
import { Separator } from "@/components/ui/separator";
import { Slash } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  getInfrastructures,
  getManufacturers,
  getSeries,
} from "@/data/product";

export const metadata: Metadata = {
  title: "Create Product",
};

const page = async () => {
  const manufacturers = await getManufacturers();
  const infrastructures = await getInfrastructures();
  const series = await getSeries();

  return (
    <div className="space-y-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <Slash />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard/products">Proudcts</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <Slash />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage>Create Product</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <ProductForm
        manufacturers={manufacturers}
        infrastructures={infrastructures}
        series={series}
      />
    </div>
  );
};

export default page;
