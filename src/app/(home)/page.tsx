import dynamic from "next/dynamic";

import PageTitle from "@/components/page-title";
import { MyWritings } from "@/components/about/my-writings";
import { FadeLeft } from "@/components/animations/animations";
import { getBlogPosts, getProjectPosts } from "@/lib/api/mdx";
import { BLOG_DIRECTORY, PROJECT_DIRECTORY } from "@/lib/constants";
import AboutCopy from "./_about/about.mdx";

const AboutSection = dynamic(() => import("@/components/section/about"));
const SelectedProjects = dynamic(
  () => import("@/components/about/selected-projects"),
);

function About() {
  const blogs = getBlogPosts(BLOG_DIRECTORY);
  const projects = getProjectPosts(PROJECT_DIRECTORY);

  return (
    <article>
      <PageTitle title="About Me" />

      <FadeLeft delay={0.3 * 1}>
        <AboutCopy />
      </FadeLeft>

      <AboutSection id="selected-project" title="Selected Project">
        <SelectedProjects
          count={3}
          posts={projects}
          route="/project"
          seeMoreBadge="✨ See More Projects"
        />
      </AboutSection>

      <AboutSection id="my-writings" title="My Writings">
        <MyWritings count={3} posts={blogs} />
      </AboutSection>
    </article>
  );
}

export default About;
