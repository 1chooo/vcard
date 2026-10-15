import type { MetadataRoute } from "next";

import { getProjectPosts, getBlogPosts, getResumePosts } from "@/lib/api/mdx";
import {
  BLOG_DIRECTORY,
  PROJECT_DIRECTORY,
  RESUME_DIRECTORY,
} from "@/lib/constants";
import config from "@/config";

const { siteURL } = config;

function mapBlogPostsToSitemap(
  posts: { publishedAt: string; slug: string }[],
  prefix: string,
) {
  return posts.map((post) => ({
    url: `${siteURL}/${prefix}/${post.slug}`,
    lastModified: post.publishedAt,
  }));
}

function mapProjectPostsToSitemap(
  projects: { endDate: string; slug: string }[],
  prefix: string,
) {
  return projects.map((project) => ({
    url: `${siteURL}/${prefix}/${project.slug}`,
    lastModified:
      project.endDate && project.endDate.trim() !== ""
        ? project.endDate
        : new Date().toISOString(),
  }));
}

function mapResumePostsToSitemap(
  resumes: { endDate?: string; slug: string }[],
  prefix: string,
) {
  return resumes.map((resume) => ({
    url: `${siteURL}/${prefix}/${resume.slug}`,
    lastModified:
      resume.endDate && resume.endDate.trim() !== ""
        ? resume.endDate
        : new Date().toISOString(),
  }));
}

function sitemap(): MetadataRoute.Sitemap {
  const posts = getBlogPosts(BLOG_DIRECTORY);
  const postMaps = mapBlogPostsToSitemap(posts, "blog");

  const projects = getProjectPosts(PROJECT_DIRECTORY);
  const projectMaps = mapProjectPostsToSitemap(projects, "project");

  const resumes = getResumePosts(RESUME_DIRECTORY);
  const resumeMaps = mapResumePostsToSitemap(resumes, "resume");

  const routes = [
    "",
    "/resume",
    "/project",
    "/blog",
    "/showcase",
    "/code-of-conduct",
    "/terms",
    "/cv",
    "/feed",
    "/rss",
    "/manifest.webmanifest",
    "/manifest",
    "/sitemap",
    "/code",
    "/in",
    "/x",
  ].map((route) => ({
    url: `${siteURL}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...postMaps, ...projectMaps, ...resumeMaps];
}

export default sitemap;
