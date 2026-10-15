import type { Metadata } from "next";

import PageTitle from "@/components/page-title";
import AboutSection from "@/components/section/about";
import LifeStyles from "@/components/about/life-styles";
import CodingStats from "@/components/about/coding-stats";
import TalkToHugo from "@/components/about/talk-to-hugo";
import ContactSection from "@/components/section/contact";
import DesignChoice from "@/components/showcase/design-choice";
import {
  demoGithubUsername,
  demoLifestyles,
  demoTechStacks,
} from "@/components/showcase/fixtures";

import config from "@/config";

export const metadata: Metadata = {
  title: `Showcase | ${config.title}`,
};

function Showcase() {
  return (
    <article>
      <PageTitle title="Showcase" />
      <p className="text-light-gray text-sm leading-6">
        Section designs that used to sit on the about page. Switching a version
        only changes this page.
      </p>

      <AboutSection id="contact" title="Contact">
        <DesignChoice
          earlier={<TalkToHugo demo />}
          current={<ContactSection demo />}
        />
      </AboutSection>

      <AboutSection id="life-styles" title="Life Styles">
        <LifeStyles lifestyles={demoLifestyles} />
      </AboutSection>

      <AboutSection id="coding-stats" title="Coding Stats">
        <CodingStats
          techStacks={demoTechStacks}
          githubUsername={demoGithubUsername}
        />
      </AboutSection>
    </article>
  );
}

export default Showcase;
