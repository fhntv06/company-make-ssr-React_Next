'use client';

import { IStories } from '@/entities/stories';
import { Slider, Modal } from '@/shared/ui';
import { Stories } from '@/features/stories';
import StoriesSlider from '@/features/stories/ui/StoriesSlider';
import { useModal } from '@/shared/lib/hooks';
import React, { useState } from 'react';

interface Props {
  data: IStories[];
  className?: string;
}

export default function StoriesSliderList({ data, className }: Props) {
  const { opened, openModal, closeModal } = useModal();
  const [storyID, setStoryID] = useState(0);

  return (
    <>
      <Slider
        wrapperClassName={className}
        autoplay={data.length > 8}
        align={(_, slideWidth) => (window.innerWidth < 767 ? slideWidth / 5 : 0)}
        slideClassName='basis-[calc((100%-theme(spacing.gap)*2)/6)] md:basis-[calc((100%-theme(spacing.gap)*3)/4)] lg:basis-[calc((100%-theme(spacing.gap)*7)/8)] group cursor-pointer mr-gap'
      >
        {data.map((stories, index) => (
          <Stories
            key={stories.id}
            data={data}
            storyID={index}
            setStoryId={setStoryID}
            view='preview'
            openModal={openModal}
          />
        ))}
      </Slider>
      <Modal open={opened} mode='fullscreen' onClose={closeModal} className='z-50 !pt-0 text-white'>
        <StoriesSlider stories={data} storiesId={data[storyID].id} closeModal={closeModal} storyToOpen={storyID} />
      </Modal>
    </>
  );
}
