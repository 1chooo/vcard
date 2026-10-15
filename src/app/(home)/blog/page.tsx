import type { Metadata } from "next";
import Image from "next/image";

import PageTitle from "@/components/page-title";
import { ViewTransitionsProgressBarLink } from "@/components/progress-bar";

import config from "@/config";

import { getBlogPosts } from "@/lib/api/mdx";
import type { BlogPost } from "@/types/post";
import { BLOG_DIRECTORY } from "@/lib/constants";

import { cn } from "@/lib/utils";


import styles from "@/styles/blog.module.css";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Blog | ${config.title}`,
    description: config.description,
  };
}

function getCategories(posts: BlogPost[]): Record<string, number> {
  const categories: Record<string, number> = Object.create(null);

  for (const post of posts) {
    const category = post.category;

    categories[category] ??= 0;
    categories[category] += 1;
  }

  return categories;
}

export default async function MdxBlog() {
  let allPosts: BlogPost[];

  try {
    allPosts = getBlogPosts(BLOG_DIRECTORY);
  } catch (error) {
    console.error("Failed to load project posts:", error);
    allPosts = [];
  }

  const categories = getCategories(allPosts);

  const blogCategories = Object.keys(categories);

  return (
    <article>
      <PageTitle title="Blog" />

      <section className={cn(styles.blog)}>
        <ul className={styles.filters}>
          <li>
            <ViewTransitionsProgressBarLink
              href="/blog"
              className={cn(styles.filterButton, styles.filterButtonActive)}
            >
              All ({allPosts.length})
            </ViewTransitionsProgressBarLink>
          </li>

          {blogCategories.map((category, index) => (
            <li key={index}>
              <ViewTransitionsProgressBarLink
                href={`/blog/category/${encodeURIComponent(category.toLowerCase())}`}
                className={cn(styles.filterButton)}
              >
                {category} ({categories[category]})
              </ViewTransitionsProgressBarLink>
            </li>
          ))}
        </ul>
      </section>

      <section className={cn(styles.blog)}>
        <ul className={cn(styles.cards)}>
          {allPosts.map((post: BlogPost) => (
            <li className={cn(styles.card)} key={post.slug}>
              <ViewTransitionsProgressBarLink
                href={`/blog/${post.slug}`}
                rel="noopener noreferrer"
              >
                <figure className={cn(styles.bannerBox)}>
                  <Image
                    src={
                      post.thumbnail ||
                      "https://docs.1chooo.com/images/cover-with-1chooo-com.png"
                    }
                    alt={post.title || "Blog post image"}
                    width={960}
                    height={540}
                    priority={false}
                    placeholder="blur"
                    loading="eager"
                    blurDataURL="https://docs.1chooo.com/images/cover-with-1chooo-com.png"
                  />
                </figure>
                <div className={cn(styles.content)}>
                  <div className={cn(styles.meta)}>
                    <p className={cn(styles.category)}>
                      {post.category.toUpperCase()}
                    </p>
                    <h3 className={cn(styles.title)}>{post.title}</h3>
                  </div>
                  <time className={cn(styles.date)} dateTime={post.publishedAt}>
                    {new Date(post.publishedAt).toLocaleDateString("en-us", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </time>
                </div>
              </ViewTransitionsProgressBarLink>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
