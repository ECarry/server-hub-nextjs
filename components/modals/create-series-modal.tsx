"use client";

import { useModal } from "@/hooks/use-modal-store";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { CreateCollectionSchema, CreateSeriesSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import FormError from "../auth/form-error";
import { Loader2 } from "lucide-react";
import { CreateSeries } from "@/actions/product";
import { toast } from "../ui/use-toast";

export default function CreateSeriesModal() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();

  const { isOpen, onClose, type, data } = useModal();

  const { infrastructures } = data;

  const isModalOpen = isOpen && type === "createSeries";

  const form = useForm<z.infer<typeof CreateSeriesSchema>>({
    resolver: zodResolver(CreateSeriesSchema),
    defaultValues: {
      name: "",
    },
  });

  const handleClose = () => {
    form.reset();
    onClose();
  };

  const onSubmit = (values: z.infer<typeof CreateSeriesSchema>) => {
    setError("");

    startTransition(() => {
      CreateSeries(values).then((data) => {
        if (data.error) {
          setError(data.error);
        }

        if (data.success) {
          toast({
            title: "New series created:",
            description: (
              <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                <code className="text-white">
                  {JSON.stringify(values, null, 2)}
                </code>
              </pre>
            ),
          });
          handleClose();
        }
      });
    });
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[560px]">
        <DialogHeader>
          <DialogTitle className=" text-center text-xl truncate font-semibold">
            Create new Series
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
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
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a infrastructure" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {infrastructures?.map((infrastructure) => (
                            <SelectItem
                              value={infrastructure.id}
                              key={infrastructure.id}
                            >
                              {infrastructure.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Name
                      <span className="text-destructive"> *</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter name"
                        disabled={isPending}
                        className="rounded-2xl bg-primary-foreground"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormError message={error} />

            <DialogFooter className="flex justify-between w-full mt-4">
              <Button variant="outline" className="w-full" disabled={isPending}>
                Cancel
              </Button>
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <span>Create</span>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
