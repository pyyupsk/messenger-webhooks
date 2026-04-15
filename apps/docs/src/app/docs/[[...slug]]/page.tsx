import { getGithubLastEdit } from "fumadocs-core/content/github";
import { createRelativeLink } from "fumadocs-ui/mdx";
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from "fumadocs-ui/page";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LLMCopyButton, ViewOptions } from "@/components/page-actions";
import { getPageImage, source } from "@/lib/source";
import { getMDXComponents } from "@/mdx-components";

type Props = { params: Promise<{ slug?: string[] }> };

export default async function Page(props: Props) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDXContent = page.data.body;

  const github = {
    owner: "pyyupsk",
    repo: "messenger-webhooks",
    sha: "main",
    path: `apps/docs/content/docs/${page.path}`,
  };

  const lastUpdate = await getGithubLastEdit(github);

  return (
    <DocsPage
      toc={page.data.toc}
      full={page.data.full}
      lastUpdate={lastUpdate ?? undefined}
      editOnGithub={github}
    >
      <div className="flex flex-row items-center gap-2 border-b pt-2 pb-6">
        <LLMCopyButton markdownUrl={`${page.url}.mdx`} />
        <ViewOptions
          markdownUrl={`${page.url}.mdx`}
          githubUrl={`https://github.com/${github.owner}/${github.repo}/blob/${github.sha}/${github.path}`}
        />
      </div>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDXContent
          components={getMDXComponents({
            // this allows you to link to other pages with relative file paths
            a: createRelativeLink(source, page),
          })}
        />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(
  props: Props,
): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: `${page.data.title} | @pyyupsk/messenger-webhooks`,
    description: page.data.description,
    openGraph: {
      images: getPageImage(page).url,
    },
  };
}
