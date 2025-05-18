'use client';

import { IStories } from '@/entities/stories';
import { Stories } from '@/features/stories';
import { ShowHint } from '@/features/show-hint';
import React, { useState } from 'react';
import clsx from 'clsx';
import { Modal } from '@/shared/ui';
import { useModal } from '@/shared/lib/hooks';
import StoriesSlider from '@/features/stories/ui/StoriesSlider';

interface Props {
  data: IStories[];
  className?: string;
  view?: 'client' | 'preview';
}

export default function StoriesList({ data, className, view = 'client' }: Props) {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [storyID, setStoryID] = useState(0);
  const { opened, openModal, closeModal } = useModal();

  return (
    <div
      className={clsx('tag-list gap-i16', className)}
      onMouseLeave={() => {
        if (view === 'client') setHoveredItem(null);
      }}
    >
      <Modal open={opened} mode='fullscreen' onClose={closeModal} className='z-50 !pt-0 text-white'>
        <StoriesSlider stories={data} storiesId={data[storyID].id} closeModal={closeModal} storyToOpen={storyID} />
      </Modal>

      {data.map((item, index) => (
        <ShowHint
          className='tag-item'
          key={item.id}
          transparentHint
          hintDescription={<p className='whitespace-nowrap lowercase'>{item.client.name}</p>}
        >
          <div
            className={clsx('transition-transform duration-300', {
              'scale-75': hoveredItem !== null && hoveredItem !== index,
            })}
            onMouseEnter={() => {
              if (view === 'client') setHoveredItem(index);
            }}
          >
            <Stories
              key={index}
              data={data}
              storyID={index}
              setStoryId={setStoryID}
              view={view}
              openModal={openModal}
            />
          </div>
        </ShowHint>
      ))}
    </div>
  );
}
