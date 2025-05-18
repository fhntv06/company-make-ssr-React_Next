/* eslint-disable tailwindcss/no-custom-classname */

'use client';

import clsx from 'clsx';
import React, { Children, PropsWithChildren, useCallback, useEffect, useRef, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Button } from '@/shared/ui';

interface Props extends PropsWithChildren {
  className?: string;
  wrapperClassName?: string;
  slideClassName?: string;
  loop?: boolean;
  align?: 'start' | 'center' | 'end' | ((viewportWidth: number, slideWidth: number, index: number) => number);
  dragFree?: boolean;
  autoplay?: boolean;
  stopAutoplay?: boolean;
  stopAutoplayOnMouseEnter?: boolean;
  containScroll?: false | 'trimSnaps';
  borderSlides?: boolean;
  setActiveIndex?: React.Dispatch<React.SetStateAction<number>>;
  pagination?: boolean;
  paginationType?: 'dots' | 'buttons';
  startIndex?: number;
}

export default function Slider({
  className,
  slideClassName,
  wrapperClassName,
  loop = true,
  align = 'start',
  dragFree = false,
  autoplay = false,
  stopAutoplay,
  stopAutoplayOnMouseEnter = false,
  containScroll = 'trimSnaps',
  borderSlides = false,
  setActiveIndex,
  children,
  pagination,
  paginationType = 'dots',
  startIndex = 0,
}: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const autoplayRef = useRef(
    autoplay
      ? Autoplay({ playOnInit: autoplay, stopOnInteraction: false, stopOnMouseEnter: stopAutoplayOnMouseEnter })
      : undefined,
  );
  const plugins = [autoplayRef.current].filter((p) => p);
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop,
      align,
      containScroll,
      startIndex,
      dragFree,
    },
    plugins.length ? plugins : undefined,
  );

  const clickHandler = (index: number) => {
    if (!emblaApi) return;

    emblaApi.scrollTo(index);
    setSelectedIndex(index);
  };

  const slideChangeHandler = useCallback(() => {
    if (!emblaApi) return;

    if (setActiveIndex) setActiveIndex(emblaApi.selectedScrollSnap());
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setActiveIndex, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return () => {};

    emblaApi.on('select', slideChangeHandler);

    return () => {
      emblaApi.off('select', slideChangeHandler);
    };
  }, [emblaApi, slideChangeHandler]);

  useEffect(() => {
    if (!emblaApi || !autoplayRef.current || !autoplay) return;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const toggleAutoplayHandler = (stopAutoplay ? autoplayRef.current.stop : autoplayRef.current.play) as () => void;

    toggleAutoplayHandler();
  }, [stopAutoplay, emblaApi, autoplay]);

  return (
    <div className={clsx('relative overflow-hidden', wrapperClassName)}>
      <div ref={emblaRef}>
        <div className={clsx(className, 'relative flex')}>
          {Children.map(children, (child, index) => (
            <div
              className={clsx(slideClassName, 'shrink-0 grow-0', {
                'border-slide': borderSlides,
              })}
              onClick={() => {
                clickHandler(index);
              }}
            >
              {child}
            </div>
          ))}
        </div>
      </div>
      {pagination && paginationType === 'dots' && (
        <div className='embla__controls absolute bottom-i16 left-1/2 -translate-x-1/2'>
          <div className='embla__dots space-x-2'>
            {Children.map(children, (child, index) => (
              <button
                className={clsx('size-2 rounded-full', index === selectedIndex ? 'bg-black' : 'bg-black/16')}
                key={index}
                onClick={() => {
                  clickHandler(index);
                }}
              />
            ))}
          </div>
        </div>
      )}
      {pagination && paginationType === 'buttons' && (
        <div className='embla__controls absolute bottom-i24 left-i24 !h-fit'>
          <div className='flex'>
            <Button
              iconRight='nav-arrow-right'
              className='rotate-180'
              onClick={() => {
                if (emblaApi) emblaApi.scrollPrev();
              }}
              theme='black'
            />
            <Button
              iconRight='nav-arrow-right'
              onClick={() => {
                if (emblaApi) emblaApi.scrollNext();
              }}
              theme='black'
            />
          </div>
        </div>
      )}
    </div>
  );
}
