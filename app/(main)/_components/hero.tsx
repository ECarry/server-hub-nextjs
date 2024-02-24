import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import IBM from "/public/images/IBM.svg";
import HP from "/public/images/HP.png";
import DELL from "/public/images/DELL.png";
import CISCO from "/public/images/CISCO.png";
import { Spotlight } from "@/components/ui/spotlight";

const Hero = () => {
  return (
    <div className="h-[620px] w-full overflow-hidden border-b-2 border-divider-primary text-center md:min-h-[580px] xl:min-h-[716px] relative">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20 lg:left-100 lg:top-0 xl:left-[500px] 2xl:left-[800px]"
        fill="white"
      />
      <div className="flex h-full w-full flex-col items-center justify-between pb-6 pt-10 md:absolute md:pt-[60px]">
        <div className="absolute -bottom-10 -z-10 hidden w-full min-w-[1440px] flex-row justify-between md:flex md:px-24 lg:px-8 xl:px-20">
          {/* LEFT ICONS */}
          <div className="grid aspect-square grid-cols-3 gap-5">
            <div className="relative col-span-3 w-fit overflow-hidden rounded-[40px] after:absolute after:inset-0 after:rounded-40 after:shadow-logo-inset ">
              <Image src={IBM} width={140} alt="logo" />
            </div>

            <div className="relative col-span-2 col-start-2 w-fit overflow-hidden rounded-[40px] after:absolute after:inset-0 after:rounded-40 after:shadow-logo-inset ">
              <Image src={HP} width={140} alt="logo" />
            </div>

            <div className="relative col-span-2 w-fit overflow-hidden rounded-[40px] after:absolute after:inset-0 after:rounded-40 after:shadow-logo-inset ">
              <Image src={DELL} width={140} alt="logo" />
            </div>

            <div className="relative w-fit overflow-hidden rounded-[40px] after:absolute after:inset-0 after:rounded-40 after:shadow-logo-inset ">
              <Image src={CISCO} width={140} alt="logo" />
            </div>
          </div>
          {/* RIGHT ICONS */}
          <div className="grid aspect-square grid-cols-3 gap-5">
            <div className="relative col-start-3 w-fit overflow-hidden rounded-[40px] after:absolute after:inset-0 after:rounded-[40px]">
              <Image src={HP} width={140} alt="logo" />
            </div>

            <div className="relative col-span-2 col-start-2 w-fit overflow-hidden rounded-[40px] after:absolute after:inset-0 after:rounded-[40px]">
              <Image src={DELL} width={140} alt="logo" />
            </div>

            <div className="relative col-span-2 w-fit overflow-hidden rounded-[40px] after:absolute after:inset-0 after:rounded-[40px]">
              <Image src={IBM} width={140} alt="logo" />
            </div>

            <div className="relative w-fit overflow-hidden rounded-[40px] after:absolute after:inset-0 after:rounded-[40px]">
              <Image src={HP} width={140} alt="logo" />
            </div>
          </div>
        </div>

        <div className="flex max-w-[355px] flex-col text-balance items-center justify-center gap-4 md:max-w-fit md:gap-4 md:px-4 mt-8">
          <Badge className="bg-[#aae1ff] text-xs text-[#0075c4] font-medium py-1">
            COMMING SONG...
          </Badge>
          <h1 className="px-3 text-heading-xl md:px-0 max-w-[660px]">
            Connecting Digital Realms: Your Ultimate Tech Hub.
          </h1>
          <p className="max-w-[600px] px-4 text-gray-500 md:text-xl font-normal md:px-0">
            <span>
              Curated Insights into Server, Storage, and Network Devices –
              Effortlessly Navigate the Tech Landscape.
            </span>
          </p>

          <div className="md:pt-4">
            <Button variant="default" size="lg">
              <Link href="/auth/register">Create free account</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
