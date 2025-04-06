/* eslint-disable @next/next/no-img-element */
import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { ProductImagesGetManyOutput } from "../../types";
import { getFileUrl } from "@/modules/filesUpload/lib/utils";

interface ProductImagesCarouselProps {
  images: ProductImagesGetManyOutput;
}

export function ProductImagesCarousel({ images }: ProductImagesCarouselProps) {
  return (
    <Carousel className="w-full">
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index} className="basis-1/2 2xl:basis-1/3">
            <Card className="h-50 flex items-center justify-center shadow-none bg-muted">
              <CardContent className="p-0">
                <img
                  src={getFileUrl(image.imageKey)}
                  alt={image.imageKey}
                  className="object-contain rounded-lg"
                />
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
