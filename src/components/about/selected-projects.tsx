"use client";

import Image from "next/image";
import { sendGTMEvent } from "@next/third-parties/google";

import { ViewTransitionsProgressBarLink } from "@/components/progress-bar";
import AnimatedShinyText from "@/components/magicui/animated-shiny-text";
import { BlurFadeLi, BlurFade } from "@/components/magicui/blur-fade";
import { getIcon, ICON_NAMES } from "@/components/icons";

import { ProjectPost } from "@/types/post";

import { cn } from "@/lib/utils";


import styles from "@/styles/about/selected-projects.module.css";

interface SelectedProjectsProps {
  count: number;
  posts: ProjectPost[];
  route: string;
  seeMoreBadge: string;
}

function SelectedProjects({
  count,
  posts,
  route,
  seeMoreBadge,
}: SelectedProjectsProps) {
  const visiblePosts = posts.slice(0, count);

  const Eye = getIcon(ICON_NAMES.EYE_LU);
  const ArrowRight = getIcon(ICON_NAMES.ARROW_RIGHT);

  return (
    <>
      <ul className={cn(styles["latest-posts"])}>
        {visiblePosts.map((post, index) => (
          <BlurFadeLi
            className={cn(styles["latest-post"], "group active")}
            key={`${index}-${post.slug}`}
            inView
            delay={0.4}
            direction="up"
          >
            <ViewTransitionsProgressBarLink
              href={`${route}/${post.slug}`}
              rel="noopener noreferrer"
              onClick={() => {
                // Umami tracking
                if (typeof window !== "undefined" && window.umami) {
                  window.umami.track("Click Selected Projects", {
                    project: post.title,
                    slug: post.slug,
                  });
                }
                // Google Analytics tracking
                sendGTMEvent({
                  event: "click_selected_projects",
                  value: post.slug,
                  project_title: post.title,
                });
              }}
            >
              <figure className={cn(styles["latest-post-img"])}>
                <div
                  className={cn(
                    styles["latest-post-icon-box"],
                    "absolute text-orange-yellow-crayola text-xl bg-jet p-[18px] rounded-xl top-1/2 left-1/2 transition-all duration-250 ease-linear",
                  )}
                >
                  <Eye />
                </div>
                <Image
                  src={post.thumbnail}
                  alt={post.excerpt || "Chun-Ho (Hugo) Lin - Selected Project"}
                  width={480}
                  height={270}
                  priority
                  quality={50}
                  placeholder="empty"
                  loading="eager"
                />
              </figure>
              <h3 className="ml-[10px] text-white-2 text-base font-normal leading-[1.3] group-hover:text-orange-yellow-crayola group-hover:font-bold">
                {post.title}
              </h3>
            </ViewTransitionsProgressBarLink>
          </BlurFadeLi>
        ))}
      </ul>

      <BlurFade inView delay={0.4} direction="up">
        <div className="z-10 flex items-center justify-center py-4">
          <div
            className={cn(
              "group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800",
            )}
          >
            <ViewTransitionsProgressBarLink href={route}>
              <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 dark:hover:text-neutral-400">
                <span>{seeMoreBadge}</span>
                <ArrowRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
              </AnimatedShinyText>
            </ViewTransitionsProgressBarLink>
          </div>
        </div>
      </BlurFade>
    </>
  );
}

export { SelectedProjects };
export default SelectedProjects;
