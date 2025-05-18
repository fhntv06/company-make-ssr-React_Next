'use client';

import React from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { Media } from '@/shared/lib/types';
import { PlayButton } from '@/shared/ui';

interface Props {
  data: {
    video?: Media;
    cover: Media;
  };
  className?: string;
}

export default function PageVideo({ data: { cover }, className }: Props) {
  return (
    <div className={clsx('relative flex aspect-video items-center justify-center', className)}>
      <div className='relative size-full'>
        <Image src={cover.url} alt={cover.name as string} fill objectFit='cover' />
      </div>
      <PlayButton onClickButton={() => {}} className='!absolute'>
        <span className='inline-flex items-center gap-x-2'>
          showreel
          <sup className='text-white text-opacity-64 typo-p'>02:17</sup>
        </span>
      </PlayButton>
    </div>
  );
}
