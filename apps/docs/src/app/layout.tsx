import { RootProvider } from "fumadocs-ui/provider";
import { Glory, Source_Code_Pro } from "next/font/google";
import type { ReactNode } from "react";

import "./global.css";

const sans = Glory({ subsets: ["latin"], variable: "--font-sans" });
const mono = Source_Code_Pro({ subsets: ["latin"], variable: "--font-mono" });

export default function Layout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
