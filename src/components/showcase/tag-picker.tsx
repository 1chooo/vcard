"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { X } from "lucide-react";

type Tag = {
  id: string;
  label: string;
};

const TAGS: Tag[] = [
  { id: "docker", label: "Docker" },
  { id: "kubernetes", label: "Kubernetes" },
  { id: "aws", label: "AWS" },
  { id: "graphql", label: "GraphQL" },
  { id: "mongodb", label: "MongoDB" },
  { id: "postgresql", label: "PostgreSQL" },
  { id: "redis", label: "Redis" },
  { id: "git", label: "Git" },
  { id: "webpack", label: "Webpack" },
  { id: "vite", label: "Vite" },
  { id: "cypress", label: "Cypress" },
  { id: "storybook", label: "Storybook" },
  { id: "tailwind", label: "Tailwind" },
  { id: "prisma", label: "Prisma" },
  { id: "nginx", label: "Nginx" },
];

function TagPicker() {
  const [selecteds, setSelecteds] = useState<Tag[]>([]);
  const selectedsContainerRef = useRef<HTMLDivElement>(null);

  const removeSelectedTag = (id: string) => {
    setSelecteds((prev) => prev.filter((tag) => tag.id !== id));
  };

  const addSelectedTag = (tag: Tag) => {
    setSelecteds((prev) => [...prev, tag]);
  };

  useEffect(() => {
    if (selectedsContainerRef.current) {
      selectedsContainerRef.current.scrollTo({
        left: selectedsContainerRef.current.scrollWidth,
        behavior: "smooth",
      });
    }
  }, [selecteds]);

  return (
    <div className="flex w-full max-w-lg flex-col">
      <motion.h3 layout className="text-sm font-semibold tracking-wide text-white-2">
        TAGS
      </motion.h3>
      <motion.div
        className="tag-no-scrollbar mt-2 mb-3 flex h-14 w-full items-center justify-start gap-1.5 overflow-x-auto rounded-2xl border border-jet bg-onyx p-1.5"
        ref={selectedsContainerRef}
        layout
      >
        {selecteds.map((tag) => (
          <motion.div
            key={tag.id}
            className="flex h-full shrink-0 items-center gap-1 rounded-xl border border-jet bg-eerie-black-2 py-1 pr-1 pl-3"
            layoutId={`tag-${tag.id}`}
          >
            <motion.span
              layoutId={`tag-${tag.id}-label`}
              className="font-medium text-white-2"
            >
              {tag.label}
            </motion.span>
            <button
              type="button"
              onClick={() => removeSelectedTag(tag.id)}
              className="rounded-full p-1"
              aria-label={`Remove ${tag.label}`}
            >
              <X className="size-4 text-light-gray" />
            </button>
          </motion.div>
        ))}
      </motion.div>
      {TAGS.length > selecteds.length && (
        <motion.div
          className="w-full rounded-2xl border border-jet bg-onyx p-2"
          layout
        >
          <motion.div className="flex flex-wrap gap-2">
            {TAGS.filter(
              (tag) => !selecteds.some((selected) => selected.id === tag.id),
            ).map((tag) => (
              <motion.button
                key={tag.id}
                type="button"
                layoutId={`tag-${tag.id}`}
                className="flex shrink-0 items-center gap-1 rounded-full border border-jet bg-eerie-black-2 px-4 py-2.5"
                onClick={() => addSelectedTag(tag)}
              >
                <motion.span
                  layoutId={`tag-${tag.id}-label`}
                  className="font-medium text-light-gray"
                >
                  {tag.label}
                </motion.span>
              </motion.button>
            ))}
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

export { TagPicker };
export default TagPicker;
