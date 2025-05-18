'use client';

import React, { useEffect, useState } from 'react';
import { IMediaSlider } from '@/shared/lib/types';
import { FileVideo } from '@/entities/publication/ui/Video';
import Image from 'next/image';
import { Slider } from '@/shared/ui';

interface Props {
  className?: string;
  align?: 'start' | 'center' | 'end' | ((viewportWidth: number, slideWidth: number, index: number) => number);
  media: IMediaSlider[];
}

export default function BigSlider({ className, media }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [playingVideoIndex, setPlayingVideoIndex] = useState<number | null>(null);

  const toggleVideoHandler = (index: number) => {
    if (playingVideoIndex === index) {
      setPlayingVideoIndex(null);
    } else {
      setPlayingVideoIndex(index);
    }
  };

  useEffect(() => {
    const activeMedia = media[activeIndex];

    if (activeMedia.media.type === 'video') {
      setPlayingVideoIndex(activeIndex);
    } else {
      setPlayingVideoIndex(null);
    }
  }, [activeIndex, media]);

  return (
    <Slider
      className={className}
      setActiveIndex={setActiveIndex}
      slideClassName='basis-[80%] md:basis-[90%] lg:basis-[70%] mr-grid'
      align='center'
      autoplay
      stopAutoplay={playingVideoIndex !== null}
    >
      {media.map((item, index) => (
        <div key={item.id} className='relative aspect-video max-h-[768px] overflow-hidden'>
          {item.media.url &&
            (item.media.type === 'image/jpeg' ? (
              <Image src={item.media.url} alt={''} layout='fill' objectFit='cover' />
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
        </div>
      ))}
    </Slider>
  );
}
