import { ICON_NAMES } from "@/components/icons";

import type { LifeStyle } from "@/types/about";
import type { BlogPost } from "@/types/post";

const demoAuthor = {
  name: "Demo Author",
  avatar: "/images/profile.webp",
  url: "#",
};

const demoLifestyles: LifeStyle[] = [
  {
    icon: ICON_NAMES.PENCIL_LU,
    title: "Field notes",
    text: "Short writeups from weekend builds, kept as a running log.",
  },
  {
    icon: ICON_NAMES.PHOTO,
    title: "Walks",
    text: "A camera comes along for ridgelines, campuses, and city blocks.",
  },
];

const demoTechStacks = {
  programmingLanguages: [
    { name: "TypeScript", icon: ICON_NAMES.TYPESCRIPT },
    { name: "Python", icon: ICON_NAMES.PYTHON },
    { name: "Go", icon: ICON_NAMES.GOLANG },
  ],
  frameworks: [
    { name: "React", icon: ICON_NAMES.REACT },
    { name: "Next.js", icon: ICON_NAMES.NEXTJS },
    { name: "Docker", icon: ICON_NAMES.DOCKER },
  ],
};

const demoGithubUsername = "1chooo";

const demoPhotos = [
  {
    src: "/images/photo/usc.webp",
    alt: "A campus courtyard in warm light",
    title: "Courtyard",
  },
  {
    src: "/images/photo/half-dome.webp",
    alt: "A granite dome above a valley",
    title: "Granite dome",
  },
  {
    src: "/images/photo/vernal-falls.webp",
    alt: "A waterfall on a shaded trail",
    title: "Falls",
  },
  {
    src: "/images/photo/ucla.webp",
    alt: "A brick walkway between buildings",
    title: "Brick walk",
  },
  {
    src: "/images/photo/ucsd.webp",
    alt: "A library wall in late afternoon",
    title: "Library wall",
  },
];

const demoPosts: BlogPost[] = [
  {
    slug: "demo-notebook",
    title: "A notebook that stays out of the way",
    content: "",
    author: demoAuthor,
    thumbnail: "/images/profile.webp",
    category: "Notes",
    excerpt: "How a small writing layout keeps the title, the date, and one paragraph in view.",
    publishedAt: "Mar 12, 2024",
    readingTime: "4 min read",
    tags: ["notes"],
  },
  {
    slug: "demo-trails",
    title: "Trails, typed up after the fact",
    content: "",
    author: demoAuthor,
    thumbnail: "/images/profile.webp",
    category: "Notes",
    excerpt: "A second card so the list can show spacing, hover, and the date row.",
    publishedAt: "Jan 4, 2024",
    readingTime: "6 min read",
    tags: ["photos"],
  },
];

const demoWritingStacks: Record<string, string[]> = {
  frontend: ["typescript", "react", "nextjs"],
  tools: ["python", "docker"],
};

export {
  demoGithubUsername,
  demoLifestyles,
  demoPhotos,
  demoPosts,
  demoTechStacks,
  demoWritingStacks,
};
