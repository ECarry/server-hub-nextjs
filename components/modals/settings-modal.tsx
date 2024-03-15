"use client";

import { useModal } from "@/hooks/use-modal-store";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { ProfileSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import Image from "next/image";
import { editProfile } from "@/actions/user";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useSession } from "next-auth/react";

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
import FormSuccess from "../auth/form-success";
import Avatar from "/public/images/avatar.jpg";

export function SettingsModal() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const user = useCurrentUser();
  const { update } = useSession();

  const AvatarImage = user?.image ? user.image : Avatar;

  const { isOpen, onClose, type } = useModal();
  const isModalOpen = isOpen && type === "settings";

  const form = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      name: user?.name || undefined,
      email: user?.email || undefined,
      password: undefined,
      newPassword: undefined,
    },
  });

  const {
    formState: { isDirty },
  } = form;

  const onSubmit = (values: z.infer<typeof ProfileSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      editProfile(values).then((data) => {
        update();
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };

  const handleClose = () => {
    onClose();
    form.reset();
    setError("");
    setSuccess("");
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="h-full max-h-[95%] min-w-[97%] bg-primary-foreground">
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
                        src={AvatarImage}
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
                              disabled={isPending || user?.isOAuth}
                              className="rounded-2xl bg-primary-foreground"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="password"
                              placeholder="* * * * * * * *"
                              disabled={isPending || user?.isOAuth}
                              className="rounded-2xl bg-primary-foreground"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="newPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>New password</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="password"
                              placeholder="* * * * * * * *"
                              disabled={isPending || user?.isOAuth}
                              className="rounded-2xl bg-primary-foreground"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <Button
                      size={"sm"}
                      type="submit"
                      disabled={!isDirty || isPending}
                    >
                      {isPending ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <span className="text-sm">Update</span>
                      )}
                    </Button>
                  </div>
                </form>
              </Form>

              <section className="flex flex-col gap-y-4 py-8">
                <header className="flex flex-col gap-y-2">
                  <h2 className="text-body-large-bold">Delete account</h2>
                  <p className="text-body-medium text-fg-secondary">
                    Permanently delete your account and all of your content.
                  </p>
                </header>
              </section>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
