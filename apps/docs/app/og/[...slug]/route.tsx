import { source } from '@/app/source';
import { generateOGImage } from 'fumadocs-ui/og';
import { notFound } from 'next/navigation';
import { type NextRequest } from 'next/server';

export function GET(_: NextRequest, { params }: { params: { slug: string[] } }) {
    const page = source.getPage(params.slug.slice(0, -1));
    if (!page) notFound();

    return generateOGImage({
        title: page.data.title,
        description: page.data.description,
        site: <div style={{ fontSize: 50 }}>@pyyupsk/messenger-webhooks</div>,
        primaryTextColor: 'rgb(255, 255, 255)',
        primaryColor: 'rgb(151, 53, 237)',
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={120}
                clip-rule="evenodd"
                fill-rule="evenodd"
                stroke-linejoin="round"
                stroke-miterlimit="2"
                viewBox="0 0 560 400"
            >
                <radialGradient
                    id="a"
                    cx="0"
                    cy="0"
                    gradientTransform="matrix(294.166 0 0 -294.165 196.982 333.506)"
                    gradientUnits="userSpaceOnUse"
                    r="1"
                >
                    <stop offset="0" stop-color="#09f" />
                    <stop offset=".61" stop-color="#a033ff" />
                    <stop offset=".93" stop-color="#ff5280" />
                    <stop offset="1" stop-color="#ff7061" />
                </radialGradient>
                <g fill-rule="nonzero">
                    <path
                        d="m280 65c-76.032 0-134.988 55.716-134.988 130.938 0 39.349 16.131 73.366 42.386 96.854 2.194 1.958 3.544 4.725 3.611 7.695l.743 24.027c.236 7.661 8.133 12.656 15.152 9.551l26.795-11.812c2.261-1.012 4.826-1.181 7.222-.54 12.318 3.375 25.411 5.198 39.079 5.198 76.032 0 134.988-55.717 134.988-130.939s-58.956-130.972-134.988-130.972z"
                        fill="url(#a)"
                    />
                    <path
                        d="m198.94 234.241 39.652-62.904c6.311-10.023 19.81-12.487 29.293-5.4l31.553 23.657c2.903 2.16 6.885 2.16 9.753-.034l42.589-32.329c5.669-4.32 13.094 2.497 9.314 8.538l-39.686 62.87c-6.311 10.023-19.81 12.487-29.293 5.4l-31.553-23.657c-2.903-2.16-6.885-2.16-9.753.034l-42.589 32.329c-5.669 4.32-13.094-2.463-9.28-8.504z"
                        fill="#fff"
                    />
                </g>
            </svg>
        ),
    });
}

export function generateStaticParams() {
    return source.generateParams().map((params) => ({
        ...params,
        slug: [...params.slug, 'og.png'],
    }));
}
