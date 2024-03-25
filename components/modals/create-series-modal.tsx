"use client";

import { useModal } from "@/hooks/use-modal-store";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { CreateCollectionSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { createCollection } from "@/actions/collection";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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

export default function CreateSeriesModal() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();

  const { isOpen, onClose, type } = useModal();

  const isModalOpen = isOpen && type === "createCollection";

  const form = useForm<z.infer<typeof CreateCollectionSchema>>({
    resolver: zodResolver(CreateCollectionSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const handleClose = () => {
    form.reset();
    onClose();
  };

  const onSubmit = (values: z.infer<typeof CreateCollectionSchema>) => {
    setError("");

    startTransition(() => {
      createCollection(values).then((data) => {
        if (data?.error) {
          setError(data?.error);
        } else {
          form.reset();
          onClose();
        }
      });
    });
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[560px]">
        <DialogHeader>
          <DialogTitle className=" text-center text-xl truncate font-semibold">
            Create new collection
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
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

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter description"
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
