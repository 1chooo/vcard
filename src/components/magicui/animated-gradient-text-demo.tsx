import { ChevronRight } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils";

import AnimatedGradientText from "@/components/magicui/animated-gradient-text";

export async function AnimatedGradientTextDemo() {
  return (
    <div className="z-10 flex items-center justify-center mt-5">
      <Link
        href="https://magicui.design/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <AnimatedGradientText>
          🎉 <hr className="mx-2 h-4 w-px shrink-0 bg-gray-300" />{" "}
          <span
            className={cn(
              `inline animate-gradient bg-linear-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-size-[var(--bg-size)_100%] bg-clip-text text-transparent`,
            )}
          >
            Thanks for Magic UI!
          </span>
          <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
        </AnimatedGradientText>
      </Link>
    </div>
  );
}
