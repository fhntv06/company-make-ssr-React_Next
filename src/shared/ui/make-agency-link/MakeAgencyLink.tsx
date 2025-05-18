'use client';

import React, { useLayoutEffect, useState, PropsWithChildren, useMemo } from 'react';
import NextLink from 'next/link';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';

const Player = React.lazy(() => import('react-lottie-player'));

type AnimationType = 'home' | 'pages';

interface Props extends PropsWithChildren {
  title?: string;
  shape?: 'circle' | 'square';
  className?: string;
  logoClassName?: string;
}

export default function MakeAgencyLink({
  title,
  shape = 'square',
  className,
  logoClassName,
  children,
}: Props): JSX.Element | null {
  const pathname = usePathname();
  const [play, setPlay] = useState<boolean>(false);
  const [animationData, setAnimationData] = useState<object>();

  const animationType: AnimationType = useMemo(
    () => (pathname === '/' ? 'home' : 'pages'),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useLayoutEffect(
    () => {
      import(`/public/make_bird_${animationType}.json`).then(setAnimationData).catch((e) => console.error(e));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return !animationData ? null : (
    <NextLink
      href='/'
      title={title}
      onMouseEnter={() => setPlay(true)}
      rel='noreferrer'
      className={clsx('flex gap-i16', className)}
    >
      <div
        className={clsx('size-12 overflow-hidden md:size-14 lg:size-16', logoClassName, {
          'rounded-[18px] md:rounded-[20px] lg:rounded-3xl': shape === 'square',
          'rounded-full': shape === 'circle',
        })}
      >
        <Player
          onLoopComplete={() => setPlay(false)}
          play={play}
          animationData={animationData}
          onMouseEnter={() => setPlay(true)}
        />
      </div>
      {children}
    </NextLink>
  );
}
