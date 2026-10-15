import type { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Comments from "@/components/comments";
import { ViewTransitionsProgressBarLink } from "@/components/progress-bar";
import { FadeLeft, FadeIn } from "@/components/animations/animations";
import { FadeUpDiv } from "@/components/animations/animations";

import PageTitle from "@/components/page-title";
import {
  getMdxPostSlugs,
  getMdxPostExists,
  getProjectPostBySlug,
  getCleanMdxContent,
  getMdxPostBySlug,
} from "@/lib/api/mdx";
import Mdx from "@/components/mdx";
import { PROJECT_DIRECTORY } from "@/lib/constants";
import { ProjectLinks } from "@/components/project/project-links";

import Balancer from "react-wrap-balancer";

import config from "@/config";

const { giscusConfig } = config;

type Params = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function Post(props: Params) {
  const params = await props.params;
  const { slug } = params;

  // Check if the MDX file exists
  if (!getMdxPostExists(PROJECT_DIRECTORY, slug)) {
    return notFound();
  }

  // Get the project post frontmatter data (without processing content)
  const post = getProjectPostBySlug(PROJECT_DIRECTORY, slug);

  if (!post) {
    return notFound();
  }

  return (
    <div>
      <article>
        <header className="mb-8">
          <ViewTransitionsProgressBarLink
            href="/project"
            rel="noopener noreferrer"
          >
            <PageTitle
              className="text-light-gray hover:text-light-gray-70"
              title="← Back to Project"
            />
          </ViewTransitionsProgressBarLink>

          <FadeLeft delay={0.3 * 1}>
            <div className="flex items-center gap-2 mb-4 text-light-gray-70 text-sm">
              <div className="text-light-gray">{post.category}</div>
            </div>
            <h1 className="font-semibold text-4xl text-white-2 mb-8">
              <Balancer>{post.title}</Balancer>
            </h1>
          </FadeLeft>

          <FadeUpDiv delay={0.3 * 2}>
            <div className="flex items-center">
              {post.author.avatar ? (
                <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    width={40}
                    height={40}
                    className="object-cover w-full h-full"
                  />
                </div>
              ) : (
                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center mr-3 bg-gradient-jet">
                  <span className="text-sm font-medium text-light-gray">
                    {post.author.name.charAt(0)}
                  </span>
                </div>
              )}
              <div className="flex items-center text-light-gray-70 text-sm">
                <div className="text-light-gray mr-4">
                  <div className="text-sm font-medium leading-none mt-1">
                    {post.author.name}
                  </div>
                  <time className="text-xs mt-1">
                    {new Date(
                      post.endDate || new Date().toISOString().split("T")[0],
                    ).toLocaleDateString("en-us", {
                      month: "long",
                      year: "numeric",
                    })}
                  </time>
                </div>
                {post.readingTime && <span>{post.readingTime}</span>}
              </div>
            </div>
          </FadeUpDiv>
        </header>

        <FadeIn delay={0.3 * 3}>
          <div className="flex justify-center">
            <div className="text-light-gray w-[90%] sm:w-[90%] md:w-[90%] lg:w-[80%] xl:w-[80%]">
              <ProjectLinks
                demo={post.demo}
                code={post.code}
                docs={post.docs}
                slide={post.slide}
              />
              <Mdx source={getCleanMdxContent(PROJECT_DIRECTORY, slug)} />
            </div>
          </div>
        </FadeIn>
      </article>

      <article style={{ marginTop: "1rem" }}>
        <PageTitle title="Comments" />
        <Comments giscusConfig={giscusConfig} />
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
    PROJECT_DIRECTORY,
    params.slug,
    (data, content, slug) => ({
      ...data,
      content,
      slug,
    }),
  );

  if (!post) {
    return notFound();
  }

  const title = `${post.title}`;

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title,
    authors: [
      {
        name: post.author.name,
        url: post.author.url || "https://v0.1chooo.com",
      },
    ],
    description: post.excerpt || config.description,
    keywords: post.tags || config.keywords,
    openGraph: {
      title,
      images: [post.thumbnail, ...previousImages],
    },
  };
}

export function generateStaticParams() {
  // Get all MDX post slugs for static generation
  const slugs = getMdxPostSlugs(PROJECT_DIRECTORY);
  return slugs.map((slug) => ({ slug }));
}

export const dynamicParams = false;
