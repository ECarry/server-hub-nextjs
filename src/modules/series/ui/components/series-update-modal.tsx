"use client";

import { ResponsiveModal } from "@/components/responsive-modal";
import { trpc } from "@/trpc/client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { seriesSelectSchema } from "@/db/schema";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  series: z.infer<typeof seriesSelectSchema>;
}

export const SeriesUpdateModal = ({ open, onOpenChange, series }: Props) => {
  const form = useForm<z.infer<typeof seriesSelectSchema>>({
    resolver: zodResolver(seriesSelectSchema),
    defaultValues: {
      brandId: series.brandId,
      name: series.name,
    },
  });

  const utils = trpc.useUtils();
  const update = trpc.series.update.useMutation({
    onSuccess: () => {
      onOpenChange(false);
      form.reset();
      utils.series.getMany.invalidate();
      toast.success("Series updated successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = async (data: z.infer<typeof seriesSelectSchema>) => {
    console.log(data);
    update.mutateAsync({
      ...data,
    });
  };

  return (
    <ResponsiveModal
      open={open}
      onOpenChange={onOpenChange}
      title="Update a Series"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter brand name"
                    {...field}
                    className="w-full"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="brandId"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Brand</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter brand full name"
                    {...field}
                    className="w-full"
                    value={field.value || ""}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button disabled={update.isPending} type="submit" className="w-full">
            Update
          </Button>
        </form>
      </Form>
    </ResponsiveModal>
  );
};
