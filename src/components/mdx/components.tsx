import React, { ComponentPropsWithoutRef } from "react";

import { MDXComponents } from "mdx/types";

import { Heading, type HeadingProps } from "@/components/mdx/heading";
import { TechBadge, TechBadgeGroup } from "@/components/mdx/tech-badge";
import { Separator } from "@/components/mdx/separator";
import { CodeBlock } from "@/components/mdx/code-block";
import { ListItem, type ListItemProps } from "@/components/mdx/list-item";
import {
  OrderedList,
  type OrderedListProps,
} from "@/components/mdx/ordered-list";
import {
  UnorderedList,
  type UnorderedListProps,
} from "@/components/mdx/unordered-list";
import { Anchor, type AnchorProps } from "@/components/mdx/anchor";
import { Callout } from "@/components/mdx/callout";
import { CaptionImage as Image, type ImageProps } from "@/components/mdx/image";
import { GitHubMap } from "@/components/mdx/github-map";
import { Blockquote, type BlockquoteProps } from "@/components/mdx/blockquote";
import { Paragraph, type ParagraphProps } from "@/components/mdx/paragraph";
import { RedditEmbed } from "@/components/reddit-embed";
import { Tweet } from "@/components/tweet";

import { cn } from "@/lib/utils";

import styles from "@/styles/md.module.css";

/**
 * Shared by compile-time MDX (`useMDXComponents`) and `next-mdx-remote`.
 * Highlighting stays in the remote compiler so this map does not load Shiki.
 */
const mdxComponents: MDXComponents = {
  h1: (props: HeadingProps<"h1">) => (
    <>
      <Heading as="h1" className={styles.h1} {...props} />
      <Separator />
    </>
  ),
  h2: (props: HeadingProps<"h2">) => (
    <>
      <Heading as="h2" className={styles.h2} {...props} />
      <Separator />
    </>
  ),
  h3: (props: HeadingProps<"h3">) => (
    <Heading as="h3" className={styles.h3} {...props} />
  ),
  h4: (props: HeadingProps<"h4">) => (
    <Heading as="h4" className={styles.h4} {...props} />
  ),
  h5: (props: HeadingProps<"h5">) => (
    <Heading as="h5" className={styles.h5} {...props} />
  ),
  h6: (props: HeadingProps<"h6">) => (
    <Heading as="h6" className={styles.h6} {...props} />
  ),
  p: (props: ParagraphProps) => <Paragraph {...props} />,
  code: (props: ComponentPropsWithoutRef<"code">) => (
    <code className={styles.code} {...props} />
  ),
  pre: ({ ...props }: React.HTMLAttributes<HTMLElement>) => (
    <CodeBlock className={cn(styles.pre)} {...props} />
  ),
  li: (props: ListItemProps) => <ListItem {...props} />,
  ol: (props: OrderedListProps) => <OrderedList {...props} />,
  ul: (props: UnorderedListProps) => <UnorderedList {...props} />,
  a: (props: AnchorProps) => <Anchor {...props} />,
  img: (props: ImageProps) => <Image {...props} />,
  blockquote: (props: BlockquoteProps) => <Blockquote {...props} />,
  TechBadge,
  TechBadgeGroup,
  Separator,
  Callout,
  Image,
  GitHubMap,
  RedditEmbed,
  Tweet,
};

export { mdxComponents };
