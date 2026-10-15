"use client";

import { BlurFadeLi, BlurFade } from "@/components/magicui/blur-fade";

import { BlogPost } from "@/types/post";
import { cn } from "@/lib/utils";

import styles from "@/styles/gradient-card.module.css";

interface PostsLoopProps {
  posts: BlogPost[];
  count?: number;
}

function parseDate(dateStr: string): Date {
  const [month, day, year] = dateStr.split(" ");
  return new Date(`${month} ${parseInt(day)}, ${year}`);
}

function PostsLoop({ posts, count = posts.length }: PostsLoopProps) {
  const postsLoop = posts
    .map((post) => ({
      ...post,
      date: parseDate(post.publishedAt),
    }))
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, count);

  return (
    <div className="w-full md:w-2/3 space-y-7">
      <ul className="space-y-6">
        {postsLoop.map((post, index) => (
          <BlurFadeLi
            key={`${index}-${post.slug}`}
            inView
            delay={0.4}
            direction="up"
            className={cn(styles.gradientCard, "group")}
          >
            <div className="flex flex-col gap-1 overflow-hidden relative z-30 duration-300 ease-out group-hover:-translate-x-1 group-hover:-translate-y-1">
              <h2 className="flex items-center mb-3">
                <span className="text-base font-bold leading-tight tracking-tight sm:text-lg text-white-1">
                  {post.title}
                </span>
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
        ))}
      </ul>

      <BlurFade inView delay={0.4} direction="up">
        <div className="flex items-center justify-center w-full py-4">
          <span className="inline-flex w-auto px-4 py-2 text-xs font-semibold border rounded-full bg-white text-neutral-900">
            View All My Writings
          </span>
        </div>
      </BlurFade>
    </div>
  );
}

export { PostsLoop };
export default PostsLoop;
