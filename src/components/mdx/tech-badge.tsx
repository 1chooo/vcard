import React from "react";
import {
  ClickableTechBadges,
  NonClickableTechBadges,
  type TechBadgeKey,
} from "@/lib/tech-badge/utils";

interface TechBadgeProps {
  badge: TechBadgeKey;
  clickable?: boolean;
  className?: string;
}

/**
 * TechBadge component for MDX usage
 * Usage in MDX:
 * <TechBadge badge="typescript" />
 * <TechBadge badge="react" clickable={false} />
 */
export function TechBadge({
  badge,
  clickable = true,
  className,
}: TechBadgeProps) {
  const badges = clickable ? ClickableTechBadges : NonClickableTechBadges;
  const badgeComponent = badges[badge];

  if (!badgeComponent) {
    console.warn(`Tech badge "${badge}" not found`);
    return null;
  }

  return <span className={className}>{badgeComponent}</span>;
}

interface TechBadgeGroupProps {
  badges: TechBadgeKey[];
  clickable?: boolean;
  className?: string;
}

/**
 * TechBadgeGroup component for MDX usage
 * Usage in MDX:
 * <TechBadgeGroup badges={["typescript", "react", "nextjs"]} />
 * <TechBadgeGroup badges={["python", "django"]} clickable={false} />
 */
export function TechBadgeGroup({
  badges = [],
  clickable = true,
  className = "flex flex-wrap gap-2",
}: TechBadgeGroupProps) {
  const badgeCollection = clickable
    ? ClickableTechBadges
    : NonClickableTechBadges;

  return (
    <div className={className}>
      {badges.map((badgeKey) => (
        <span key={badgeKey}>{badgeCollection[badgeKey]}</span>
      ))}
    </div>
  );
}

export default TechBadge;
