import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import IBM from "/public/images/IBM.svg";
import HP from "/public/images/HP.png";
import DELL from "/public/images/DELL.png";
import CISCO from "/public/images/CISCO.png";

const Hero = () => {
  return (
    <div className="h-[620px] w-full overflow-hidden border-b-2 border-divider-primary text-center md:min-h-[580px] xl:min-h-[716px] relative">
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
            NEW DROPS WEEKLY
          </Badge>
          <h1 className="px-3 text-heading-xl md:text-[54px] xl:text-[72px] md:px-0 max-w-[660px]">
            The world&apos;s largest mobile and web design library
          </h1>
          <p className="max-w-[600px] px-1 text-lg font-normal md:px-0">
            <span>
              Save hours of UI &amp; UX research with our library of 300,000+
              screens from the world&apos;s best designed apps.
            </span>
          </p>

          <div className="md:pt-4">
            <Button variant="default" size="lg">
              <Link href="/">Create free account</Link>
            </Button>
          </div>

          <div className="flex flex-col items-center gap-4 mt-4 text-muted-foreground/80">
            <div className="text-sm font-normal tracking-[-0.024em]">
              Trusted by design-forward companies
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
