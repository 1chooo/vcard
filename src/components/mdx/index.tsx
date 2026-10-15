import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";

import rehypePrettyCode, {
  Options as rehypePrettyCodeOptions,
} from "rehype-pretty-code";
import remarkGfm from "remark-gfm";

import { mdxComponents } from "@/components/mdx/components";

/**
 * @see https://github.com/leerob/next-mdx-blog/blob/main/mdx-components.tsx for ComponentPropsWithoutRef
 * @see https://github.com/daniellp99/portfolio/blob/fedd76610816765e17826f7056fbc661d3723bb9/src/components/MdxRemote.tsx#L4
 * @see https://github.com/aayushchugh/ayushchugh.com/blob/3c425a7ef2deb76afb87c612f557242c3f7bcb07/app/components/mdx.tsx#L4
 * @see https://github.com/tszhong0411/nelsonlai.me/blob/main/apps/web/src/components/mdx/mdx.tsx
 */

let options: rehypePrettyCodeOptions;
options = {
  theme: "github-dark",
};

function Mdx(props: MDXRemoteProps) {
  return (
    <MDXRemote
      {...props}
      components={{ ...mdxComponents, ...props.components }}
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
