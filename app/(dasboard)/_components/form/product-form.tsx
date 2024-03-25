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

const ImgSchema = z.object({
  fileName: z.string(),
  name: z.string(),
  fileSize: z.number(),
  size: z.number(),
  fileKey: z.string(),
  key: z.string(),
  fileUrl: z.string(),
  url: z.string(),
});

const productFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Name must not be longer than 30 characters.",
    }),
  slug: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Name must not be longer than 30 characters.",
    }),
  manufacturer: z.string({
    required_error: "Please select a manufacturer.",
  }),
  infrastructure: z.string({
    required_error: "Please select a infrastructure.",
  }),
  series: z.string({
    required_error: "Please select a series.",
  }),
  description: z.optional(z.string()),
  images: z
    .array(ImgSchema)
    .max(20, { message: "You can only add up to 20 images" })
    .min(1, { message: "At least one image must be added." }),
});

type ProfileFormValues = z.infer<typeof productFormSchema>;

export function ProductForm() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: "",
      slug: "",
      images: [],
    },
  });

  const handleGenerateSlug = () => {
    const name = form.getValues("name");
    form.setValue("slug", name.slice(0, 30).replace(/\s/g, "-").toLowerCase());
  };

  const onSubmit = (data: ProfileFormValues) => {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
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
                      <FormLabel>Product slug</FormLabel>
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
                  name="manufacturer"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Manufacturer</FormLabel>
                      <div className="flex gap-2">
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a manufacturer" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="m@example.com">
                              m@example.com
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <Button
                          type="button"
                          variant={"outline"}
                          className="flex gap-2"
                          disabled
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
                  name="infrastructure"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Infrastructure</FormLabel>
                      <div className="flex gap-2">
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a infrastructure" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="m@example.com">
                              m@example.com
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <Button
                          type="button"
                          variant={"outline"}
                          className="flex gap-2"
                          disabled
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
                  name="series"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Series</FormLabel>
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
                            <SelectItem value="m@example.com">
                              m@example.com
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <Button
                          type="button"
                          variant={"outline"}
                          className="flex gap-2"
                          disabled
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
                <FormField
                  control={form.control}
                  name="images"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Images</FormLabel>
                      <FormControl>
                        <FileUpload
                          onChange={field.onChange}
                          value={field.value}
                          onRemove={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <Button type="submit" className="col-span-4 md:col-span-2">
            Save changes
          </Button>
        </form>
      </Form>
    </>
  );
}
