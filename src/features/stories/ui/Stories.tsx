'use client';

import { Client } from '@/entities/client';
import { useStoriesStore } from '@/features/stories/model/store';
import clsx from 'clsx';
import { Stories as IStories } from '@/entities/stories/model/types';
import Image from 'next/image';

interface Props {
  data: IStories[];
  className?: string;
  view?: 'client' | 'preview';
  storyID: number;
  setStoryId: (num: number) => void;
  openModal: () => void;
}

export default function Stories({ data, className, view = 'client', storyID, setStoryId, openModal }: Props) {
  const { addStories } = useStoriesStore();

  const onOpen = () => {
    addStories(data[storyID]);
    setStoryId(storyID);
    openModal();
  };

  return (
    <>
      {view === 'preview' && (
        <div className={clsx(className)} onClick={onOpen}>
          <div className='relative h-[378px]'>
            <Image fill objectFit='cover' src={data[storyID].preview.url} alt={data[storyID].preview.name || ''} />
          </div>
          {data[storyID].description && (
            <p className='mx-auto mt-i16 w-fit opacity-0 transition-opacity group-hover:opacity-100'>
              {data[storyID].description}
            </p>
          )}
        </div>
      )}
      {view === 'client' && (
        <button onClick={onOpen} className={clsx(className)}>
          <Client data={data[storyID].client} size='large' />
        </button>
      )}
    </>
  );
}
