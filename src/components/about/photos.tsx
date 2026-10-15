"use client";

import { useState } from "react";
import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";

type PhotoImage = { img: string; title: string; alt: string };

const travelImages: PhotoImage[] = [
  {
    img: "/images/photo/usc.webp",
    title: "USC",
    alt: "",
  },
  {
    img: "/images/photo/half-dome.webp",
    title: "Yosemite Half Dome",
    alt: "",
  },
  {
    img: "/images/photo/vernal-falls.webp",
    title: "Yosemite Vernal Falls",
    alt: "",
  },
  {
    img: "/images/photo/ucla.webp",
    title: "UCLA",
    alt: "",
  },
  {
    img: "/images/photo/ucsd.webp",
    title: "UCSD",
    alt: "",
  },
];

const possibleRotations = [1.3, -1.3, 1.3, -1.3, 1.3, -1.3];

const Photo = ({
  img,
  title,
  alt,
  idx,
}: {
  img: string;
  title: string;
  alt: string;
  idx: number;
}) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <motion.div
      key={img}
      initial={{
        scale: 1,
        rotate: possibleRotations[idx % possibleRotations.length],
        opacity: 0,
      }}
      whileHover={{ scale: 1.1, rotate: 0, transition: { duration: 0.2 } }}
      whileInView={{ opacity: 1, transition: { delay: idx / 100 } }}
      viewport={{ once: true }}
      onHoverStart={() => setIsVisible(true)}
      onHoverEnd={() => setIsVisible(false)}
      className={clsx(
        "relative aspect-9/10 w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800",
      )}
    >
      <Image
        src={img}
        alt={alt}
        width={800}
        height={900}
        sizes="(min-width: 640px) 18rem, 11rem"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.2 } }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 w-full bg-linear-to-t from-black/75 via-black/0 flex items-end"
          >
            <h3 className="px-3 py-2 font-mono text-xs font-bold text-white-1">
              {title}
            </h3>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export const Photos = ({ images = travelImages }: { images?: PhotoImage[] }) => {
  return (
    <div className="my-8">
      <div className="hide-scrollbar -my-4 flex gap-8 overflow-y-auto py-4 md:px-8">
        {images.map((travelImage, index) => (
          <Photo
            key={travelImage.title}
            img={travelImage.img}
            title={travelImage.title}
            alt={travelImage.alt}
            idx={index}
          />
        ))}
      </div>
    </div>
  );
};
