"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { Plus, RefreshCcw } from "lucide-react";
import FileUpload from "@/components/file-upload";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { useModal } from "@/hooks/use-modal-store";
import { Infrastructure, Manufacturer, Series } from "@prisma/client";
import { useEffect, useState } from "react";
import { productFormSchema } from "@/schemas";
import FormError from "@/components/auth/form-error";
import { CreateProudct } from "@/actions/product";

type FormValues = z.infer<typeof productFormSchema>;

type ManufacturerWithInfrastructures = Manufacturer & {
  infrastructures: Infrastructure[];
};

interface ProductFormProps {
  manufacturers: ManufacturerWithInfrastructures[] | undefined;
  infrastructures: Infrastructure[] | undefined;
  series: Series[] | undefined;
}

const ProductForm = ({
  manufacturers,
  infrastructures,
  series,
}: ProductFormProps) => {
  const [error, setError] = useState<string | undefined>();
  const [manufacturerId, setmanufacturerId] = useState<string>("");
  const [infrastructureId, setInfrastructureId] = useState<string>("");

  const [filterInfrastructures, setFilterInfrastructures] = useState<
    Infrastructure[]
  >([]);
  const [filterSeries, setFilterSeries] = useState<Series[]>([]);

  useEffect(() => {
    if (manufacturerId) {
      const filtered = infrastructures?.filter(
        (infrastructure) => infrastructure.manufacturerId === manufacturerId
      );

      setFilterInfrastructures(filtered || []);
    }
  }, [manufacturerId, infrastructures]);

  useEffect(() => {
    if (infrastructureId) {
      const filtered = series?.filter(
        (item) => item.infrastructureId === infrastructureId
      );

      setFilterSeries(filtered || []);
    }
  }, [infrastructureId, series]);

  const { onOpen } = useModal();

  const form = useForm<FormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: "",
      slug: "",
      description: "",
      seriesId: "",
      manufacturerId: "",
      infrastructureId: "",
      status: "DRAFT",
    },
  });

  const handleGenerateSlug = () => {
    const name = form.getValues("name");
    form.setValue("slug", name.slice(0, 30).replace(/\s/g, "-").toLowerCase());
  };

  const onSubmit = (data: FormValues) => {
    setError("");
    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // });

    CreateProudct(data).then((data) => {
      if (data.error) {
        setError(data.error);
      }
      if (data.success) {
        toast({
          title: data.success,
        });
      }
    });
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={"Create product"} description={"Add a new product"} />
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-12 gap-4">
            <div className="grid grid-cols-12 gap-x-4 gap-y-6 col-span-12 md:col-span-6 border p-4 rounded-xl">
              <div className="col-span-12">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Product name{" "}
                        <span className="text-destructive"> *</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Product name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-12">
                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Product slug
                        <span className="text-destructive"> *</span>
                      </FormLabel>
                      <div className="flex gap-2">
                        <FormControl>
                          <Input placeholder="Product slug" {...field} />
                        </FormControl>

                        <Button
                          type="button"
                          variant={"outline"}
                          className="flex gap-2"
                          onClick={handleGenerateSlug}
                          disabled={form.getValues("name") === ""}
                        >
                          <RefreshCcw size={16} />
                          Generate slug
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-12">
                <FormField
                  control={form.control}
                  name="manufacturerId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Manufacturer
                        <span className="text-destructive"> *</span>
                      </FormLabel>
                      <div className="flex gap-2">
                        <Select
                          onValueChange={(value) => {
                            setmanufacturerId(value);
                            field.onChange(value);
                            setFilterInfrastructures([]);
                          }}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a manufacturer" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {manufacturers?.map((manufacturer) => (
                              <SelectItem
                                value={manufacturer.id}
                                key={manufacturer.id}
                              >
                                {manufacturer.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Button
                          type="button"
                          variant={"outline"}
                          className="flex gap-2"
                          onClick={() => onOpen("createManufacturer")}
                        >
                          <Plus size={16} />
                          New
                        </Button>
                      </div>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-12">
                <FormField
                  control={form.control}
                  name="infrastructureId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Infrastructure
                        <span className="text-destructive"> *</span>
                      </FormLabel>
                      <div className="flex gap-2">
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value);
                            setInfrastructureId(value);
                          }}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a infrastructure" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {filterInfrastructures.map((item) => (
                              <SelectItem value={item.id} key={item.id}>
                                {item.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Button
                          type="button"
                          variant={"outline"}
                          className="flex gap-2"
                          onClick={() =>
                            onOpen("createInfrastructure", { manufacturers })
                          }
                        >
                          <Plus size={16} />
                          New
                        </Button>
                      </div>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-12">
                <FormField
                  control={form.control}
                  name="seriesId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Series
                        <span className="text-destructive"> *</span>
                      </FormLabel>
                      <div className="flex gap-2">
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a series" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {filterSeries?.map((item) => (
                              <SelectItem value={item.id} key={item.id}>
                                {item.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Button
                          type="button"
                          variant={"outline"}
                          className="flex gap-2"
                          onClick={() =>
                            onOpen("createSeries", { infrastructures })
                          }
                        >
                          <Plus size={16} />
                          New
                        </Button>
                      </div>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-12">
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="DRAFT">Draft</SelectItem>
                          <SelectItem value="ACTIVE">Active</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-12">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description (optional)</FormLabel>
                      <FormControl>
                        <Textarea className="resize-none" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="grid grid-cols-12 gap-x-4 gap-y-6 col-span-12 md:col-span-6 border p-4 rounded-xl">
              <div className="col-span-12">
                {/* <FormField
                  control={form.control}
                  name="images"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Images
                        <span className="text-destructive"> *</span>
                      </FormLabel>
                      <FormControl>
                        <FileUpload
                          onChange={field.onChange}
                          value={field.value || []}
                          onRemove={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}
              </div>
            </div>
          </div>

          <FormError message={error} />
          <Button type="submit" className="col-span-4 md:col-span-2">
            Save changes
          </Button>
        </form>
      </Form>
    </>
  );
};

export default ProductForm;
