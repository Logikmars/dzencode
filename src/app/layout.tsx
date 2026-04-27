import type { Metadata, Viewport } from "next";
import "@/styles/_vars.scss";
import "@/styles/fonts.scss";
import "@/styles/null.scss";

import TopMenu from "@/widgets/TopMenu/TopMenu";
import NavigationMenu from "@/widgets/NavigationMenu/NavigationMenu";
import PageTransition from "@/shared/PageTransition/PageTransition";
import AppProviders from "@/app/providers";

const appName = "Inventory";
const appDescription =
  "Inventory management dashboard for receipts, product groups, and warehouse operations.";
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: appName,
    template: `%s | ${appName}`,
  },
  description: appDescription,
  applicationName: appName,
  authors: [{ name: "Inventory Team" }],
  creator: "Inventory Team",
  publisher: "Inventory Team",
  keywords: [
    "inventory",
    "inventory management",
    "warehouse dashboard",
    "receipts",
    "products",
  ],
  alternates: {
    canonical: "/",
    languages: {
      "ru-RU": "/",
      "uk-UA": "/",
      "en-US": "/",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: appName,
    description: appDescription,
    siteName: appName,
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: appName,
    description: appDescription,
  },
  category: "technology",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AppProviders>
          <TopMenu />
          <div className="layout">
            <NavigationMenu />
            <PageTransition>{children}</PageTransition>
          </div>
        </AppProviders>
      </body>
    </html>
  );
}
