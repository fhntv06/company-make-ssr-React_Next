import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper/types';
import 'swiper/css';
import React, { useEffect, useRef, useState } from 'react';
import { useStoriesStore } from '@/features/stories/model/store';
import clsx from 'clsx';
import { Stories as IStories } from '@/entities/stories/model/types';
import { Client } from '@/entities/client';
import { Button } from '@/shared/ui';
// eslint-disable-next-line import/no-named-as-default
import NestedStories from '@/features/stories/ui/NestedStories';
import { useMediaQuery } from 'usehooks-ts';

interface Props {
  stories: IStories[];
  storiesId: number;
  closeModal: () => void;
  storyToOpen: number;
}

export default function StoriesSlider({ stories, storiesId, closeModal, storyToOpen }: Props) {
  const swiperRef = useRef<SwiperRef>(null);
  const buttonRef = useRef<HTMLDivElement | null>(null);

  const slideDuration = 3;
  const storiesCount = stories.filter((item) => item.content.length > 0).length;

  const [currentStoryIndex, setCurrentStoryIndex] = useState<number>(0);

  const { viewStories } = useStoriesStore();

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (swiperRef.current && !swiperRef.current.swiper.wrapperEl.contains(event.target as Node)) {
        closeModal();
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSlideChange = (swiper: SwiperType) => {
    viewStories(storiesId, swiper.previousIndex);
    setCurrentStoryIndex(swiper.activeIndex);
  };

  const isMobile = useMediaQuery('(max-width: 767px)');

  return (
    <div className='relative size-full select-none'>
      <p className={'h4 mb-i24 pl-i24 pt-i24 text-white'}>
        {currentStoryIndex < 9 ? `0${currentStoryIndex + 1}` : currentStoryIndex + 1}&nbsp;/&nbsp;
        {storiesCount < 9 ? `0${storiesCount}` : storiesCount}
      </p>
      <Swiper
        ref={swiperRef}
        onSlideChange={onSlideChange}
        slidesPerView={isMobile ? 1 : 4}
        spaceBetween={24}
        centeredSlides
        allowSlideNext
        allowSlidePrev
        longSwipesRatio={0.2}
        preventInteractionOnTransition
        initialSlide={storyToOpen}
        className={clsx(
          '!absolute !top-0 !h-screen !py-i120',
          isMobile ? '!left-0 !w-full' : '!left-[-5vw] !w-[110vw]',
        )}
      >
        {stories.map((item, index) => (
          <SwiperSlide key={index} className={'!overflow-hidden'}>
            {({ isActive }) => (
              <div className='relative flex h-full flex-col pt-i16'>
                <div
                  className={clsx(
                    'absolute left-i24 top-i24 z-50 opacity-0 transition duration-300 ease-in',
                    !isActive && 'opacity-100',
                  )}
                >
                  <Client data={stories[index].client} />
                </div>
                <div
                  className={clsx(
                    'absolute bottom-i24 right-i24 z-50 flex flex-col items-end space-y-0 opacity-0 transition duration-300 ease-in',
                    isActive && 'opacity-100',
                  )}
                >
                  <Client data={stories[index].client} size={isMobile ? 'small' : 'medium'} />
                  <div ref={buttonRef}>
                    <Button iconRight={'arrow-right'} theme={'white'} href='/#' size={isMobile ? 'small' : 'big'} />
                  </div>
                </div>
                <NestedStories
                  stories={item}
                  isParentActive={isActive}
                  storiesIndex={index}
                  slideDuration={slideDuration}
                  lastStoryIndex={stories.length - 1}
                  closeModal={closeModal}
                />
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
