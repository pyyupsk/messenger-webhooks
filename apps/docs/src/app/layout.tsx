import "./global.css";

import { RootProvider } from "fumadocs-ui/provider/next";
import { Glory, Source_Code_Pro } from "next/font/google";

const sans = Glory({ subsets: ["latin"], variable: "--font-sans" });
const mono = Source_Code_Pro({ subsets: ["latin"], variable: "--font-mono" });

export default function Layout({ children }: LayoutProps<"/">) {
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
