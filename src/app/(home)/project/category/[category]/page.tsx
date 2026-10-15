import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import PageTitle from "@/components/page-title";
import { ViewTransitionsProgressBarLink } from "@/components/progress-bar";

import { getProjectCategories, getProjectPostsByCategory } from "@/lib/api/mdx";
import { PROJECT_DIRECTORY } from "@/lib/constants";
import { cn } from "@/lib/utils";


import config from "@/config";
import { NonClickableTechBadges } from "@/lib/tech-badge/utils";
import styles from "@/styles/project.module.css";
import { ProjectPost } from "@/types/post";

interface ProjectCategoryProps {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({
  params,
}: ProjectCategoryProps): Promise<Metadata> {
  const { category } = await params;
  const categoryName = decodeURIComponent(category);

  return {
    title: `${categoryName} | Project | ${config.title}`,
    description: config.description,
  };
}

export async function generateStaticParams() {
  try {
    const categories = getProjectCategories(PROJECT_DIRECTORY);

    return Object.keys(categories).map((category) => ({
      category: category.toLowerCase(),
    }));
  } catch (error) {
    console.error("Failed to generate static params:", error);
    return [];
  }
}

export default async function ProjectCategory({
  params,
}: ProjectCategoryProps) {
  const { category } = await params;
  const categoryParam = decodeURIComponent(category);

  let filteredPosts: ProjectPost[];
  let allCategories: Record<string, number>;

  try {
    filteredPosts = getProjectPostsByCategory(PROJECT_DIRECTORY, categoryParam);
    allCategories = getProjectCategories(PROJECT_DIRECTORY);
  } catch (error) {
    console.error("Failed to load project posts:", error);
    filteredPosts = [];
    allCategories = {};
  }

  if (filteredPosts.length === 0) {
    notFound();
  }
  const projectCategories = Object.keys(allCategories);

  return (
    <article>
      <PageTitle title="Project" />

      <section className={cn(styles.project)}>
        <ul className={styles.filters}>
          <li>
            <ViewTransitionsProgressBarLink
              href="/project"
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

          {projectCategories.map((category, index) => (
            <li key={`${index}-${category}`}>
              <ViewTransitionsProgressBarLink
                href={`/project/category/${encodeURIComponent(category.toLowerCase())}`}
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

      <section className={cn(styles.project)}>
        <ul className={cn(styles.cards)}>
          {filteredPosts.map((post: ProjectPost) => (
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
