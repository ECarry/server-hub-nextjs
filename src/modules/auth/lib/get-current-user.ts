import { auth } from "@/modules/auth/lib/auth";
import { headers } from "next/headers";

export const getCurrentUser = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return {
    user: session?.user,
    userId: session?.user?.id,
  };
};
