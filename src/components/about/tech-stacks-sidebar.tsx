import React from "react";
import { Zap } from "lucide-react";

import { BlurFadeLi } from "@/components/magicui/blur-fade";
import { ClickableTechBadges } from "@/lib/tech-badge/utils";
import config from "@/config";

import styles from "@/styles/gradient-card.module.css";

import { cn } from "@/lib/utils";


function TechStacksSidebar({
  stacks,
}: {
  stacks?: Record<string, string[]>;
} = {}) {
  const groups = stacks ?? config.techStacks;

  return (
    <ul className="w-full mt-10 md:w-1/3 md:mt-0">
      {Object.entries(groups).map(([category, badges]) => (
        <BlurFadeLi
          inView
          delay={0.4}
          direction="up"
          key={category}
          className={cn(styles.gradientCard, "mb-4")}
        >
          <div className="flex flex-wrap gap-2 shadow-feature-card dark:shadow-feature-card-dark rounded-xl">
            <div className="relative flex items-center space-x-2">
              <Zap className="flex-none text-white-1" size={18} />
              <h2 className="flex text-sm font-semibold text-white-1">
                {category}
              </h2>
            </div>
            <div className="flex flex-wrap gap-2 shadow-feature-card dark:shadow-feature-card-dark rounded-xl mt-4">
              {badges.map((badgeKey) => (
                <span key={badgeKey}>{ClickableTechBadges[badgeKey]}</span>
              ))}
            </div>
          </div>
        </BlurFadeLi>
      ))}
    </ul>
  );
}

export { TechStacksSidebar };
export default TechStacksSidebar;
