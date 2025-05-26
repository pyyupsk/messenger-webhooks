import { getGithubLastEdit } from 'fumadocs-core/server';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import { DocsPage, DocsBody, DocsDescription, DocsTitle } from 'fumadocs-ui/page';
import { notFound } from 'next/navigation';

import { source } from '@/lib/source';
import { getMDXComponents } from '@/mdx-components';

export default async function Page(props: Readonly<{ params: Promise<{ slug?: string[] }> }>) {
    const { slug = [] } = await props.params;
    const page = source.getPage(slug);
    if (!page) notFound();

    const MDXContent = page.data.body;

    const github = {
        owner: 'pyyupsk',
        repo: 'messenger-webhooks',
        sha: 'main',
        path: `apps/docs/content/docs/${page.file.path}`,
    };

    const lastUpdate = await getGithubLastEdit(github);

    return (
        <DocsPage
            toc={page.data.toc}
            full={page.data.full}
            lastUpdate={lastUpdate ?? undefined}
            editOnGithub={github}
        >
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

export async function generateMetadata(props: { params: Promise<{ slug?: string[] }> }) {
    const { slug = [] } = await props.params;
    const page = source.getPage(slug);
    if (!page) notFound();

    const image = ['/docs-og', ...slug, 'image.png'].join('/');

    return {
        title: page.data.title,
        description: page.data.description,
        metadataBase: new URL('https://messenger-webhooks.vercel.app'),
        openGraph: {
            images: image,
        },
        twitter: {
            images: image,
            card: 'summary_large_image',
        },
    };
}
