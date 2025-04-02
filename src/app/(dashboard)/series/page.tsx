import { SeriesView } from "@/modules/series/ui/views/series-view";
import { HydrateClient, trpc } from "@/trpc/server";

export const dynamic = "force-dynamic";

const page = async () => {
  void trpc.series.getMany.prefetch();
  void trpc.brands.getMany.prefetch();

  return (
    <HydrateClient>
      <SeriesView />
    </HydrateClient>
  );
};

export default page;
