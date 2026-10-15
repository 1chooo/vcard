"use client";

import React, { useEffect, useState } from "react";

import { GitHubCalendar } from "react-github-calendar";

import { BlurFade } from "@/components/magicui/blur-fade";
import Globe from "@/components/about/globe";
import { Marquee } from "@/components/about/marquee";
import { getIcon, ICON_NAMES } from "@/components/icons";

import "@/styles/about/coding-stats.css";

interface TechStack {
  name: string;
  icon: string;
}

interface TechStacks {
  programmingLanguages: TechStack[];
  frameworks: TechStack[];
}

interface CodingStatsProps {
  techStacks: TechStacks;
  githubUsername: string;
}

function CodingStats({ techStacks, githubUsername }: CodingStatsProps) {
  const [showCalendar, setShowCalendar] = useState(false);

  useEffect(() => {
    setShowCalendar(true);
  }, []);

  const yellowTheme = {
    light: ["#EBEBEB", "#FFDA6B"],
    dark: ["#383838", "#FFDA6B"],
  };

  const Map = getIcon(ICON_NAMES.MAP_PIN_LU);
  const Zap = getIcon(ICON_NAMES.ZAP);

  return (
    <>
      <BlurFade inView delay={0.4} direction="left">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-2 lg:gap-y-5 lg:gap-x-6">
          <div className="coding-item relative rounded-2xl shadow-shadow-2 bg-gradient-onyx before:absolute before:content-[''] before:rounded-2xl">
            <div className="shadow-feature-card dark:shadow-feature-card-dark flex flex-col gap-2 overflow-hidden rounded-xl p-2">
              <div className="flex items-center gap-2 text-white-2">
                <Zap size={18} />
                <h2 className="text-sm font-light">Stacks</h2>
              </div>
              <Marquee gap="20px" className="py-2" fade pauseOnHover>
                {techStacks.programmingLanguages.map((stack) => {
                  const Icon = getIcon(stack.icon);
                  return (
                    <Icon
                      key={stack.name}
                      className="size-10 text-white-2 hover:scale-110 hover:text-orange-yellow-crayola"
                    />
                  );
                })}
              </Marquee>
              <Marquee gap="20px" className="py-2" reverse fade pauseOnHover>
                {techStacks.frameworks.map((stack) => {
                  const Icon = getIcon(stack.icon);
                  return (
                    <Icon
                      key={stack.name}
                      className="size-10 text-white-2 hover:scale-110 hover:text-orange-yellow-crayola"
                    />
                  );
                })}
              </Marquee>
            </div>
          </div>

          <div className="coding-item relative rounded-2xl shadow-shadow-2 bg-gradient-onyx before:absolute before:content-[''] before:rounded-2xl h-[200px] md:h-auto">
            <div className="absolute inset-x-0 bottom-[-190px] mx-auto aspect-square h-[388px] [@media(max-width:420px)]:bottom-[-140px] [@media(max-width:420px)]:h-[320px] [@media(min-width:768px)_and_(max-width:858px)]:h-[380px]">
              <div className="flex items-center gap-2 text-white-2 mt-4 ml-4">
                <Map size={18} />
                <h2 className="text-sm font-light">
                  Taipei, Taiwan (UTC +08:00)
                </h2>
              </div>
              <Globe />
            </div>
          </div>
        </div>
      </BlurFade>

      <BlurFade inView delay={0.4} direction="up">
        <section id="github-calendar" className="text-light-gray mt-5">
          {showCalendar ? (
            <GitHubCalendar
              username={githubUsername}
              blockSize={12}
              blockMargin={4}
              colorScheme="dark"
              blockRadius={2}
              fontSize={14}
              style={{ fontWeight: "bold" }}
              theme={yellowTheme}
            />
          ) : (
            <div className="h-28" aria-hidden="true" />
          )}
        </section>
      </BlurFade>
    </>
  );
}

export { CodingStats };
export default CodingStats;
