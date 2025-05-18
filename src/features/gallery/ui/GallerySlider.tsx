'use client';

import { Button, Slider } from '@/shared/ui';
import React, { useState } from 'react';
// eslint-disable-next-line import/no-cycle
import { Gallery } from '@/features/gallery';
import { IMediaSlider } from '@/shared/lib/types';
import { useModal } from '@/shared/lib/hooks';
import clsx from 'clsx';
import { FileVideo } from '@/entities/publication/ui/Video';
import GalleryImage from './GalleryImage';

interface Props {
  media: IMediaSlider[];
  className?: string;
}

export default function GallerySlider({ media, className }: Props) {
  const { opened: openModal, openModal: onOpenModal, closeModal: onCloseModal } = useModal();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [playingVideoIndex, setPlayingVideoIndex] = useState<number | null>(null);

  const toggleVideoHandler = (index: number) => {
    if (playingVideoIndex === index) {
      setPlayingVideoIndex(null);
    } else {
      setPlayingVideoIndex(index);
    }
  };

  return (
    <div className={clsx('relative w-full', className)}>
      <Slider
        setActiveIndex={setActiveIndex}
        slideClassName='basis-full md:basis-auto mr-gap'
        align='center'
        // autoplay
        loop
        wrapperClassName='h-full *:h-full'
        className='h-full'
      >
        {media.map((item, index) => (
          <div key={index} className='relative flex h-full flex-col overflow-hidden'>
            {item.media.url &&
              (item.media.type && item.media.type.includes('image') ? (
                <GalleryImage src={item.media.url}>
                  <Button
                    className='!absolute bottom-grid left-grid'
                    theme='black'
                    onClick={() => {
                      setSelectedIndex(index);
                      onOpenModal();
                    }}
                    size={'small'}
                    iconRight='expand-image'
                  />
                </GalleryImage>
              ) : (
                <figure className={'size-full'}>
                  <div className={'relative size-full overflow-hidden'}>
                    <FileVideo
                      key={activeIndex}
                      src={item.media.url}
                      playing={activeIndex === index && playingVideoIndex === index}
                      onClick={() => {
                        toggleVideoHandler(index);
                      }}
                      isControlsShown={item.userControls ?? false}
                    />
                  </div>
                </figure>
              ))}
            {item.subtext && (
              <p className={clsx('mt-i16 transition-opacity duration-300', { 'opacity-0': activeIndex !== index })}>
                {item.subtext}
              </p>
            )}
          </div>
        ))}
      </Slider>
      <Gallery
        media={media.filter((item) => item.media.type && item.media.type.includes('image'))}
        onClose={onCloseModal}
        open={openModal}
        imageIndex={selectedIndex ?? 0}
        setActiveIndex={setActiveIndex}
      />
    </div>
  );
}
