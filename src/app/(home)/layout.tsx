import Script from "next/script";
import type { Metadata, Viewport } from "next";
import { Roboto, Roboto_Mono } from "next/font/google";
import { ViewTransitions } from "next-view-transitions";

import { NavBar } from "@/components/layout/nav-bar";
import Sidebar from "@/components/layout/sidebar";
import MobileFooter from "@/components/layout/mobile-footer";
import Hello from "@/components/hello";
import { ProgressBar } from "@/components/progress-bar";
import { GoogleAnalytic } from "@/components/analytics/google";
import { UmamiAnalytic } from "@/components/analytics/umami";
import { Analytics as VercelAnalytic } from "@vercel/analytics/next";

import config from "@/config";

import type { JsonLdHtml } from "@/schema";

import "@/app/globals.css";

const roboto = Roboto({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-roboto",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
  display: "swap",
  preload: false,
});

const {
  about,
  avatar,
  status,
  jsonLdPerson,
  homeMetaData,
  contacts,
  analytics,
} = config;

const { firstName, lastName, middleName, preferredName } = about;
const { googleAnalyticId, googleTagManagerId, umamiWebsiteId, umamiUrl } =
  analytics;

export const metadata: Metadata = homeMetaData;

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#121212" },
    { media: "(prefers-color-scheme: dark)", color: "#121212" },
  ],
};

const addJsonLd = (): JsonLdHtml => {
  return {
    __html: JSON.stringify(jsonLdPerson, null, 2),
  };
};

function HomeLayout({ children }: { readonly children: React.ReactNode }) {
  return (
    <html lang="en" className={`${roboto.variable} ${robotoMono.variable}`}>
      <body>
        <ViewTransitions>
          <ProgressBar className="fixed top-0 h-1 bg-yellow-500">
            <Hello />
            <main>
              <Sidebar
                avatar={avatar}
                firstName={firstName}
                lastName={lastName}
                middleName={middleName}
                preferredName={preferredName}
                status={status}
                contacts={contacts}
              />
              <div className="main-content">
                <NavBar />
                {children}
              </div>
            </main>

            <MobileFooter
              avatar={avatar}
              firstName={firstName}
              lastName={lastName}
              middleName={middleName}
              preferredName={preferredName}
              status={status}
              contacts={contacts}
            />
          </ProgressBar>
          <Script
            id="application/ld+json"
            type="application/ld+json"
            dangerouslySetInnerHTML={addJsonLd()}
            key="1chooo-website-jsonld"
          />
          <VercelAnalytic />
          <UmamiAnalytic umamiWebsiteId={umamiWebsiteId} umamiUrl={umamiUrl} />
          <GoogleAnalytic
            googleAnalyticId={googleAnalyticId}
            googleTagManagerId={googleTagManagerId}
          />
        </ViewTransitions>
      </body>
    </html>
  );
}

export default HomeLayout;
