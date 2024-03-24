"use client";

import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { LoginWithCodeEmailSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginWithOTP, loginWithOTPEmail } from "@/actions/login";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FormError from "@/components/auth/form-error";
import FormSuccess from "@/components/auth/form-success";
import CardWrapper from "./card-wrapper";
import { Loader2 } from "lucide-react";

const LoginWithOTPForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with different provider!"
      : "";

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isCodeSent, setIsCodeSent] = useState(false);

  const form = useForm<z.infer<typeof LoginWithCodeEmailSchema>>({
    resolver: zodResolver(LoginWithCodeEmailSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginWithCodeEmailSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      loginWithOTPEmail(values).then((data) => {
        if (data.success) {
          setIsCodeSent(true);
        }
      });
    });
  };

  const onPinComplete = (value: string) => {
    setError("");

    const values = {
      email: form.getValues("email"),
      code: parseInt(value),
    };

    startTransition(() => {
      loginWithOTP(values, callbackUrl).then((data) => {
        if (data.error) {
          setError(data.error);
        }
      });
    });
  };

  return (
    <CardWrapper
      headerLabel="Welcome back"
      backButtonLabel=""
      backButtonHref=""
      showSocial={!isCodeSent}
    >
      {isCodeSent ? (
        <div className="flex flex-col gap-8 items-center">
          <p className="text-center text-sm">
            We sent a temporary login code to {form.getValues("email")}.
            <br />
            <span
              className="underline underline-offset-2 cursor-pointer"
              onClick={() => {
                setError("");
                setIsCodeSent(false);
              }}
            >
              Not you?
            </span>
          </p>
          <InputOTP maxLength={6} onComplete={(value) => onPinComplete(value)}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <FormError message={error} />
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="Enter email address"
                        disabled={isPending}
                        className="rounded-2xl h-12 bg-primary-foreground"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormError message={error || urlError} />
            <FormSuccess message={success} />

            <Button
              type="submit"
              disabled={isPending}
              size={"lg"}
              className="w-full rounded-2xl"
            >
              {isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <span>Continue</span>
              )}
            </Button>
          </form>
        </Form>
      )}

      <p className="text-center text-xs text-fg-secondary mt-4">
        By continuing, you agree to Server Hub Terms of Service and Privacy
        Policy.
      </p>
    </CardWrapper>
  );
};

export default LoginWithOTPForm;
