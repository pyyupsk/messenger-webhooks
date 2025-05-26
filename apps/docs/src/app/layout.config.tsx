import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

import Image from 'next/image';

import LogoIcon from '@/app/favicon.ico';

/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export const baseOptions: BaseLayoutProps = {
    nav: {
        title: (
            <div className="flex items-center gap-2">
                <Image src={LogoIcon} alt="Messenger Webhooks" width={24} height={24} />
                <span className="font-semibold">Messenger Webhooks</span>
            </div>
        ),
    },
    githubUrl: 'https://github.com/pyyupsk/messenger-webhooks',
};
