"use client";

import { useModal } from "@/hooks/use-modal-store";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { CreateManufacturerSchema } from "@/schemas";
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
import { Textarea } from "../ui/textarea";
import ImageUpload from "../image-upload";
import { toast } from "../ui/use-toast";
import { CreateManufacturer } from "@/actions/product";

export function CreateManufacturerModal() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();

  const { isOpen, onClose, type } = useModal();

  const isModalOpen = isOpen && type === "createManufacturer";

  const form = useForm<z.infer<typeof CreateManufacturerSchema>>({
    resolver: zodResolver(CreateManufacturerSchema),
    defaultValues: {
      name: "",
      description: "",
      imageUrl: "",
    },
  });

  const handleClose = () => {
    form.reset();
    onClose();
  };

  const onSubmit = (values: z.infer<typeof CreateManufacturerSchema>) => {
    setError("");

    startTransition(() => {
      CreateManufacturer(values).then((data) => {
        if (data.error) {
          setError(data.error);
        }

        if (data.success) {
          toast({
            title: "New manufacturer created:",
            description: (
              <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                <code className="text-white">
                  {JSON.stringify(values, null, 2)}
                </code>
              </pre>
            ),
          });
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
            Create new Manufacturer
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

              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Logo (optional)</FormLabel>
                    <FormControl>
                      <ImageUpload
                        value={field.value || ""}
                        onChange={field.onChange}
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
