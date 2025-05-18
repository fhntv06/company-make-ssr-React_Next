'use client';

import clsx from 'clsx';
import { PropsWithChildren, useEffect, useRef } from 'react';
import { useInView, useMotionValue, useSpring } from 'framer-motion';
import htmlParser from 'html-react-parser';

interface Infographics extends PropsWithChildren {
  toNumber: number;
  text: string;
  prefix?: string;
  postfix?: string;
  small?: boolean;
  isAnimation?: boolean;
  type?: 'integer' | 'float';
  direction?: 'up' | 'down';
  className?: string;
  fromNumber?: number;
}

const FormaterType = {
  integer: (number: number): number => Math.floor(number),
  float: (number: number): number => parseFloat(number.toFixed(1)),
};

const Infographics = ({
  toNumber,
  text,
  prefix = '',
  postfix = '',
  small = false,
  isAnimation = false,
  type = 'integer',
  className = '',
  direction = 'up',
  fromNumber = 0,
  children,
}: Infographics) => {
  const ref = useRef<HTMLDivElement>(null);
  const motionValue = useMotionValue(direction === 'down' ? toNumber : fromNumber);
  const springValue = useSpring(motionValue, { damping: 100, stiffness: 100 });
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const setFormat = FormaterType[type];

  useEffect(
    () => {
      if (isInView) {
        motionValue.set(direction !== 'down' ? toNumber : fromNumber);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [motionValue, isInView],
  );

  useEffect(
    () =>
      springValue.on('change', (latest: number) => {
        if (ref.current) {
          ref.current.textContent = Intl.NumberFormat('en-US').format(setFormat(latest));
        }
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [springValue],
  );

  return (
    <div className={clsx('col-span-2', small && 'block items-center justify-center space-y-2 lg:space-y-0')}>
      <div
        className={clsx(
          'relative flex items-center font-medium leading-[0.85] text-white',
          small ? 'h2' : 'h-numbers',
          className,
          small && 'w-fit md:w-full ',
        )}
      >
        {Boolean(prefix) && <span>{prefix}</span>}
        {isAnimation ? <div ref={ref} className={className} /> : toNumber}
        {Boolean(postfix) && <span>{postfix}</span>}
      </div>
      <div className='space-y-2 lg:space-y-0'>
        <p className='h4 text-white'>{htmlParser(text)}</p>
        {children}
      </div>
    </div>
  );
};

export default Infographics;
