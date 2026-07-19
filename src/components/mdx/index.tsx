import React, { ComponentPropsWithoutRef } from "react";

import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";
import { MDXComponents } from "mdx/types";

import rehypePrettyCode, {
  Options as rehypePrettyCodeOptions,
} from "rehype-pretty-code";
import remarkGfm from "remark-gfm";

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
 * @see https://github.com/leerob/next-mdx-blog/blob/main/mdx-components.tsx for ComponentPropsWithoutRef
 * @see https://github.com/daniellp99/portfolio/blob/fedd76610816765e17826f7056fbc661d3723bb9/src/components/MdxRemote.tsx#L4
 * @see https://github.com/aayushchugh/ayushchugh.com/blob/3c425a7ef2deb76afb87c612f557242c3f7bcb07/app/components/mdx.tsx#L4
 * @see https://github.com/tszhong0411/nelsonlai.me/blob/main/apps/web/src/components/mdx/mdx.tsx
 */
const components: MDXComponents = {
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

let options: rehypePrettyCodeOptions;
options = {
  theme: "github-dark",
};

function Mdx(props: MDXRemoteProps) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...props.components }}
      options={{
        // Author-controlled MDX uses JSX expression props (e.g. badges={["react"]}).
        // next-mdx-remote v6 defaults blockJS: true, which strips those expressions.
        blockJS: false,
        blockDangerousJS: true,
        mdxOptions: {
          rehypePlugins: [[rehypePrettyCode, options]],
          remarkPlugins: [remarkGfm],
        },
      }}
    />
  );
}

export { Mdx };
export default Mdx;
