"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { Badge } from "@/components/ui/badge";
import IBM from "/public/images/IBM.svg";
import HP from "/public/images/HP.png";
import DELL from "/public/images/DELL.png";
import CISCO from "/public/images/CISCO.png";
import { Spotlight } from "@/components/ui/spotlight";
import ShimmerButton from "@/components/shimmer-button";

const Hero = () => {
  return (
    <div className="w-full overflow-hidden border-b-2 border-divider-primary text-center min-h-[580px] xl:min-h-[716px] relative">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20 lg:left-100 lg:-top-10 xl:left-[300px] xl:-top-40 2xl:left-[350px] 2xl:-top-80"
        fill="white"
      />
      <div className="flex h-full w-full flex-col items-center justify-between pb-6 pt-10 md:absolute md:pt-[60px]">
        <motion.div
          initial={{ opacity: 0.0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute -bottom-10 -z-10 hidden w-full min-w-[1440px] flex-row justify-between md:flex md:px-24 lg:px-8 xl:px-20"
        >
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
        </motion.div>

        <motion.div
          initial={{ opacity: 0.0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.2,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="flex max-w-[355px] flex-col text-balance items-center justify-center gap-4 md:max-w-fit md:gap-4 md:px-4 mt-8"
        >
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
            <Link href={"/auth/register"}>
              <ShimmerButton label="Create free account" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
