"use client";

import { useModal } from "@/hooks/use-modal-store";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { ProfileSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
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
import { useCurrentUser } from "@/hooks/use-current-user";
import Image from "next/image";

export function SettingsModal() {
  const user = useCurrentUser();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();

  const { isOpen, onClose, type } = useModal();

  const isModalOpen = isOpen && type === "settings";

  const form = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  useEffect(() => {
    if (user?.name && user.email) {
      form.setValue("name", user.name);
      form.setValue("email", user.email);
    }
  }, [form, user]);

  const onSubmit = (values: z.infer<typeof ProfileSchema>) => {
    setError("");

    startTransition(() => {});
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="h-full min-w-full">
        <div className="flex h-full flex-col items-stretch overflow-y-auto md:items-center">
          <div className="grid grid-cols-[1fr] items-start px-4 py-6 md:w-min md:py-13 md:grid-cols-[calc(2*290px+24px)]">
            <div className="flex flex-col items-stretch divide-y-2 divide-divider-primary">
              <header className="flex flex-col items-stretch gap-y-2 pb-5">
                <h1 className="text-heading-small md:text-heading-medium">
                  Account settings
                </h1>
                <p className="text-body-medium text-gray-500">
                  Manage your profile
                </p>
              </header>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="flex flex-col gap-y-4 py-8">
                    <FormLabel>Profile photo</FormLabel>
                    <div className="flex h-[140px] w-[140px] items-center justify-center cursor-pointer select-none overflow-hidden rounded-full bg-bg-quarternary focus-visible:ring-4 focus-visible:ring-blue-200/50">
                      <Image
                        src={user?.image || " "}
                        alt="avatar"
                        width={140}
                        height={140}
                        className="object-cover w-full h-full"
                      />
                    </div>

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
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Enter email"
                              type="email"
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
                  <Button size={"sm"} type="submit" disabled>
                    {isPending ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <span className="text-sm">Update</span>
                    )}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}