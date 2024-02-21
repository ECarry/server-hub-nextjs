import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

const images = [
  { id: 1, url: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/1.png" },
  { id: 2, url: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/2.png" },
  { id: 3, url: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/3.png" },
  { id: 4, url: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/4.png" },
  { id: 5, url: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/5.png" },
  { id: 6, url: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/6.png" },
  { id: 7, url: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/7.png" },
];

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full grid grid-cols-1 md:grid-cols-2 overflow-hidden">
      <div className="flex items-start justify-center md:items-center">
        {children}
      </div>

      <div className="hidden md:block md:space-y-4 max-h-screen overflow-hidden">
        <div className="flex flex-col -rotate-45 select-none">
          <InfiniteMovingCards
            items={images}
            direction="right"
            speed="slow"
            pauseOnHover={false}
            //className="-rotate-45"
          />

          <InfiniteMovingCards
            items={images}
            direction="left"
            speed="normal"
            pauseOnHover={false}
            //className="-rotate-45"
          />

          <InfiniteMovingCards
            items={images}
            direction="right"
            speed="slow"
            pauseOnHover={false}
            //className="-rotate-45"
          />

          <InfiniteMovingCards
            items={images}
            direction="left"
            speed="normal"
            pauseOnHover={false}
            //className="-rotate-45"
          />

          <InfiniteMovingCards
            items={images}
            direction="right"
            speed="slow"
            pauseOnHover={false}
            //className="-rotate-45"
          />
        </div>
      </div>
    </div>
  );
}
