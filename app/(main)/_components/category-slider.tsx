import { quicksand } from "@/app/fonts";
import { cn } from "@/lib/utils";

import Link from "next/link";

const images = [
  { id: 1, url: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/1.png" },
  { id: 2, url: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/2.png" },
  { id: 3, url: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/3.png" },
  { id: 4, url: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/4.png" },
  { id: 5, url: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/5.png" },
  { id: 6, url: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/6.png" },
  { id: 7, url: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/7.png" },
];

const CategorySlider = () => {
  return (
    <div className={cn(quicksand.className, "space-y-8 overflow-hidden")}>
      <div className="flex">
        <div className="flex gap-4 flex-col md:flex-row md:gap-8">
          <h1 className="text-3xl font-semibold">Product Categories</h1>

          <ul className="flex gap-4 items-end font-semibold">
            <li className="text-rose-500">Servers</li>
            <li>Storage</li>
            <li>Networking</li>
          </ul>
        </div>
      </div>

      <div className="flex items-center">
        <div className="relative h-20 m-auto overflow-hidden bg-white w-full">
          <div className="flex animate-[auto-scroll_20s_linear_infinite] w-[3500px]">
            {images.map((image) => (
              <Link key={image.id} href={""}>
                {/* <img src={image.url} width={250} height={100} alt='' /> */}
              </Link>
            ))}

            {images.map((image) => (
              <Link key={image.id} href={""}>
                {/* <img src={image.url} width={250} height={100} alt='' /> */}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategorySlider;
