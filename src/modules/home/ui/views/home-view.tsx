import { Hero } from "@/modules/home/ui/components/hero";
import { getCurrentUser } from "@/modules/auth/lib/get-current-user";

export const HomeView = async () => {
  const { user } = await getCurrentUser();

  return (
    <div>
      <Hero />
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
};
