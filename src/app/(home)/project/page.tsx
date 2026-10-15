import Image from "next/image";
import type { Metadata } from "next";

import PageTitle from "@/components/page-title";
import { ViewTransitionsProgressBarLink } from "@/components/progress-bar";

import { getProjectPosts } from "@/lib/api/mdx";
import { cn } from "@/lib/utils";


import config from "@/config";

import styles from "@/styles/project.module.css";
import { ProjectPost } from "@/types/post";
import { NonClickableTechBadges } from "@/lib/tech-badge/utils";
import { PROJECT_DIRECTORY } from "@/lib/constants";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Project | ${config.title}`,
    description: config.description,
  };
}

function getCategories(posts: ProjectPost[]): Record<string, number> {
  const categories: Record<string, number> = Object.create(null);

  for (const post of posts) {
    const category = post.category;

    categories[category] ??= 0;
    categories[category] += 1;
  }

  return categories;
}

export default async function Project() {
  let projects: ProjectPost[];

  try {
    projects = getProjectPosts(PROJECT_DIRECTORY);
  } catch (error) {
    console.error("Failed to load project posts:", error);
    projects = [];
  }

  const categories = getCategories(projects);
  const projectCategories = Object.keys(categories);

  return (
    <article>
      <PageTitle title="Project" />

      <section className={cn(styles.project)}>
        <ul className={styles.filters}>
          <li>
            <ViewTransitionsProgressBarLink
              href="/project"
              className={cn(styles.filterButton, styles.filterButtonActive)}
            >
              All ({projects.length})
            </ViewTransitionsProgressBarLink>
          </li>

          {projectCategories.map((category, index) => (
            <li key={index}>
              <ViewTransitionsProgressBarLink
                href={`/project/category/${encodeURIComponent(category.toLowerCase())}`}
                className={cn(styles.filterButton)}
              >
                {category} ({categories[category]})
              </ViewTransitionsProgressBarLink>
            </li>
          ))}
        </ul>
      </section>

      <section className={cn(styles.project)}>
        <ul className={cn(styles.cards)}>
          {projects.map((post: ProjectPost) => (
            <li className={cn(styles.card)} key={post.slug}>
              <ViewTransitionsProgressBarLink
                href={`/project/${post.slug}`}
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
                    <div className="flex justify-between items-center">
                      <time className={cn(styles.period)}>
                        {new Date(post.startDate).toLocaleDateString("en-us", {
                          month: "long",
                          year: "numeric",
                        })}
                        {" - "}
                        {post.endDate
                          ? new Date(post.endDate).toLocaleDateString("en-us", {
                              month: "long",
                              year: "numeric",
                            })
                          : "Present"}
                      </time>
                      <p className={cn(styles.category)}>
                        {post.category.toUpperCase()}
                      </p>
                    </div>
                    <h3 className={cn(styles.title)}>{post.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4 overflow-hidden relative max-h-16">
                    {post.techStack.map((badgeKey) => (
                      <span key={badgeKey}>
                        {NonClickableTechBadges[badgeKey]}
                      </span>
                    ))}
                  </div>
                </div>
              </ViewTransitionsProgressBarLink>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
