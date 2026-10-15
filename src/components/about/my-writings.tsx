import React from "react";

import { PostCards } from "@/components/about/post-cards";
import { TechStacksSidebar } from "@/components/about/tech-stacks-sidebar";

import { BlogPost } from "@/types/post";

interface MyWritingsProps {
  count?: number;
  posts?: BlogPost[];
  demo?: boolean;
  stacks?: Record<string, string[]>;
}

function parseDate(dateStr: string): Date {
  const [month, day, year] = dateStr.split(" ");
  return new Date(`${month} ${parseInt(day)}, ${year}`);
}

function MyWritings({
  count = 3,
  posts = [],
  demo = false,
  stacks,
}: MyWritingsProps) {
  const sortedPosts = posts
    .map((post: BlogPost) => ({
      ...post,
      date: parseDate(post.publishedAt),
    }))
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, count);

  return (
    <div className="w-full max-w-4xl mx-auto my-7 xl:px-0">
      <div className="flex flex-col items-start justify-start md:flex-row md:space-x-7">
        <PostCards posts={sortedPosts} demo={demo} />
        <TechStacksSidebar stacks={stacks} />
      </div>
    </div>
  );
}

export { MyWritings };
export default MyWritings;
