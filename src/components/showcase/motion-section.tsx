"use client";

import { Play, RotateCcw } from "lucide-react";
import { useState } from "react";

import {
  FadeIn,
  FadeLeft,
  FadeUpDiv,
  PopIn,
} from "@/components/animations/animations";
import { BlurFade } from "@/components/magicui/blur-fade";

const motions = [
  { name: "Fade up", delay: 0.05 },
  { name: "Fade left", delay: 0.15 },
  { name: "Fade in", delay: 0.25 },
  { name: "Pop in", delay: 0.35 },
  { name: "Blur fade", delay: 0.45 },
] as const;

function MotionSection() {
  const [playCount, setPlayCount] = useState(0);
  const played = playCount > 0;
  const Icon = played ? RotateCcw : Play;

  return (
    <div>
      <button
        type="button"
        onClick={() => setPlayCount((count) => count + 1)}
        className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-orange-yellow-crayola px-4 py-1.5 text-sm text-orange-yellow-crayola transition-colors hover:text-white-2"
      >
        <Icon className="size-3.5" aria-hidden="true" />
        {played ? "Replay" : "Play"}
      </button>

      {playCount === 0 ? (
        <p className="text-sm text-light-gray-70">
          Play to run the entrance animations.
        </p>
      ) : (
        <ul key={playCount} className="space-y-3">
          {motions.map((motion) => (
            <li key={motion.name}>
              <MotionDemo name={motion.name} delay={motion.delay} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function MotionDemo({ name, delay }: { name: string; delay: number }) {
  const label = (
    <p className="rounded-xl border border-jet bg-eerie-black-2 px-4 py-3 text-sm text-white-2">
      {name}
    </p>
  );

  if (name === "Fade up") return <FadeUpDiv delay={delay}>{label}</FadeUpDiv>;
  if (name === "Fade left") return <FadeLeft delay={delay}>{label}</FadeLeft>;
  if (name === "Fade in") return <FadeIn delay={delay}>{label}</FadeIn>;
  if (name === "Pop in") return <PopIn delay={delay}>{label}</PopIn>;

  return <BlurFade delay={delay}>{label}</BlurFade>;
}

export { MotionSection };
export default MotionSection;
