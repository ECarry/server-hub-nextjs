"use client";

import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { newVerification } from "@/actions/new-verification";

import CardWrapper from "./card-wrapper";
import FormError from "./form-error";
import FormSuccess from "./form-success";
import { Loader2 } from "lucide-react";

const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const onSumbit = useCallback(() => {
    if (success || error) return;

    if (!token) {
      setError("Missing token!");
      return;
    }

    newVerification(token)
      .then((data) => {
        setError(data.error);
        setSuccess(data.success);
      })
      .catch(() => {
        setError("Something went wrong!");
      });
  }, [token, error, success]);

  useEffect(() => {
    onSumbit();
  }, [onSumbit]);

  return (
    <CardWrapper
      headerLabel="Confirming your verification"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <div className="flex items-center justify-center w-full">
        {!error && !success && (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        )}

        {!success && <FormError message={error} />}

        <FormSuccess message={success} />
      </div>
    </CardWrapper>
  );
};

export default NewVerificationForm;
