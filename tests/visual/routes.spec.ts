import { expect, test, type Page } from "@playwright/test";

const routes = [
  { name: "home", path: "/" },
  { name: "resume", path: "/resume" },
  { name: "project", path: "/project" },
  { name: "blog", path: "/blog" },
  { name: "contact", path: "/contact" },
  { name: "gallery", path: "/gallery" },
  { name: "blog-post", path: "/blog/who-is-chun-ho-hugo-lin" },
  { name: "project-post", path: "/project/1chooo-com" },
  { name: "tag-selection", path: "/tag-selection-interaction" },
];

const viewports = [
  { name: "mobile", width: 390, height: 844 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1280, height: 800 },
];

const colorSchemes = ["light", "dark"] as const;

async function revealInView(page: Page) {
  await page.evaluate(async () => {
    const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
    const height = () =>
      Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    const step = Math.max(Math.floor(window.innerHeight * 0.75), 320);

    for (let y = 0; y < height(); y += step) {
      window.scrollTo(0, y);
      await sleep(40);
    }

    window.scrollTo(0, height());
    await sleep(40);
    window.scrollTo(0, 0);
  });
}

async function settle(page: Page) {
  await page
    .waitForLoadState("networkidle", { timeout: 10_000 })
    .catch(() => undefined);
  await page.evaluate(() => document.fonts.ready);
  await page.addStyleTag({
    content: `
      *, *::before, *::after {
        animation-duration: 0s !important;
        animation-delay: 0s !important;
        transition-duration: 0s !important;
        transition-delay: 0s !important;
        caret-color: transparent !important;
      }
    `,
  });
  await revealInView(page);
  await page.waitForTimeout(500);
}

for (const colorScheme of colorSchemes) {
  for (const viewport of viewports) {
    for (const route of routes) {
      test(`${route.name} ${viewport.name} ${colorScheme}`, async ({ page }) => {
        await page.emulateMedia({
          colorScheme,
          reducedMotion: "reduce",
        });
        await page.setViewportSize({
          width: viewport.width,
          height: viewport.height,
        });
        await page.goto(route.path, { waitUntil: "domcontentloaded" });
        await settle(page);

        await expect(page).toHaveScreenshot(
          `${route.name}-${viewport.name}-${colorScheme}.png`,
          {
            fullPage: true,
            mask: [
              page.locator("#github-calendar"),
              page.locator("canvas"),
              page.locator("iframe"),
              page.getByText(/views/i),
            ],
          },
        );
      });
    }
  }
}
