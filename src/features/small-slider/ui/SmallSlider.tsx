'use client';

import { Slider } from '@/shared/ui';
import { IMediaSlider } from '@/shared/lib/types';
import Image from 'next/image';

import React, { useState } from 'react';
import clsx from 'clsx';
import { useMediaQuery } from 'usehooks-ts';

interface Props {
  className?: string;
  media: IMediaSlider[];
}

export default function SmallSlider({ className, media }: Props) {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const isMobile = useMediaQuery('(max-width: 767px)');
  const sliderGap = isMobile ? 16 : 24;

  return (
    <Slider
      className={clsx(className)}
      align={(_, slideWidth) => (!isMobile ? slideWidth / 2 - sliderGap : slideWidth / 2 - sliderGap * 4)}
      slideClassName='basis-1/2 md:basis-1/3 lg:basis-1/4 mr-grid'
    >
      {media.map((item, index) => (
        <div key={item.id} onMouseEnter={() => setHoveredItem(index)} onMouseLeave={() => setHoveredItem(null)}>
          <div
            className={clsx('relative aspect-[1/3] max-h-[640px] w-full transition-[filter] duration-200', {
              'grayscale-0': hoveredItem === index,
              grayscale: hoveredItem !== index && hoveredItem !== null && !isMobile,
            })}
          >
            <Image src={item.media.url} alt='' fill objectFit='cover'></Image>
          </div>
          <div
            className={clsx('transition-opacity duration-200', {
              'md:opacity-0': hoveredItem !== index,
              'md:opacity-100': hoveredItem === index,
            })}
          >
            <p
              className={clsx(
                'mb-i8 relative mt-i24 hidden w-fit font-medium typo-h4 after:absolute after:bottom-0 after:right-0 md:block ' +
                  'after:content-* after:block after:h-px after:w-full after:bg-black',
              )}
            >
              {item.name}
            </p>
            <p className={'relative mt-grid font-medium typo-h4 md:hidden'}>{item.name}</p>
            <p className={'typo-h4'}>{item.position}</p>
          </div>
        </div>
      ))}
    </Slider>
  );
}
