'use client';

import clsx from 'clsx';
import React, { PropsWithChildren, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { PlayButton } from '..';

interface Props extends PropsWithChildren {
  className?: string;
  preview?: string;
  alt?: string;
}

export default function IFrameVideo({ children, preview, alt, className }: Props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const iFrameElement = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    iFrameElement.current = ref.current.querySelector('iframe');
  }, []);

  const playVideoHandler = () => {
    setIsPlaying(true);

    if (!iFrameElement.current) return;

    const { src } = iFrameElement.current;

    if (src.includes('autoplay=0')) {
      const newSrc = src.replace('autoplay=0', 'autoplay=1');
      iFrameElement.current.src = newSrc;
    }
  };

  return (
    <div ref={ref} className={clsx('relative aspect-video max-h-[788px]', className)}>
      {preview && (
        <>
          <div
            className={clsx('relative z-[1] size-full', {
              'user-select-auto pointer-events-auto visible opacity-100': !isPlaying,
              'user-select-none pointer-events-none hidden opacity-0': isPlaying,
            })}
          >
            <Image fill objectFit='cover' src={preview} alt={alt ?? ''} />
          </div>
          <PlayButton
            className={clsx('!absolute bottom-grid left-grid', {
              'user-select-auto pointer-events-auto visible  opacity-100': !isPlaying,
              'user-select-none pointer-events-none hidden opacity-0': isPlaying,
            })}
            onClickButton={playVideoHandler}
          />
        </>
      )}
      <div className='absolute inset-0'>{children}</div>
    </div>
  );
}
