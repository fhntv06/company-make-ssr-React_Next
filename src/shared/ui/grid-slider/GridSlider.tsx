'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Swiper,
  SwiperSlide,
  // SwiperClass,
} from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import clsx from 'clsx';
import GridSlide from './GridSlide';
import GridSliderContext, { GridSliderContextType } from './GridSliderContext';

interface Props {
  children: React.ReactNode;
  className?: string;
  slideClassName?: string;
  withoutIndents?: boolean;
  activeIndex?: number;
  // callback?: ((arg0: number) => void | undefined) | undefined;
  // pagination?: boolean;
  smallSlides?: boolean;
  centeredSlides?: boolean;
  loop?: boolean;
}

export default function GridSlider({
  children,
  className,
  slideClassName,
  // callback,
  // pagination = false,
  centeredSlides = false,
  loop = false,
  // smallSlides = false,
  withoutIndents,
  // activeIndex,
}: Props) {
  // const [instance, setInstance] = useState<SwiperClass | null>(null);
  const [gridData, setGridData] = useState<GridSliderContextType>({ columnWidth: 0, gap: 0 });
  const containerRef = useRef<HTMLDivElement | null>(null);
  // const [slides, setSlides] = useState<HTMLElement[]>([]);
  // const [isActiveIndex, setIsActiveIndex] = useState<number>(0);

  // const onClick = (isNext?: boolean) => {
  //   if (instance) {
  //     if (isNext) {
  //       instance.slideNext();
  //     } else {
  //       instance.slidePrev();
  //     }
  //   }
  // }

  const getColumnWidth = () => {
    const el = containerRef.current;
    if (el) {
      const { gridTemplateColumns: columns, columnGap } = window.getComputedStyle(el);
      setGridData({
        columnWidth: parseFloat(columns.substring(0, columns.indexOf(' '))),
        gap: parseFloat(columnGap) || 0,
      });
    }
  };

  useEffect(() => {
    if (containerRef.current) {
      getColumnWidth();
    }
  }, []);

  return (
    <GridSliderContext.Provider value={gridData}>
      <div ref={containerRef} className={clsx('relative -ml-i24 overflow-hidden grid-container', className)}>
        <Swiper
          className='col-span-full w-full'
          modules={[Navigation]}
          speed={700}
          grabCursor
          slidesPerView='auto'
          // watchSlidesProgress
          observer
          // onSwiper={setInstance}
          loop={loop}
          // loopAdditionalSlides={1}
          centeredSlides={centeredSlides}
          initialSlide={0}
          onResize={getColumnWidth}
          // loopPreventsSliding
          // loopAddBlankSlides={true}
          // loopAdditionalSlides={5}
          spaceBetween={`${gridData.gap}`}
          // onRealIndexChange={(swiper) => {
          //   setIsActiveIndex(swiper.realIndex);
          //   callback && callback(swiper.realIndex);
          // }}
          // onSlideChange={(swiper) => {
          //   setIsActiveIndex(swiper.realIndex);
          // }}
        >
          <div className='overflow-hidden'>
            {React.Children.map(children, (child) => (
              <SwiperSlide className={clsx('flex !w-fit gap-i24', slideClassName)}>
                <GridSlide className='h-full' withoutIndents={withoutIndents}>
                  {child}
                </GridSlide>
              </SwiperSlide>
            ))}
          </div>
        </Swiper>
      </div>
    </GridSliderContext.Provider>
  );
}
