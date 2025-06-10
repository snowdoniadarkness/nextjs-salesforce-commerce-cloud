import { CartProvider } from "components/cart/cart-context";
import NavbarWrapper from "components/layout/navbar-wrapper";
import LivePreview from "components/live-preview";
import { WelcomeToast } from "components/welcome-toast";
import { GeistSans } from "geist/font/sans";
import { getCart } from "lib/sfcc";
import { baseUrl } from "lib/utils";
import { Metadata } from 'next';
import Script from "next/script";
import { ReactNode } from "react";
import { Toaster } from "sonner";
import "./globals.css";

const { SITE_NAME } = process.env;

export const metadata: Metadata = {
  description:
    "High-performance ecommerce store built with Next.js, Vercel, and Salesforce Commerce Cloud.",
  openGraph: {
    type: "website",
  },
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE_NAME!,
    template: `%s | ${SITE_NAME}`,
  },
  robots: {
    follow: true,
    index: true,
  },
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  // Don't await the fetch, pass the Promise to the context provider
  const cart = getCart();

  return (
    <html lang="en" className={GeistSans.variable}>
      <head>
        <Script
          id="sfcc-live-preview"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dw = window.dw || {};
              window.dw.sfcc = window.dw.sfcc || {};
              window.dw.sfcc.livePreview = {
                enabled: true,
                host: window.location.hostname,
                port: window.location.port || (window.location.protocol === 'https:' ? '443' : '80'),
                path: window.location.pathname,
                protocol: window.location.protocol,
                query: window.location.search
              };
            `
          }}
        />
      </head>
      <body className="bg-white text-black selection:bg-teal-300 dark:bg-neutral-900 dark:text-white dark:selection:bg-pink-500 dark:selection:text-white">
        <CartProvider cartPromise={cart}>
          <LivePreview />
          <NavbarWrapper />
          <main>
            {children}
            <Toaster closeButton />
            <WelcomeToast />
          </main>
        </CartProvider>
      </body>
    </html>
  );
}
