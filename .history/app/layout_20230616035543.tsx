
import "./globals.css";

import { Analytics } from "@vercel/analytics/react";
import cx from "classnames";
import { sfPro, inter } from "./fonts";
import Nav from "@/components/layout/nav";
import Footer from "@/components/layout/footer";
import { Suspense } from "react";



export const metadata = {
  title: "Ryan The Developer: Expert Web Developer & Animatior, E-commerce Specialist, and Digital Marketer",
  description:"Professional web developer specializing in custom WordPress and Shopify themes, WordPress plugins. Elevate your business with tailored e-commerce solutions and engaging designs.",

  twitter: {
    card: "summary_large_image",
    title: "Precedent - Building blocks for your Next.js project",
    description: "Professional web developer specializing in custom WordPress and Shopify themes, WordPress plugins. Elevate your business with tailored e-commerce solutions and engaging designs.",
    creator: "@ryan_the_dev",
  },
  metadataBase: new URL("https://the-webdeveloper.dev"),
  themeColor: "#FFF",
};



export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body className={cx(sfPro.variable, inter.variable)}>
        <div className="fixed h-screen w-full bg-gradient-to-br from-indigo-50 via-white to-cyan-100" />
        <Suspense fallback="...">
          {/* @ts-expect-error Server Component */}
          <Nav />
        </Suspense>
        <main className="flex min-h-screen w-full flex-col items-center justify-center py-32">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
