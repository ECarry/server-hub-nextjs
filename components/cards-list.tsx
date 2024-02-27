import { cn } from "@/lib/utils";
import { CarouselCard } from "./carousel-card";

interface CardsListPops {
  category: string;
  manufacturer: string;
}

const GridCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className={cn(
        "grid content-start [--column-gap:12px] md:[--column-gap:24px] gap-x-[--column-gap] gap-y-8 md:gap-y-10 [--min-column-width:300px] md:[--min-column-width:324px] lg:[--min-column-width:384px] [--max-column-count:5] [--total-gap-width:calc((var(--max-column-count)-1)*var(--column-gap))] [--max-column-width:calc((100%-var(--total-gap-width))/var(--max-column-count))] grid-cols-[repeat(auto-fill,minmax(max(var(--min-column-width),var(--max-column-width)),1fr))]"
        // "max-sm:[&>*:nth-child(n+5)]:hidden max-md:[&>*:nth-child(n+7)]:hidden max-xl:[&>*:nth-child(n+9)]:hidden"
      )}
    >
      {children}
    </div>
  );
};

const CardsList = ({ category, manufacturer }: CardsListPops) => {
  return (
    <GridCard>
      {Array.from({ length: 10 }).map((_, index) => (
        <CarouselCard key={index} />
      ))}
    </GridCard>
  );
};

export default CardsList;
