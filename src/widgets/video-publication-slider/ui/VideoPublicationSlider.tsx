'use client';

import React from 'react';
import { Publication, VideoPublication } from '@/entities/publication';
import { Slider } from '@/shared/ui';

interface Props {
  className?: string;
  data: Publication[];
}

export default function VideoPublicationSlider({ className, data }: Props) {
  return (
    <div className={className}>
      <Slider
        slideClassName='basis-full lg:basis-[calc((100%-theme(spacing.gap)*1)/2)] mr-gap'
        autoplay
        stopAutoplayOnMouseEnter
        containScroll={false}
      >
        {data.map((p) => (
          <VideoPublication key={p.id} data={p} />
        ))}
      </Slider>
    </div>
  );
}
