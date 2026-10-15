# Tailwind CSS v3 audit

Recorded before the v4 upgrade on branch `chore/tailwind-v4`. This file is the source of truth for how styles are built today. Refactors made during the upgrade are appended under [Refactors](#refactors).

## Stack

- Repo: `1chooo/portfolio` (`1chooo-com-web`)
- Next.js 16.2.10, React 19.2.7, TypeScript, webpack (`next dev --webpack`, `next build --webpack`)
- PostCSS via [postcss.config.cjs](../postcss.config.cjs). No Vite plugin, no SCSS, no styled-components.
- Styling mix: Tailwind utilities in TSX, one global stylesheet, plain global CSS imported from components, and CSS Modules.
- Package manager: pnpm. Lockfile: [pnpm-lock.yaml](../pnpm-lock.yaml).
- Deploy target: Vercel (`@vercel/analytics`). No `vercel.json` and no GitHub Actions workflow.
- Node: local v22.23.2. No `.nvmrc`, no `engines` field. Next.js 16 requires Node `^18.17 || ^20.3 || >=21`. Tailwind CSS v4 requires Node 20+.
- Browserslist in [package.json](../package.json): production `>0.2%, not dead, not op_mini all`.

## How Tailwind is wired

### Config

[tailwind.config.ts](../tailwind.config.ts)

- `content`: `./src/**/*.{js,ts,jsx,tsx,mdx}`
- No `prefix`, no `important`, no `safelist`
- No `darkMode` key. Tailwind v3 default is `media` (`prefers-color-scheme`). `<html>` does not get a `dark` class.
- Plugin: `tailwindcss-animate` only

Theme extensions:

- Screens: `custom-md` 580px, `custom-lg` 1250px. No class in `src` uses `custom-md:` or `custom-lg:`. The same widths are written as raw `@media` in global CSS. Keep the screens anyway.
- Colors: `jet`, `onyx`, `eerie-black-1`, `eerie-black-2`, `smoky-black`, `white-1`, `white-2`, `orange-yellow-crayola`, `orange-yellow-crayola-dark`, `vegas-gold`, `light-gray`, `light-gray-70`, `bittersweet-shimmer`
- Background images: `gradient-onyx`, `gradient-jet`, `gradient-yellow-1`, `gradient-yellow-2`, `border-gradient-onyx`, `text-gradient-yellow`. Utilities are `bg-gradient-onyx`, `bg-gradient-jet`, `bg-gradient-yellow-1`, `bg-gradient-yellow-2`, `bg-border-gradient-onyx`, `bg-text-gradient-yellow`.
- Border radius overrides: `lg: var(--radius)`, `md: calc(var(--radius) - 2px)`, `sm: calc(var(--radius) - 4px)`. `--radius` is never declared. `rounded-md`, `rounded-t-md`, `rounded-b-md`, and `rounded-lg` therefore compute to an invalid `border-radius` and the browser drops them. Bare `rounded` is still the default `0.25rem` because `DEFAULT` is not overridden. Do not invent `--radius`.
- Box shadows: keys `shadow-1` through `shadow-5`. The generated utilities are `shadow-shadow-1` through `shadow-shadow-5`. [src/components/about/coding-stats.tsx](../src/components/about/coding-stats.tsx) uses `shadow-shadow-2`. The same values also exist as raw `--shadow-1` … `--shadow-5` in `:root`.
- Animations and keyframes: `shiny-text`, `gradient`, `marquee`, `marquee-vertical`, `marquee-left`, `marquee-up`

### PostCSS

```js
plugins: { tailwindcss: {}, autoprefixer: {} }
```

`postcss-import` is not installed. `autoprefixer` is what prefixes non-Tailwind CSS such as `backdrop-filter` in [src/styles/nav-bar.css](../src/styles/nav-bar.css). Safari 16 and 17 still need `-webkit-backdrop-filter`.

### Global CSS

[src/app/globals.css](../src/app/globals.css) is imported from [src/app/(home)/layout.tsx](../src/app/(home)/layout.tsx).

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Everything after those directives is unlayered author CSS: a vcard reset, portfolio filter styles, and the contact form. The same tokens are duplicated as plain custom properties on `:root` (`--jet`, `--bg-gradient-onyx`, `--fs-1` … `--fs-8`, `--shadow-1` … `--shadow-5`, `--transition-1`). Responsive type and article width live in raw media queries at 580px, 768px, 1024px, and 1250px.

Other global stylesheets, imported from components, are plain CSS except the two `@apply` files below:

- [src/styles/nav-bar.css](../src/styles/nav-bar.css)
- [src/styles/layout/footer.css](../src/styles/layout/footer.css)
- [src/styles/testimonials.css](../src/styles/testimonials.css)
- [src/styles/about/coding-stats.css](../src/styles/about/coding-stats.css)
- [src/styles/contact/map-box.css](../src/styles/contact/map-box.css)
- [src/styles/tweet.css](../src/styles/tweet.css)
- [src/styles/markdown-styles.css](../src/styles/markdown-styles.css)

[src/styles/preview.css](../src/styles/preview.css) and [src/styles/blog/blog-text.css](../src/styles/blog/blog-text.css) are not imported. Blog text rules that actually apply live in [src/styles/blog.module.css](../src/styles/blog.module.css).

CSS Modules (no `@apply`): about, blog, project, resume, markdown elements, sidebar, icon box, gradient card, page title, skills bar, project links.

### `@apply` and `theme()`

| File | What it uses |
| --- | --- |
| [src/styles/tweet.css](../src/styles/tweet.css) | `theme("colors.gray.600")`, `theme("colors.gray.100")`, `theme("colors.gray.500")`, `theme("colors.white")`, `theme("colors.gray.400")`, plus `@apply` for link borders and `font-medium tracking-tight` |
| [src/styles/markdown-styles.css](../src/styles/markdown-styles.css) | `@apply` for code highlight colors, `rounded`, `shadow-none`, and `!text-*` |

No CSS Module uses `@apply`. No other file calls `theme()`.

### Class merging

[src/lib/utils.ts](../src/lib/utils.ts) is `twMerge(clsx(...))` with `tailwind-merge` ^3.2.0. `class-variance-authority` is a dependency and is not tied to a Tailwind major. There is no `components.json`, no `@tailwindcss/typography`, no `@tailwindcss/forms`, no Headless UI, no `eslint-plugin-tailwindcss`, and no `prettier-plugin-tailwindcss`.

### `tailwindcss-animate`

The plugin is registered. A search of `src` found no `animate-in`, `fade-in-*`, `slide-in-*`, `zoom-in-*`, or `accordion-*` classes. The animations that do render (`animate-shiny-text`, `animate-gradient`, `animate-marquee*`) come from the theme `extend`, not from this plugin.

### Dead utilities (leave them dead)

Defining these would paint something that does not paint today:

- `shadow-feature-card`, `dark:shadow-feature-card-dark`
- `bg-muted`, `bg-background`, `text-muted-foreground`, `dark:from-background`, `dark:bg-background`
- `duration-250` (not on the default duration scale)
- `x:` prefixed classes in [src/components/mdx/callout.tsx](../src/components/mdx/callout.tsx) (`x:flex`, `x:border`, …). There is no `prefix: "x"`.

## Coupled and fragile CSS

Tailwind v3 emits unlayered CSS. Rules in `globals.css` come after `@tailwind utilities`, so equal specificity goes to the later custom rule. v4 puts utilities in `@layer utilities`. Unlayered author CSS then beats utilities even when the utility is more specific.

The reset that will flip if it stays unlayered:

- `*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box }`
- `a { text-decoration: none }`
- `img, button, time { display: block }`
- `a, span { display: inline }`
- `button { font: inherit; background: none; border: none; text-align: left; cursor: pointer }`
- `input, textarea { display: block; width: 100%; background: none; font: inherit }`
- `article { background; border; border-radius; padding; box-shadow; animation: fade }`
- `main { margin; min-width }`

`a, span { display: inline }` is the sharp edge. Links and icons use `flex`, `inline-flex`, `block`, and `hidden`. Those utilities win today because a class beats an element. They lose if the element rule is unlayered and the utility is layered.

Class selectors (`.content-card`, `.form-input`, `.form-btn`, `.navbar`, CSS Modules) already win ties against utilities because they are authored later. Those stay unlayered so that relationship holds.

`article` is an element rule. [src/components/layout/mobile-footer.tsx](../src/components/layout/mobile-footer.tsx) puts a CSS Module class on `<article>`. Specificity still lets the module win over the element rule when both are unlayered. A Tailwind class on `<article>` would not, once the element rule is unlayered. The element rule belongs in `@layer base`.

Side stylesheets that depend on each other only through shared custom properties (`--jet`, `--shadow-*`, `--orange-yellow-crayola`), not through utility order.

## v3 behavior that v4 changes silently

Checked against current class usage.

### Renamed scales

- `rounded` (0.25rem, default) is used on tech badges, the copy button, markdown alerts, and `@apply` in markdown styles. The codemod renames this to `rounded-sm`. That rename is only safe if `--radius-sm` stays `0.25rem`. The config's `sm` override must not become `--radius-sm`. Park the unused override on `--radius-xs` (`calc(var(--radius) - 4px)`). Keep `--radius-md` and `--radius-lg` as the current `var(--radius)` expressions. Do not declare `--radius`.
- `rounded-md` / `rounded-t-md` / `rounded-b-md`: resume cards. `rounded-lg`: photo gallery and the marquee demo. Both are the invalid `var(--radius)` values today.
- `shadow-sm`: [src/app/(home)/(exp)/tag-selection-interaction/page.tsx](../src/app/(home)/(exp)/tag-selection-interaction/page.tsx). v4 shifts that step; the matching class is `shadow-xs`.
- `shadow-md`, `shadow-lg`, `shadow-xl`: values do not move. Used on the tag picker, see-more buttons, pagination, not-found, web vitals, and the marquee demo.
- `backdrop-blur-sm`: [src/components/magicui/animated-gradient-text.tsx](../src/components/magicui/animated-gradient-text.tsx). Matching v4 class is `backdrop-blur-xs`.
- `focus:outline-none`: [src/components/mdx/copy-button.tsx](../src/components/mdx/copy-button.tsx), with an explicit `ring-2`. No bare `ring`. v4 `outline-none` is `outline-style: none`; the old look is `outline-hidden`.
- No `blur-sm` other than the backdrop utility. No `rounded-sm` class in source (only the theme key).

### Defaults

- Bare `border` (width only) on the tag picker, markdown alerts, and the marquee demo. v3 color is `gray-200`. v4 color is `currentcolor`. Several other `border` classes also set `border-gray-700` or `border-neutral-700` and are safe.
- Placeholder color. v3 preflight uses `gray-400`. v4 uses 50% of `currentcolor`. `.form-input` sets text color to `--white-2` and does not set a placeholder color, so `/contact` would shift.
- Button cursor. v4 preflight sets `cursor: default`. The global `button { cursor: pointer }` already restores the v3 look, as long as it still wins over preflight inside `@layer base`.
- Default border color on the universal selector must be restored inside `@layer base` (`gray-200`), including `::before`, `::after`, `::backdrop`, and `::file-selector-button`.

### Variants, important, gradients

- Dark variant must stay a media query. Call sites include `dark:border-white/5`, `dark:bg-neutral-900`, `dark:hover:bg-neutral-800`, `hover:dark:text-neutral-400`, `dark:text-white`, `dark:via-white/80`, `dark:bg-zinc-800`. There is no `.dark` ancestor.
- Stacked variants are `dark:hover:` and `hover:dark:` on the same color utility. Both conditions are required, so the painted result matches either order. Still review the codemod's reorder.
- Important syntax to move to the end: `@apply !text-inherit`, `@apply !text-pink-300`, `@apply !text-yellow-300`, `@apply !text-purple-200`, and `![mask-composite:subtract]`.
- `bg-gradient-to-r`, `bg-gradient-to-l`, and `bg-gradient-to-t` become `bg-linear-to-*`. Do not rewrite `bg-gradient-onyx`, `bg-gradient-jet`, or `bg-gradient-yellow-*`.
- `via-50%` and arbitrary masks in the animated gradient text need a visual check. The upgrade tool's arbitrary-value syntax can mangle commas and underscores.
- `space-x-*` / `space-y-*` change their child selector in v4. Used in writings, alerts, resume cards, and the tech sidebar. Compare those regions in screenshots before rewriting them.
- No `container` utility. Classes named `container` are custom (modal, project links, tweet variables).

### Browser support

Tailwind v4's engine floor is Safari 16.4+, Chrome 111+, and Firefox 128+. The repo browserslist is wider (`>0.2%, not dead, not op_mini all`). v4 output uses cascade layers, `@property`, `color-mix`, and `oklab`, which do not work below that floor. Do not change `browserslist` and do not claim the old range still works.

`backdrop-filter` in the nav bar still needs a webkit prefix for Safari 16–17. Drop Autoprefixer only if the production CSS still contains `-webkit-backdrop-filter`.

## Dependencies that touch Tailwind

| Package | Today | v4 note |
| --- | --- | --- |
| `tailwindcss` | ^3.4.17 | Move to v4 |
| `autoprefixer` | ^10.4.21 | Remove only if prefixes survive |
| `postcss` | ^8.5.6 | Keep. v4's PostCSS plugin needs it |
| `tailwindcss-animate` | ^1.0.7 | Unused. v3 plugin API. Remove. Do not add `tw-animate-css` |
| `tailwind-merge` | ^3.2.0 | v3 line already targets v4 class names. Bump only if `shadow-xs`, `rounded-sm`, or `outline-hidden` fail to merge |
| `class-variance-authority` | ^0.7.1 | No upgrade |
| `@tailwindcss/typography`, `forms`, Headless UI, shadcn CLI, eslint/prettier Tailwind plugins | not installed | Nothing to migrate |

Build integration is `@tailwindcss/postcss`. Do not add `@tailwindcss/vite`. Keep `--webpack`.

Tests under `src/__tests__` do not import CSS. Vitest does not need a Tailwind plugin.

## Visual baseline routes

Captured with animations disabled in the test harness only, production `next start`, full page, widths 390, 768, and 1280, `colorScheme` light and dark.

- `/`
- `/resume`
- `/project`
- `/blog`
- `/contact`
- `/gallery`
- `/blog/who-is-chun-ho-hugo-lin`
- `/project/1chooo-com`
- `/tag-selection-interaction`

Masked as non-deterministic: `#github-calendar`, `canvas` (globe), `iframe` (giscus), and view-count text. CSS animations and transitions are turned off inside the test so both captures show the settled UI.

## Refactors

### Element reset moved into `@layer base`

`*`, `a`, `span`, `img`, `button`, `time`, `input`, `textarea`, `body`, `article`, `main`, `::selection`, and `:focus` in [src/app/globals.css](../src/app/globals.css) now live in `@layer base`, including the responsive `article` and `main` rules. In v3 those element selectors lost to utilities. Left unlayered, v4 would let them beat utilities, which breaks `flex` on links and `items-start` on the tag-selection `<main>`. Class rules (`.content-card`, `.form-*`, `.navbar`, CSS Modules) stay unlayered so they still win ties against utilities.

### v3 default border and placeholder colors

`@layer base` sets the universal border color back to `gray-200` and placeholder color back to `gray-400` at full opacity. v4 would otherwise use `currentcolor`, which shows up on bare `border` utilities and on `.form-input` placeholders.

### Dark variant kept on the OS setting

`@custom-variant dark (@media (prefers-color-scheme: dark))` is explicit. There is no `.dark` class on `<html>`.

### v3 color palette and sans font

[src/styles/tailwind-v3-colors.css](../src/styles/tailwind-v3-colors.css) overrides the v4 oklch palette with the v3 hex values. `--font-sans` is pinned to the v3 stack (`ui-sans-serif, system-ui, …`). v4's default stack starts with `-apple-system` and would redraw text.

### Radius overrides left on `sm` / `md` / `lg`

Tailwind v4.3's bare `rounded` utility is a static `0.25rem` and the upgrade tool did not rename it. `--radius-sm`, `--radius-md`, and `--radius-lg` stay on the old overrides. `rounded-md` and `rounded-lg` stay invalid because `--radius` is still undefined. Defining `--radius` would paint corners that do not exist today.

### `@reference` for stylesheets that `@apply`

[src/styles/tweet.css](../src/styles/tweet.css) and [src/styles/markdown-styles.css](../src/styles/markdown-styles.css) reference the global CSS so `@apply` can see utilities. `theme()` calls in the tweet file are now `var(--color-…)` because v4 removed `theme()`. Important utilities use the trailing `!` form.

### Nav blur prefix written out

[src/styles/nav-bar.css](../src/styles/nav-bar.css) sets `-webkit-backdrop-filter` next to `backdrop-filter`. Autoprefixer is gone. Safari 16 and 17 still need the prefix. The production CSS contains it.

### `tailwindcss-animate` removed

The plugin was registered and unused. Its v3 plugin API does not load in v4. No `tw-animate-css` replacement, because nothing calls those classes.

### Writing-card line height at the `sm` breakpoint

[src/components/about/post-cards.tsx](../src/components/about/post-cards.tsx) uses `leading-tight` and `sm:text-lg`. In v3 the responsive font-size rule comes later in the stylesheet and replaces the line height with `1.75rem`. In v4 `leading-tight` sets `--tw-leading`, and `text-lg` keeps that tighter value. `sm:leading-7` restores the v3 `1.75rem` line height from 640px up. Mobile, where `sm:text-lg` does not apply, was already the same.

### Dead utilities left dead

`shadow-feature-card`, `bg-muted`, `bg-background`, `text-muted-foreground`, and `duration-250` are still undefined.

## Browser support

The repo browserslist (`>0.2%, not dead, not op_mini all`) is wider than Tailwind v4 (Safari 16.4+, Chrome 111+, Firefox 128+). v4 output uses cascade layers, `@property`, `color-mix`, and `oklab`. Older browsers in that list will not render it. `browserslist` was not edited.

## Peer dependencies

`@react-spring/zdog` still wants React 16–18 while the app is on React 19. That warning predates this upgrade. The `tailwindcss-animate` peer warning is gone with the package.

## Visual diff

Playwright compared 54 screenshots locally (9 routes, widths 390 / 768 / 1280, light and dark). Result: 54 passed, 0 pixel differences (`maxDiffPixelRatio: 0`). The screenshot files are not committed.

Masked as non-deterministic: GitHub contribution calendars, globe canvases, iframes, and view counts. CSS animation and transition durations are forced to 0 inside the test so both captures show the settled UI.

## Lint

`pnpm lint` runs `next lint`. Next.js 16.2 no longer has that command, so the script fails before this upgrade as well. Typecheck, Vitest, and `next build --webpack` are the checks that actually run.
