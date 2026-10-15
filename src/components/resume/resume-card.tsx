"use client";

import React from "react";
import Image from "next/image";
import { BriefcaseIcon } from "lucide-react";
import { getIcon } from "@/components/icons";
import { ViewTransitionsProgressBarLink } from "@/components/progress-bar";

import { cn } from "@/lib/utils";


import type { ResumePost } from "@/types/resume";

import styles from "@/styles/resume/resume-card.module.css";

interface ResumeCardProps {
  resumePost: ResumePost;
}

function ResumeCard({ resumePost }: ResumeCardProps) {
  const { institution, institutionImage, title, tags, slug } = resumePost;

  return (
    <ViewTransitionsProgressBarLink href={`/resume/${slug}`}>
      <div className="hover:scale-105 duration-300">
        <div className={cn(styles["resume-card"])}>
          <div className="flex flex-row items-center gap-4 p-6 pb-4 cursor-pointer transition-colors rounded-t-md">
            <div className="h-10 w-10 shrink-0 overflow-hidden rounded-md">
              <Image
                src={institutionImage || "/favicon.ico"}
                alt={institution}
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "/favicon.ico?height=40&width=40";
                  e.currentTarget.onerror = null;
                }}
                width={40}
                height={40}
              />
            </div>
            <div className="min-w-0 flex-1 space-y-1">
              <div className="font-semibold text-white-1 truncate">
                {institution}
              </div>
              <div className="text-sm text-light-gray truncate">{title}</div>
            </div>
          </div>

          <div className="px-6 pb-2 cursor-pointer transition-colors rounded-b-md">
            <div className="mb-4 flex flex-wrap gap-2">
              {tags.map((tag, index) => {
                const TagIcon = getIcon(tag.icon) || BriefcaseIcon;
                return (
                  <span
                    key={`${tag.key}-${index}`}
                    className="inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium text-orange-yellow-crayola border-gray-700"
                  >
                    <TagIcon className="h-3 w-3" />
                    {tag.value}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </ViewTransitionsProgressBarLink>
  );
}

export default ResumeCard;
export { ResumeCard };
