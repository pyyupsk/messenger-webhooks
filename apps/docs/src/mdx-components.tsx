import { File, Files, Folder } from "fumadocs-ui/components/files";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import defaultComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultComponents,
    Tab,
    Tabs,
    File,
    Folder,
    Files,
    ...components,
  };
}
