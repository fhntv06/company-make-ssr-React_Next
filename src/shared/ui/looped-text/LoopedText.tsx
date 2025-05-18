'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

interface Props {
  children: ReactNode;
  className?: string;
}

export default function LoopedText({ children, className = '' }: Props) {
  const textRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [textWidth, setTextWidth] = useState(0);

  useEffect(() => {
    const handleVisibility = () => {
      const textElement = textRef.current;
      if (textElement) {
        const rect = textElement.getBoundingClientRect();
        const visible = rect.top >= 0 && rect.bottom <= window.innerHeight;

        setTextWidth(textElement.offsetWidth);
        setIsVisible(visible);
      }
      requestAnimationFrame(handleVisibility);
    };

    handleVisibility();
    return () => {};
  }, []);

  const loopVariants = {
    animate: {
      x: [0, -textWidth],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: 'loop',
          duration: 15,
          ease: 'linear',
        },
      },
    },
  };

  return (
    <AnimatePresence>
      <div className={clsx('group relative col-span-full flex overflow-hidden', className)}>
        <div className='flex'>
          <motion.div
            key={isVisible ? 'animate' : 'initial'}
            className={'inline whitespace-nowrap'}
            variants={loopVariants}
            animate='animate'
          >
            <div ref={textRef} className='inline'>
              {children}
            </div>
            {children}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
