"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { X } from "lucide-react";
import PageTitle from "@/components/page-title";

type Tag = {
  id: string;
  label: string;
};

export default function App() {
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
    <article>
      <PageTitle title="Tag Selection Interaction" />

      <main className="relative w-full min-h-screen flex items-start md:items-center justify-center px-4 py-10">
        <div className="p-6 max-w-lg w-full flex flex-col">
          <motion.h2 layout className="text-xl font-semibold text-white-1">
            TAGS
          </motion.h2>
          <motion.div
            className="w-full flex items-center justify-start gap-1.5 bg-white border h-14 mt-2 mb-3 overflow-x-auto p-1.5 tag-no-scrollbar"
            style={{
              borderRadius: 16,
            }}
            ref={selectedsContainerRef}
            layout
          >
            {selecteds.map((tag) => (
              <motion.div
                key={tag.id}
                className="flex items-center gap-1 pl-3 pr-1 py-1 bg-white shadow-md border h-full shrink-0"
                style={{
                  borderRadius: 14,
                }}
                layoutId={`tag-${tag.id}`}
              >
                <motion.span
                  layoutId={`tag-${tag.id}-label`}
                  className="text-gray-700 font-medium"
                >
                  {tag.label}
                </motion.span>
                <button
                  onClick={() => removeSelectedTag(tag.id)}
                  className="p-1 rounded-full"
                >
                  <X className="size-5 text-gray-500" />
                </button>
              </motion.div>
            ))}
          </motion.div>
          {TAGS.length > selecteds.length && (
            <motion.div
              className="bg-white shadow-xs p-2 border w-full"
              style={{
                borderRadius: 16,
              }}
              layout
            >
              <motion.div className="flex flex-wrap gap-2">
                {TAGS.filter(
                  (tag) =>
                    !selecteds.some((selected) => selected.id === tag.id),
                ).map((tag) => (
                  <motion.button
                    key={tag.id}
                    layoutId={`tag-${tag.id}`}
                    className="flex items-center gap-1 px-4 py-2.5 bg-gray-100/60 rounded-full shrink-0"
                    onClick={() => addSelectedTag(tag)}
                    style={{
                      borderRadius: 14,
                    }}
                  >
                    <motion.span
                      layoutId={`tag-${tag.id}-label`}
                      className="text-gray-700 font-medium"
                    >
                      {tag.label}
                    </motion.span>
                  </motion.button>
                ))}
              </motion.div>
            </motion.div>
          )}
        </div>
      </main>
    </article>
  );
}
