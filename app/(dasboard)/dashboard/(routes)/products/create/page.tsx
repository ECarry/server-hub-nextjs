import { ProductForm } from "@/app/(dasboard)/_components/form/product-form";
import { Separator } from "@/components/ui/separator";

const page = () => {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-muted-foreground">Manage your products</p>
      </div>
      <Separator />
      <ProductForm />
    </div>
  );
};

export default page;
