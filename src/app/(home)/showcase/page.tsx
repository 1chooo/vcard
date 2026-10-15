import type { Metadata } from "next";

import PageTitle from "@/components/page-title";
import AboutSection from "@/components/section/about";
import LifeStyles from "@/components/about/life-styles";
import CodingStats from "@/components/about/coding-stats";
import TalkToHugo from "@/components/about/talk-to-hugo";
import { Photos } from "@/components/about/photos";
import { MyWritings } from "@/components/about/my-writings";
import { PhotoGallery } from "@/components/photo-gallery";
import ContactSection from "@/components/section/contact";
import DesignChoice from "@/components/showcase/design-choice";
import { ClassicNav, CurrentNav } from "@/components/showcase/navbar-preview";
import MotionSection from "@/components/showcase/motion-section";
import Testimonials from "@/components/testimonials";
import PostsLoop from "@/components/showcase/posts-loop";
import {
  demoGithubUsername,
  demoLifestyles,
  demoPhotos,
  demoPosts,
  demoTechStacks,
  demoTestimonials,
  demoWritingStacks,
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

      <AboutSection id="navbar" title="Navbar">
        <DesignChoice earlier={<ClassicNav />} current={<CurrentNav />} />
      </AboutSection>

      <AboutSection id="contact" title="Contact">
        <DesignChoice
          earlier={<TalkToHugo demo />}
          current={<ContactSection demo />}
        />
      </AboutSection>

      <AboutSection id="life-styles" title="Life Styles">
        <LifeStyles lifestyles={demoLifestyles} />
      </AboutSection>

      <AboutSection id="writings" title="Writings">
        <DesignChoice
          earlier={<PostsLoop posts={demoPosts} />}
          current={
            <MyWritings
              posts={demoPosts}
              count={2}
              demo
              stacks={demoWritingStacks}
            />
          }
        />
      </AboutSection>

      <AboutSection id="photos" title="Photos">
        <DesignChoice
          earlier={
            <Photos
              images={demoPhotos.map((photo) => ({
                img: photo.src,
                title: photo.title,
                alt: photo.alt,
              }))}
            />
          }
          current={<PhotoGallery images={demoPhotos} />}
        />
      </AboutSection>

      <AboutSection id="coding-stats" title="Coding Stats">
        <CodingStats
          techStacks={demoTechStacks}
          githubUsername={demoGithubUsername}
        />
      </AboutSection>

      <AboutSection id="testimonials" title="Testimonials">
        <Testimonials testimonials={demoTestimonials} />
      </AboutSection>

      <AboutSection id="motion" title="Motion">
        <MotionSection />
      </AboutSection>
    </article>
  );
}

export default Showcase;
