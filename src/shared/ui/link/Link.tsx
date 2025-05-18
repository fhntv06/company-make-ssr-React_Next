'use client';

import NextLink from 'next/link';
import clsx from 'clsx';
import React, { FunctionComponentElement, PropsWithChildren } from 'react';
import { usePathname } from 'next/navigation';
import Icon from '@/shared/ui/icon/Icon';
import { IconNames } from '@/shared/ui/icon/type';

interface Props extends PropsWithChildren {
  to: string;
  onMouseEnter?: React.MouseEventHandler<HTMLElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLElement>;
  dashed?: boolean;
  underline?: boolean;
  className?: string;
  iconClassName?: string;
  external?: boolean;
  iconName?: IconNames;
}

const re = /^https?:\/\//i;

const stopPropagation = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
  e.stopPropagation();
};

export default function Link({
  to,
  dashed,
  underline,
  onMouseEnter,
  onMouseLeave,
  className,
  iconClassName,
  children,
  external = true,
  iconName,
}: Props): FunctionComponentElement<Props> {
  const pathname = usePathname();

  const linkTypeClasses = {
    'base-link': !dashed,
    'border-b-[1px] border-dashed border-transparent hover:border-current': dashed,
    'bg-[length:100%_1px] bg-left-bottom': underline,
    'animate-font-active': pathname === to,
    'relative mr-i32': iconName,
  };

  if (re.test(to)) {
    return (
      <a
        href={to}
        className={clsx('base-link relative w-fit', linkTypeClasses, className)}
        rel='noreferrer'
        target='_blank'
      >
        {children}
        {external && (
          <Icon
            name='arrow-up-right-16'
            className={clsx(
              'absolute -right-4 -top-i12 size-4 shrink-0 fill-current stroke-current transition-colors lg:-right-6 lg:size-6',
              iconClassName,
            )}
          />
        )}
      </a>
    );
  }

  return (
    <NextLink
      href={to}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={stopPropagation}
      className={clsx('w-fit', linkTypeClasses, className)}
    >
      {children}
      {iconName && (
        <Icon
          name='arrow-up-right-16'
          className={clsx(
            'absolute -right-4 -top-i12 size-4 shrink-0 fill-current stroke-current transition-colors lg:-right-6 lg:size-6',
            iconClassName,
          )}
        />
      )}
    </NextLink>
  );
}
