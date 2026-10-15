# Dev compile

Recorded 2026-10-15 on this machine, Next.js 16.2.10. Baseline is `dc979b39` (`next dev --webpack`). After is current `main` (`next dev`, Turbopack, Rust MDX).

The dev process was never the wait. Both servers print Ready in about 250ms. The wait is the first compilation of `/`.

| Route | Webpack, first hit | Turbopack, first hit | Less time |
| --- | --- | --- | --- |
| `/` | 16.1s (compiler 13.3s, application 2.8s) | 3.0s (compiler 1.2s, application 1.9s) | 81% |
| `/terms` | 2.7s, after `/` had compiled | 1.2s, same situation | 56% |
| `/code-of-conduct` | 1.2s, after `/` had compiled | 0.8s, same situation | 37% |

A second Turbopack sample of `/` was 3.6s, so the first-page gain sits around 80%. A repeat of `/` is 275ms on Webpack and about 130ms on Turbopack. That repeat is the smaller win.

## Root cause

Two costs stack. The compiler is almost all of the 16 seconds.

**The dev script forced Webpack.** `package.json` ran `next dev --webpack` and `next build --webpack`. Next 16 compiles dev with Turbopack unless the script opts out. On `/`, Webpack spent 13.3s in the compiler. Turbopack spent 1.2s, which is 91% less compiler time. Tailwind v4 through `@tailwindcss/postcss` does not require Webpack. `www` already runs that plugin on Turbopack.

**Three prose pages compiled Markdown on the request.** `/`, `/terms`, and `/code-of-conduct` were React pages that read an `.mdx` file and passed it through `next-mdx-remote` and Shiki (`rehype-pretty-code`). That work sits in application time: 2.8s on the first Webpack `/`, and 270ms on a repeat. Those routes are compiled modules now:

- Home imports [src/app/(home)/_about/about.mdx](../src/app/(home)/_about/about.mdx). The selected-projects and writings sections stay in [src/app/(home)/page.tsx](../src/app/(home)/page.tsx).
- Terms and the code of conduct are `page.mdx`.

`experimental.mdxRs` uses the Rust compiler with `mdxType: 'gfm'`. `turbopackFileSystemCacheForDev` keeps the dev cache across restarts. The component map lives in [src/components/mdx/components.tsx](../src/components/mdx/components.tsx) and is shared by compile-time MDX and `next-mdx-remote`. Shiki stays on the remote compiler only.

Blog, project, and resume bodies still go through `next-mdx-remote`. Their YAML frontmatter feeds the indexes, sitemap, and RSS. Opening one of those in dev still pays Shiki once.

`generateStaticParams` on those slug pages already returns `{ slug }`. A wrong params shape was the production MDX bug on `www`. It is not what made this dev server slow. Dev still renders on demand.
