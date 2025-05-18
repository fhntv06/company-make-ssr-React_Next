import { useSwiper, Swiper, SwiperSlide, SwiperRef } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper/types';
import clsx from 'clsx';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { IStories } from '@/entities/stories';
import { AnimatePresence, motion, useAnimation } from 'framer-motion';
import { FileVideo } from '@/entities/publication/ui/Video';

interface Props {
  stories: IStories;
  storiesIndex: number;
  isParentActive: boolean;
  slideDuration: number;
  lastStoryIndex: number;
  closeModal: () => void;
}

export default function NestedStories({
  stories,
  isParentActive,
  storiesIndex,
  slideDuration,
  lastStoryIndex,
  closeModal,
}: Props) {
  const parentSwiper = useSwiper();
  const swiperRef = useRef<SwiperRef>(null);
  const [progressLineState, setProgressLineState] = useState<number[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const controls = useAnimation();
  const [videoKey, setVideoKey] = useState(0);
  const [isLongPress, setIsLongPress] = useState(false);
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);
  const [startedTouch, setStartedTouch] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const startAnim = async () => {
      await controls.start({ width: '100%' });
    };

    if (isParentActive) {
      startAnim()
        .then(() => {})
        .catch(() => {});
    } else {
      controls.set({ width: '0%' });
    }

    return () => {
      controls.stop();
    };
  }, [isParentActive, controls]);

  useEffect(() => {
    const startAnim = async () => {
      await controls.start({ width: '100%' });
    };

    const restartAnim = () => {
      controls.set({ width: 0 });
    };

    if (swiperRef.current && swiperRef.current.swiper.previousIndex < currentIndex) {
      startAnim()
        .then(() => {})
        .catch(() => {});
    } else {
      restartAnim();
      startAnim()
        .then(() => {})
        .catch(() => {});
    }

    return () => {
      controls.stop();
    };
  }, [currentIndex, controls]);

  const restartVideo = () => {
    setVideoKey((prevKey) => prevKey + 1);
  };

  function handleSlideChange(swiper: SwiperType, event: MouseEvent | TouchEvent | PointerEvent) {
    if (isLongPress) return;

    let xPos;

    if (event instanceof MouseEvent) {
      xPos = event.offsetX;
    } else {
      const target = event.target as HTMLElement;
      xPos = swiper.touches.currentX - target.getBoundingClientRect().left;
    }

    const slideNext = () => {
      if (swiperRef.current && swiperRef.current.swiper.realIndex === stories.content.length - 1) {
        if (lastStoryIndex === storiesIndex) {
          closeModal();
        } else {
          parentSwiper.slideNext();
        }
      } else {
        swiper.slideNext();

        setProgressLineState((prevState) => {
          return prevState.map((state, index) => {
            if (index === swiper.previousIndex) {
              return 100;
            }
            return state;
          });
        });
      }
    };

    const slidePrev = () => {
      restartVideo();
      if (swiper.realIndex === 0) {
        parentSwiper.slidePrev();
      } else {
        swiper.slidePrev();

        setProgressLineState((prevState) => {
          return prevState.map((state, index) => {
            if (index === swiper.realIndex || index === swiper.previousIndex) {
              return 0;
            }
            return state;
          });
        });
      }
    };

    if (xPos > swiper.width / 2) {
      controls.set({ width: '100%' });
      slideNext();
    } else {
      controls.set({ width: 0 });
      slidePrev();
    }
  }

  const handlePressStart = () => {
    longPressTimer.current = setTimeout(() => {
      setIsLongPress(true);
      controls.stop();
    }, 200);
  };

  const handlePressEnd = (swiper: SwiperType, event: MouseEvent | TouchEvent | PointerEvent) => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }

    if (isLongPress) {
      setIsLongPress(false);
      controls.start({ width: '100%' }).catch(() => {});
    } else if (isParentActive) {
      const endedX = swiper.touches.currentX;
      const endedY = swiper.touches.currentY;
      if (endedX === startedTouch.x && endedY === startedTouch.y) {
        handleSlideChange(swiper, event);
      }
    } else {
      parentSwiper.slideTo(storiesIndex);
    }
  };

  return (
    <>
      {isParentActive && (
        <AnimatePresence>
          <div className={'absolute left-0 top-0 flex w-full space-x-i16'}>
            {stories.content.map((_, storyIndex) => (
              <div
                key={storyIndex}
                className={clsx(
                  'relative h-0.5 w-full transition duration-300 ease-in',
                  storiesIndex === parentSwiper.realIndex && 'bg-white/65',
                  storiesIndex !== parentSwiper.realIndex && 'bg-white/0',
                )}
              >
                {swiperRef.current && swiperRef.current.swiper.realIndex === storyIndex ? (
                  <motion.span
                    className={'absolute left-0 top-0 z-50 h-full w-0 bg-main-gradient'}
                    initial={{ width: 0 }}
                    onAnimationComplete={() => {
                      if (swiperRef.current) {
                        if (swiperRef.current.swiper.realIndex === stories.content.length - 1) {
                          if (lastStoryIndex === storiesIndex) {
                            closeModal();
                          } else {
                            parentSwiper.slideNext();
                          }
                        } else {
                          swiperRef.current.swiper.slideNext();
                        }
                      }
                    }}
                    onAnimationStart={() => {
                      setProgressLineState((prevState) => {
                        return prevState.map((state, index) => {
                          if (swiperRef.current && index === currentIndex) {
                            return 100;
                          }
                          return state;
                        });
                      });
                    }}
                    custom={storyIndex}
                    animate={controls}
                    transition={{ duration: stories.content[storyIndex].duration ?? slideDuration }}
                  />
                ) : (
                  <motion.span
                    className={'absolute left-0 top-0 z-50 h-full w-0 bg-main-gradient'}
                    animate={{ width: `${progressLineState[storyIndex]}%` }}
                    transition={{ duration: 0 }}
                  />
                )}
              </div>
            ))}
          </div>
        </AnimatePresence>
      )}

      <Swiper
        ref={swiperRef}
        className={'group !size-full !overflow-hidden'}
        allowSlideNext={isParentActive && !isLongPress}
        preventInteractionOnTransition
        allowSlidePrev={isParentActive && !isLongPress}
        allowTouchMove={false}
        onActiveIndexChange={(swiper) => {
          setCurrentIndex(swiper.realIndex);
        }}
        onAfterInit={() => {
          const arr = stories.content.map(() => 0);
          setProgressLineState(arr);
        }}
        onTouchStart={(swiper) => {
          handlePressStart();
          setStartedTouch({ x: swiper.touches.currentX, y: swiper.touches.currentY });
        }}
        onTouchEnd={(swiper, event) => {
          handlePressEnd(swiper, event);
        }}
      >
        {stories.content.map((nestedItem, nestedIndex) => (
          <SwiperSlide key={nestedIndex}>
            <div className='relative aspect-[1080/1920] size-full'>
              <div
                className={clsx(
                  'absolute left-0 top-0 z-50 size-full bg-black/0 transition duration-300 ease-in',
                  !isParentActive && 'bg-black/65 group-hover:bg-black/0',
                )}
              />
              {nestedItem.type === 'image/jpeg' ? (
                <Image src={nestedItem.url} alt={nestedItem.name || ''} layout='fill' objectFit='cover' />
              ) : (
                <div className={'relative z-50 size-full overflow-hidden'}>
                  <FileVideo
                    key={videoKey}
                    src={nestedItem.url}
                    playing={swiperRef.current?.swiper.realIndex === nestedIndex}
                    onClick={() => null}
                    isControlsShown={false}
                  />
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
