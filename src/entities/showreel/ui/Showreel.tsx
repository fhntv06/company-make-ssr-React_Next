'use client';

import { Button } from '@/shared/ui';
import React, { ReactNode, useState } from 'react';
import { Media } from '@/shared/lib/types';
import Image from 'next/image';
import { KinescopeVideo } from '@/entities/publication/ui/Video';
import { getVideoSrc } from '@/shared/lib/helpers';
import { kinescopeRe } from '@/shared/lib/constants';
import clsx from 'clsx';

interface Props {
  media: Media;
  preview?: string;
  header?: ReactNode;
  footer?: ReactNode;
  className?: string;
  theme?: 'black' | 'white';
  playButton?: boolean;
  withoutButton?: boolean;
}

export default function Showrel({
  media,
  header,
  footer,
  preview,
  className = '',
  playButton = false,
  withoutButton = false,
  theme = 'black',
}: Props) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  return (
    <div
      className={clsx(
        'relative aspect-[9/16] max-h-[640px] w-full bg-cover bg-no-repeat py-grid grid-subcontainer lg:max-h-[960px] lg:py-i32',
        className,
      )}
      style={{ backgroundImage: `url('${preview}')` }}
    >
      <div className='absolute inset-0 size-full'>
        {media.type === 'image/jpeg' ? (
          <Image src={media.url} alt={media.name ?? ''} layout='fill' objectFit='cover' />
        ) : (
          <div className={clsx(isVideoPlaying ? 'opacity-100' : 'opacity-0', 'size-full')}>
            <KinescopeVideo
              videoId={getVideoSrc(media.url, kinescopeRe) ?? ''}
              playing={isVideoPlaying}
              onClick={() => {
                setIsVideoPlaying((prevState) => !prevState);
              }}
            />
          </div>
        )}
      </div>
      <div
        className={clsx(
          'z-20 col-span-full flex flex-col',
          !header && 'justify-end',
          header && 'justify-between',
          isVideoPlaying && 'h-fit',
        )}
      >
        {header}
        {!withoutButton && (
          <>
            {playButton ? (
              <>
                {media.type === 'video' && !isVideoPlaying && (
                  <Button
                    className='!absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 '
                    wrapperClassName='md:flex hidden'
                    theme={theme}
                    iconRight='play'
                    onClick={() => {
                      setIsVideoPlaying(true);
                    }}
                    size='big'
                  >
                    <span className='hidden items-center gap-x-2 md:inline-flex'>
                      showreel
                      <sup className='text-white text-opacity-64 typo-p'>02:17</sup>
                    </span>
                  </Button>
                )}
              </>
            ) : (
              <div>
                <Button
                  className='mx-grid mb-10 md:hidden'
                  size='small'
                  theme='mobileDark'
                  iconRight='arrow-right'
                  href='/about'
                >
                  об агентстве
                </Button>
                <Button
                  className='mx-grid mb-10 hidden md:absolute md:left-1/2 md:top-1/2 md:mx-0 md:flex md:-translate-x-1/2 md:-translate-y-1/2'
                  size='small'
                  iconRight='arrow-right'
                  href='/about'
                >
                  об агентстве
                </Button>
              </div>
            )}
          </>
        )}
        {<div className='md:block'>{!isVideoPlaying && footer}</div>}
      </div>
    </div>
  );
}
