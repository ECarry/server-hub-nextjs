"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "../lib/auth-client";
import { toast } from "sonner";
import { useState } from "react";
import {
  IconBrandGoogleFilled,
  IconBrandGithubFilled,
} from "@tabler/icons-react";

const Social = () => {
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [loadingGithub, setLoadingGithub] = useState(false);

  return (
    <>
      <div className="w-full space-y-4 flex-col">
        <Button
          className="w-full space-x-2 rounded-2xl"
          variant="outline"
          size={"lg"}
          disabled={loadingGoogle || loadingGithub}
          onClick={async () => {
            await signIn.social({
              provider: "google",
              callbackURL: "/",
              fetchOptions: {
                onResponse: () => {
                  setLoadingGoogle(false);
                },
                onRequest: () => {
                  setLoadingGoogle(true);
                },
                onError: (ctx) => {
                  console.log(ctx);
                  toast.error(ctx.error.message);
                },
              },
            });
          }}
        >
          <IconBrandGoogleFilled className="size-5" />
          <span>Continue with Google</span>
        </Button>

        <Button
          className="w-full space-x-2 rounded-2xl"
          variant="outline"
          size={"lg"}
          disabled={loadingGoogle || loadingGithub}
          onClick={async () => {
            await signIn.social({
              provider: "github",
              callbackURL: "/",
              fetchOptions: {
                onResponse: () => {
                  setLoadingGithub(false);
                },
                onRequest: () => {
                  setLoadingGithub(true);
                },
                onError: (ctx) => {
                  toast.error(ctx.error.message);
                },
              },
            });
          }}
        >
          <IconBrandGithubFilled className="size-5" />
          <span>Continue with Github</span>
        </Button>
      </div>
      <div className="relative flex h-20 items-center justify-center">
        <hr className="h-[2px] grow border-divider-primary" />
        <h3 className="w-11 shrink-0 text-center text-body-small-bold text-fg-secondary">
          or
        </h3>
        <hr className="h-[2px] grow border-divider-primary" />
      </div>
    </>
  );
};

export default Social;
