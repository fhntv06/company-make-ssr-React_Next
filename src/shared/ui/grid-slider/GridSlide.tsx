import React, { useContext, useEffect, useRef } from 'react';
import {
  // useSwiperSlide,
  useSwiper,
} from 'swiper/react';
import clsx from 'clsx';
import GridSliderContext from './GridSliderContext';

interface Props {
  children: React.ReactNode;
  className?: string;
  withoutIndents?: boolean;
}

const defaultColumns = 2;

export default function GridSlide({ children, className, withoutIndents = false }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const prevContext = useRef(null);
  const context = useContext(GridSliderContext);
  const swiper = useSwiper();
  // const slide = useSwiperSlide();

  useEffect(() => {
    const el = ref.current;

    const setWidthSlider = (cardWidth: number | string) => {
      if (!el) return;
      el.style.width = `${cardWidth}px`;
      swiper.update();
      // @ts-ignore
      prevContext.current = context;
    };

    if (el && el.firstChild && JSON.stringify(prevContext.current) !== JSON.stringify(context)) {
      const { gridColumnStart } = window.getComputedStyle(el.firstChild as Element);
      const columns = parseInt(gridColumnStart.split(' ')[1], 10) || defaultColumns;
      const withoutIndentsColumns = withoutIndents ? columns : columns - 1;
      const cardWidth = columns * context.columnWidth + withoutIndentsColumns * context.gap;

      setWidthSlider(cardWidth);

      el.style.setProperty('--slide-columns', `${columns}`);
    }
  }, [context, swiper, withoutIndents]);

  // const onClick = ({ e }: any) => {
  //   if (e) {
  //     e.preventDefault();
  //     e.stopPropagation();
  //   }
  //
  //   return slide.isNext
  //     ? swiper.slideNext()
  //     : swiper.slidePrev();
  // };

  return (
    <div
      ref={ref}
      // onClick={onClick}
      role='presentation'
      className={clsx('relative flex items-center justify-items-center', className)}
    >
      {children}
    </div>
  );
}
