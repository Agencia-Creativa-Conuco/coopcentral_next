import "./globals.scss";

import { Roboto_Slab as FontSans } from "next/font/google";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Analytics } from "@vercel/analytics/react";

import { siteConfig } from "@/site.config";
import { cn, getURL } from "@/lib/utils";

import type { Metadata } from "next";
import Header from "@/components/header";
import { getMenu, getSettings } from "@/lib/wordpress";
import CustomProvider from "@/components/theme/custom-provider";
import Modal from "@/components/modal";
import Footer from "@/components/footer";

const font = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Coopcentral",
  description: "Solución a tus iniciativas de vida",
  openGraph: {
    title: "Coopcentral",
    description: "Solución a tus iniciativas de vida",
    url: `https://www.coopcentral.do`,
    siteName: "Coopcentral",
    images: [
      {
        url: "/default-og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "es_DO",
    type: "website",
  },
  metadataBase: new URL(siteConfig.site_domain),
  alternates: {
    canonical: "/",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSettings();
  const menuHeader = await getMenu("main");
  const menuFooter = await getMenu("footer");

  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={`${cn(
          "min-h-screen font-sans antialiased",
          font.variable
        )} body-post`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <CustomProvider>
            <Header settings={settings} menu={menuHeader} />
            {children}
            <Footer menu={menuFooter} settings={settings} />
            <Modal />
          </CustomProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
