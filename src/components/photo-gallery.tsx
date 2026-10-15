"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { BlurFade } from "@/components/magicui/blur-fade";
import Image from "next/image";

const images = [
  {
    src: "/images/photo/usc.webp",
    alt: "USC",
    title: "USC",
  },
  {
    src: "/images/photo/half-dome.webp",
    alt: "Half Dome",
    title: "Yosemite Half Dome",
  },
  {
    src: "/images/photo/vernal-falls.webp",
    alt: "Vernal Falls",
    title: "Yosemite Vernal Falls",
  },
  {
    src: "/images/photo/ucla.webp",
    alt: "UCLA",
    title: "UCLA",
  },
  {
    src: "/images/photo/ucsd.webp",
    alt: "UCSD",
    title: "UCSD",
  },
];

const PhotoItem = ({
  image,
  idx,
}: {
  image: { src: string; alt: string; title: string };
  idx: number;
}) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <BlurFade key={image.src} delay={0.25 + idx * 0.05} inView>
      <motion.div
        className="relative mb-4 overflow-hidden rounded-lg"
        whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
        onHoverStart={() => setIsVisible(true)}
        onHoverEnd={() => setIsVisible(false)}
      >
        <Image
          className="size-full object-contain"
          src={image.src}
          alt={image.alt}
          width={800}
          height={800}
          sizes="(min-width: 640px) 33vw, 50vw"
        />
        <AnimatePresence>
          {isVisible && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.2 } }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-end bg-linear-to-t from-black/75 via-black/0"
            >
              <h3 className="px-3 py-2 font-mono text-xs font-bold text-white">
                {image.title}
              </h3>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </BlurFade>
  );
};

export function PhotoGallery() {
  return (
    <section id="photos">
      <div className="columns-2 gap-4 sm:columns-3">
        {images.map((image, idx) => (
          <PhotoItem key={image.src} image={image} idx={idx} />
        ))}
      </div>
    </section>
  );
}
