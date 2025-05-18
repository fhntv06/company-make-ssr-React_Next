'use client';

import { Button } from '@/shared/ui';
import React, { useState } from 'react';
// eslint-disable-next-line import/no-cycle
import { Gallery } from '@/features/gallery';
import { IMediaSlider } from '@/shared/lib/types';
import { useModal } from '@/shared/lib/hooks';
import Image from 'next/image';
import clsx from 'clsx';

interface Props {
  media: IMediaSlider[];
  className?: string;
}

export default function GalleryWrapper({ media, className }: Props) {
  const { opened: openModal, openModal: onOpenModal, closeModal: onCloseModal } = useModal();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <div className={clsx('relative', className)}>
      {media.map((_, index) => (
        <div
          key={index}
          className='group relative min-h-[460px] py-grid grid-subcontainer md:min-h-[660px] lg:min-h-[960px] lg:py-i32'
        >
          <div className='absolute inset-0 size-full'>
            <Image src={media[index].media.url} alt={''} layout='fill' objectFit='cover' />
          </div>
          <div className='absolute bottom-i24 left-i24 z-50 hidden w-fit group-hover:block'>
            <Button
              theme='black'
              onClick={() => {
                setSelectedIndex(index);
                onOpenModal();
              }}
              size={'small'}
              iconRight='expand-image'
            />
          </div>
        </div>
      ))}
      <Gallery media={media} onClose={onCloseModal} open={openModal} imageIndex={selectedIndex ?? 0} />
    </div>
  );
}
