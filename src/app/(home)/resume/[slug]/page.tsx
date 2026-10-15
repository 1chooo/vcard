import React from "react";
import type { Metadata, ResolvingMetadata } from "next";

import Image from "next/image";
import { notFound } from "next/navigation";
import { ViewTransitionsProgressBarLink } from "@/components/progress-bar";
import { FadeLeft, FadeIn } from "@/components/animations/animations";
import { FadeUpDiv } from "@/components/animations/animations";

import PageTitle from "@/components/page-title";
import {
  getMdxPostSlugs,
  getMdxPostExists,
  getResumePostBySlug,
  getCleanMdxContent,
  getMdxPostBySlug,
} from "@/lib/api/mdx";
import Mdx from "@/components/mdx";
import { RESUME_DIRECTORY } from "@/lib/constants";
import { getIcon } from "@/components/icons";
import { BriefcaseIcon } from "lucide-react";

import config from "@/config";

const { createResumePostTransformer } = require("@/lib/api/mdx");

type Params = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function Resume(props: Params) {
  const params = await props.params;
  const { slug } = params;

  // Check if the MDX file exists
  if (!getMdxPostExists(RESUME_DIRECTORY, slug)) {
    return notFound();
  }

  // Get the resume post frontmatter data (without processing content)
  const post = getResumePostBySlug(RESUME_DIRECTORY, slug);

  if (!post) {
    return notFound();
  }

  return (
    <div>
      <article>
        <header className="mb-8">
          <ViewTransitionsProgressBarLink
            href="/resume"
            rel="noopener noreferrer"
          >
            <PageTitle
              className="text-light-gray hover:text-light-gray-70"
              title="← Back to Resume"
            />
          </ViewTransitionsProgressBarLink>

          <FadeLeft delay={0.3 * 1}>
            <div className="flex items-center gap-2 mb-4 text-light-gray-70 text-sm">
              <div className="text-light-gray">{post.category}</div>
            </div>
            <h1 className="font-semibold text-4xl text-white-2 mb-8 text-balance">
              {post.title}
            </h1>
          </FadeLeft>

          <FadeUpDiv delay={0.3 * 2}>
            <div className="flex items-center">
              {post.institutionImage ? (
                <div className="h-10 w-10 overflow-hidden mr-3">
                  <Image
                    src={post.institutionImage}
                    alt={post.institution}
                    width={40}
                    height={40}
                    className="object-cover w-full h-full"
                  />
                </div>
              ) : (
                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center mr-3 bg-gradient-jet">
                  <span className="text-sm font-medium text-light-gray">
                    {post.institution.charAt(0)}
                  </span>
                </div>
              )}
              <div className="flex items-center text-light-gray-70 text-sm">
                <div className="text-light-gray mr-4">
                  <div className="text-sm font-medium leading-none mt-1">
                    {post.institution}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.map((tag, index) => {
                const TagIcon = getIcon(tag.icon) || BriefcaseIcon;
                return (
                  <span
                    key={`${tag.key}-${index}`}
                    className="inline-flex items-center gap-1 rounded-full border px-3 py-1 text-sm font-medium text-orange-yellow-crayola border-gray-700 bg-gray-800/30"
                  >
                    <TagIcon className="h-4 w-4" />
                    {tag.value}
                  </span>
                );
              })}
            </div>
          </FadeUpDiv>
        </header>

        <FadeIn delay={0.3 * 3}>
          <div className="flex justify-center">
            <div className="text-light-gray w-[90%] sm:w-[90%] md:w-[90%] lg:w-[80%] xl:w-[80%]">
              <Mdx source={getCleanMdxContent(RESUME_DIRECTORY, slug)} />
            </div>
          </div>
        </FadeIn>
      </article>
    </div>
  );
}

export async function generateMetadata(
  props: Params,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const params = await props.params;
  const post = getMdxPostBySlug(
    RESUME_DIRECTORY,
    params.slug,
    createResumePostTransformer(),
  );

  if (!post) {
    return notFound();
  }

  const title = `${post.title} | Resume`;

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title,
    description: post.excerpt || config.description,
    openGraph: {
      title,
      images: [post.thumbnail, ...previousImages],
    },
  };
}

export function generateStaticParams() {
  // Get all MDX post slugs for static generation
  const slugs = getMdxPostSlugs(RESUME_DIRECTORY);
  return slugs.map((slug) => ({ slug }));
}

export const dynamicParams = false;
