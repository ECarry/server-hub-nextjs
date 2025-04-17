import { HydrateClient } from "@/trpc/server";
import { PostsView } from "@/modules/posts/ui/views/posts-view";

export const dynamic = "force-dynamic";

const page = async () => {
  return (
    <HydrateClient>
      <PostsView />
    </HydrateClient>
  );
};

export default page;
