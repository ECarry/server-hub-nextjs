"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { trpc } from "@/trpc/client";
import { getFileUrl } from "@/modules/filesUpload/lib/utils";

export const Hero = () => {
  const { data: brands } = trpc.brands.getMany.useQuery();

  const [iconStates, setIconStates] = useState([
    { index: 0, key: "icon-0" },
    { index: 1, key: "icon-1" },
    { index: 2, key: "icon-2" },
    { index: 3, key: "icon-3" },
    { index: 4, key: "icon-4" },
    { index: 5, key: "icon-5" },
    { index: 6, key: "icon-6" },
    { index: 7, key: "icon-7" },
  ]);

  useEffect(() => {
    if (!brands || brands.length <= 8) return;

    const interval = setInterval(() => {
      const positionToChange = Math.floor(Math.random() * 8);

      let newIndex;
      do {
        newIndex = Math.floor(Math.random() * brands.length);
      } while (newIndex === iconStates[positionToChange].index);

      setIconStates((prev) => {
        const newState = [...prev];
        newState[positionToChange] = {
          index: newIndex,
          key: `icon-${positionToChange}-${Date.now()}`,
        };
        return newState;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [brands, iconStates]);

  return (
    <div className="w-full overflow-hidden border-b-2 border-divider-primary text-center min-h-[580px] xl:min-h-[716px] relative">
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
            <div className="relative col-span-3 w-fit overflow-hidden rounded-[40px] after:absolute after:inset-0 after:rounded-40 after:shadow-logo-inset bg-muted p-2">
              <AnimatePresence mode="wait">
                <motion.img
                  key={iconStates[0].key}
                  src={getFileUrl(
                    brands?.[iconStates[0].index]?.logoImageKey || ""
                  )}
                  alt={brands?.[iconStates[0].index]?.name || ""}
                  className="size-[140px] object-contain"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                />
              </AnimatePresence>
            </div>

            <div className="relative col-span-2 col-start-2 w-fit overflow-hidden rounded-[40px] after:absolute after:inset-0 after:rounded-40 after:shadow-logo-inset bg-muted p-2 ">
              <AnimatePresence mode="wait">
                <motion.img
                  key={iconStates[1].key}
                  src={getFileUrl(
                    brands?.[iconStates[1].index]?.logoImageKey || ""
                  )}
                  alt={brands?.[iconStates[1].index]?.name || ""}
                  className="size-[140px] object-contain"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                />
              </AnimatePresence>
            </div>

            <div className="relative col-span-2 w-fit overflow-hidden rounded-[40px] after:absolute after:inset-0 after:rounded-40 after:shadow-logo-inset bg-muted p-2 ">
              <AnimatePresence mode="wait">
                <motion.img
                  key={iconStates[2].key}
                  src={getFileUrl(
                    brands?.[iconStates[2].index]?.logoImageKey || ""
                  )}
                  alt={brands?.[iconStates[2].index]?.name || ""}
                  className="size-[140px] object-contain"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                />
              </AnimatePresence>
            </div>

            <div className="relative w-fit overflow-hidden rounded-[40px] after:absolute after:inset-0 after:rounded-40 after:shadow-logo-inset bg-muted p-2">
              <AnimatePresence mode="wait">
                <motion.img
                  key={iconStates[3].key}
                  src={getFileUrl(
                    brands?.[iconStates[3].index]?.logoImageKey || ""
                  )}
                  alt={brands?.[iconStates[3].index]?.name || ""}
                  className="size-[140px] object-contain"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                />
              </AnimatePresence>
            </div>
          </div>
          {/* RIGHT ICONS */}
          <div className="grid aspect-square grid-cols-3 gap-5">
            <div className="relative col-start-3 w-fit overflow-hidden rounded-[40px] after:absolute after:inset-0 after:rounded-[40px] bg-muted p-2">
              <AnimatePresence mode="wait">
                <motion.img
                  key={iconStates[4].key}
                  src={getFileUrl(
                    brands?.[iconStates[4].index]?.logoImageKey || ""
                  )}
                  alt={brands?.[iconStates[4].index]?.name || ""}
                  className="size-[140px] object-contain"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                />
              </AnimatePresence>
            </div>

            <div className="relative col-span-2 col-start-2 w-fit overflow-hidden rounded-[40px] after:absolute after:inset-0 after:rounded-[40px] bg-muted p-2">
              <AnimatePresence mode="wait">
                <motion.img
                  key={iconStates[5].key}
                  src={getFileUrl(
                    brands?.[iconStates[5].index]?.logoImageKey || ""
                  )}
                  alt={brands?.[iconStates[5].index]?.name || ""}
                  className="size-[140px] object-contain"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                />
              </AnimatePresence>
            </div>

            <div className="relative col-span-2 w-fit overflow-hidden rounded-[40px] after:absolute after:inset-0 after:rounded-[40px] bg-muted p-2">
              <AnimatePresence mode="wait">
                <motion.img
                  key={iconStates[6].key}
                  src={getFileUrl(
                    brands?.[iconStates[6].index]?.logoImageKey || ""
                  )}
                  alt={brands?.[iconStates[6].index]?.name || ""}
                  className="size-[140px] object-contain"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                />
              </AnimatePresence>
            </div>

            <div className="relative w-fit overflow-hidden rounded-[40px] after:absolute after:inset-0 after:rounded-[40px] bg-muted p-2">
              <AnimatePresence mode="wait">
                <motion.img
                  key={iconStates[7].key}
                  src={getFileUrl(
                    brands?.[iconStates[7].index]?.logoImageKey || ""
                  )}
                  alt={brands?.[iconStates[7].index]?.name || ""}
                  className="size-[140px] object-contain"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                />
              </AnimatePresence>
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
            COMING SOON...
          </Badge>
          <h1 className="px-3 text-heading-xl md:px-0 max-w-[660px]">
            Connecting Digital Realms: Your Ultimate Tech Hub.
          </h1>
          <p className="max-w-[600px] px-4 text-gray-500 md:text-xl md:px-0">
            <span>
              Curated Insights into Server, Storage, and Network Devices –
              Effortlessly Navigate the Tech Landscape.
            </span>
          </p>

          <div className="md:pt-4">
            <Link href={"/auth/register"}>
              <Button>Create free account</Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
