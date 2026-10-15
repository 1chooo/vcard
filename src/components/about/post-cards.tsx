"use client";

import { useRouter } from "next/navigation";
import { sendGTMEvent } from "@next/third-parties/google";

import AnimatedShinyText from "@/components/magicui/animated-shiny-text";
import { BlurFade } from "@/components/magicui/blur-fade";
import { ViewTransitionsProgressBarLink } from "@/components/progress-bar";
import { BlurFadeLi } from "@/components/magicui/blur-fade";
import { getIcon, ICON_NAMES } from "@/components/icons";

import { cn } from "@/lib/utils";


import { BlogPost } from "@/types/post";

import styles from "@/styles/gradient-card.module.css";

interface PostCardsProps {
  posts: BlogPost[];
}

function PostCards({ posts }: PostCardsProps) {
  const ArrowRight = getIcon(ICON_NAMES.ARROW_RIGHT);

  return (
    <div className="w-full md:w-2/3 space-y-7">
      <ul className="space-y-6">
        {posts.map((post, index) => (
          <PostCard key={post.slug} post={post} index={index} />
        ))}
      </ul>
      <BlurFade inView delay={0.4} direction="up">
        <div className="z-10 flex items-center justify-center py-4">
          <div
            className={cn(
              "group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800",
            )}
          >
            <ViewTransitionsProgressBarLink href="/blog">
              <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 dark:hover:text-neutral-400">
                <span>{"✨ View All My Writings"}</span>
                <ArrowRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
              </AnimatedShinyText>
            </ViewTransitionsProgressBarLink>
          </div>
        </div>
      </BlurFade>
    </div>
  );
}

interface PostCardProps {
  post: BlogPost;
  index: number;
}

function PostCard({ post, index }: PostCardProps) {
  const router = useRouter();
  const postLink = `/blog/${post.slug}`;

  const handlePostClick = (link: string, title: string, slug: string) => {
    // Umami tracking
    if (typeof window !== "undefined" && window.umami) {
      window.umami.track("Click My Writings", {
        title,
        slug,
      });
    }
    // Google Analytics tracking
    sendGTMEvent({
      event: "click_my_writings",
      value: slug,
      post_title: title,
    });
    router.push(link);
  };

  return (
    <BlurFadeLi
      key={`${index}-${post.slug}`}
      inView
      delay={0.4}
      direction="up"
      className={cn(styles.gradientCard, "group cursor-pointer")}
      onClick={() => handlePostClick(postLink, post.title, post.slug)}
    >
      <div className="flex flex-col gap-1 overflow-hidden relative z-30 duration-300 ease-out group-hover:-translate-x-1 group-hover:-translate-y-1">
        <h2 className="flex items-center mb-3">
          <ViewTransitionsProgressBarLink
            href={postLink}
            className="text-base font-bold leading-tight tracking-tight sm:text-lg sm:leading-7 text-white-1"
          >
            {post.title}
          </ViewTransitionsProgressBarLink>
          <svg
            className="group-hover:translate-x-0 shrink-0 translate-y-0.5 -translate-x-1 w-2.5 h-2.5 stroke-current ml-1 transition-all ease-in-out duration-200 transform text-light-gray"
            viewBox="0 0 13 15"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <g
              stroke="none"
              strokeWidth="1"
              fill="none"
              fillRule="evenodd"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <g
                id="svg"
                transform="translate(0.666667, 2.333333)"
                stroke="currentColor"
                strokeWidth="2.4"
              >
                <g>
                  <polyline
                    className="transition-all duration-200 ease-out opacity-0 delay-0 group-hover:opacity-100"
                    points="5.33333333 0 10.8333333 5.5 5.33333333 11"
                  />
                  <line
                    className="transition-all duration-200 ease-out transform -translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 group-hover:ml-0"
                    x1="10.8333333"
                    y1="5.5"
                    x2="0.833333333"
                    y2="5.16666667"
                  />
                </g>
              </g>
            </g>
          </svg>
        </h2>
        <p className="text-sm text-light-gray-70">
          <span>{post.excerpt}</span>
        </p>
        <div className="mt-2.5 flex items-center gap-3 text-xs font-medium text-light-gray">
          <span>{post.publishedAt}</span>
          <span
            className="w-1 h-1 bg-current rounded-full"
            aria-hidden="true"
          ></span>
          {post.readingTime && <span>{post.readingTime}</span>}
        </div>
      </div>
    </BlurFadeLi>
  );
}

export { PostCard, PostCards };
export default PostCards;
