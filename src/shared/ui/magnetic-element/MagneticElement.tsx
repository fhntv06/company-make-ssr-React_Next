'use client';

import { PropsWithChildren, useCallback, useRef } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import clsx from 'clsx';

const FACTOR = 28; // Фактор равен области вокруг элемента, на которой срабатывает эффект

interface Props extends PropsWithChildren {
  className?: string;
}

export default function MagneticElement({ className, children }: Props) {
  const rect = useRef<DOMRect>();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseMove = useCallback((e: MouseEvent) => {
    if (!rect.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = rect.current;
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    x.set(((clientX - centerX) / (centerX - left + FACTOR)) * FACTOR);
    y.set(((clientY - centerY) / (centerY - top + FACTOR)) * FACTOR);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onHoverStart = (e: MouseEvent) => {
    const t = e.target as HTMLElement;
    rect.current = t.getBoundingClientRect();

    t.addEventListener('mousemove', mouseMove);
  };

  const onHoverEnd = (e: MouseEvent) => {
    const t = e.target as HTMLElement;

    x.set(0);
    y.set(0);
    t.removeEventListener('mousemove', mouseMove);
  };

  return (
    <motion.div
      style={{ x, y }}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      className={clsx('relative transition-transform before:absolute before:-inset-7', className)}
    >
      {children}
    </motion.div>
  );
}
