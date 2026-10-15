import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import PageTitle from "@/components/page-title";
import { ViewTransitionsProgressBarLink } from "@/components/progress-bar";

import config from "@/config";

import { getBlogPostsByCategory, getBlogCategories } from "@/lib/api/mdx";
import type { BlogPost } from "@/types/post";
import { BLOG_DIRECTORY } from "@/lib/constants";

import { cn } from "@/lib/utils";


import styles from "@/styles/blog.module.css";

interface BlogCategoryProps {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({
  params,
}: BlogCategoryProps): Promise<Metadata> {
  const { category } = await params;
  const categoryName = decodeURIComponent(category);

  return {
    title: `${categoryName} | Blog | ${config.title}`,
    description: `Blog posts about ${categoryName}`,
  };
}

export async function generateStaticParams() {
  try {
    const categories = getBlogCategories(BLOG_DIRECTORY);

    return Object.keys(categories).map((category) => ({
      category: category.toLowerCase(),
    }));
  } catch (error) {
    console.error("Failed to generate static params:", error);
    return [];
  }
}

export default async function BlogCategory({ params }: BlogCategoryProps) {
  const { category } = await params;
  const categoryParam = decodeURIComponent(category);

  let filteredPosts: BlogPost[];
  let allCategories: Record<string, number>;

  try {
    filteredPosts = getBlogPostsByCategory(BLOG_DIRECTORY, categoryParam);
    allCategories = getBlogCategories(BLOG_DIRECTORY);
  } catch (error) {
    console.error("Failed to load blog posts:", error);
    filteredPosts = [];
    allCategories = {};
  }

  if (filteredPosts.length === 0) {
    notFound();
  }

  const blogCategories = Object.keys(allCategories);

  return (
    <article>
      <PageTitle title="Blog" />

      <section className={cn(styles.blog)}>
        <ul className={styles.filters}>
          <li>
            <ViewTransitionsProgressBarLink
              href="/blog"
              className={cn(styles.filterButton)}
            >
              All (
              {Object.values(allCategories).reduce(
                (sum, count) => sum + count,
                0,
              )}
              )
            </ViewTransitionsProgressBarLink>
          </li>

          {blogCategories.map((category, index) => (
            <li key={`${index}-${category}`}>
              <ViewTransitionsProgressBarLink
                href={`/blog/category/${encodeURIComponent(category.toLowerCase())}`}
                className={cn(styles.filterButton, {
                  [styles.filterButtonActive]:
                    category.toLowerCase() === categoryParam.toLowerCase(),
                })}
              >
                {category} ({allCategories[category]})
              </ViewTransitionsProgressBarLink>
            </li>
          ))}
        </ul>
      </section>

      <section className={cn(styles.blog)}>
        <ul className={cn(styles.cards)}>
          {filteredPosts.map((post: BlogPost) => (
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
