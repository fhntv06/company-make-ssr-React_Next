'use client';

import { useRouter } from 'next/navigation';
import { PropsWithChildren, useContext } from 'react';
import clsx from 'clsx';
import NavigationContext from '@/shared/lib/context/navigation-context';
import { Icon } from '..';

interface Props extends PropsWithChildren {
  title: string;
  withBackLink?: boolean;
  className?: string;
  titleClassName?: string;
}

export default function PageHeader({ title, withBackLink = false, className, titleClassName, children }: Props) {
  const router = useRouter();
  const { applyUrlChangeDelay } = useContext(NavigationContext);

  return (
    <header className={clsx('col-span-full', className)}>
      <div className={`relative md:pt-i120 ${withBackLink ? 'pt-[calc(theme(spacing.i80)*2)]' : 'pt-i120'}`}>
        {withBackLink && (
          <button
            onClick={async () => {
              if (applyUrlChangeDelay) {
                window.dispatchEvent(new CustomEvent('router:delay'));
                await new Promise((r) => {
                  setTimeout(r, 300);
                });
              }

              router.back();
            }}
            className='absolute left-0 top-i80 md:top-i64'
          >
            <Icon name='arrow-right' className='size-6 rotate-180 dark:fill-white' />
          </button>
        )}
        <h1 className={clsx('text-h1-big col-span-full mb-i120 text-center font-medium lowercase', titleClassName)}>
          {title}
        </h1>
      </div>
      {children}
    </header>
  );
}
