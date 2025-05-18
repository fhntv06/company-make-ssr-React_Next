'use client';

import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { Button } from '..';

interface Props {
  className?: string;
  to?: string;
}

export default function ToTopButton({ className, to = 'page-start' }: Props) {
  const [visible, setVisible] = useState(false);
  const [scrolledUp, setScrolledUp] = useState(false);
  const previousScrollY = useRef(0);
  const element = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!to) return;

    element.current = document.getElementById(to);
  }, [to]);

  useEffect(() => {
    const buttonVisibilityHandler = () => {
      setVisible(window.scrollY > window.innerHeight);
      setScrolledUp(window.scrollY > previousScrollY.current);
      previousScrollY.current = window.scrollY;
    };

    window.addEventListener('scroll', buttonVisibilityHandler);

    return () => {
      window.removeEventListener('scroll', buttonVisibilityHandler);
    };
  }, []);

  const toTopHandler = () => {
    if (!element.current) return;

    element.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Button
      iconRight='arrow-up'
      theme='gray'
      className={clsx(
        'transition-opacity',
        {
          'user-select-none pointer-events-none opacity-0': !visible || scrolledUp,
          'user-select-auto pointer-events-auto': visible && !scrolledUp,
        },
        className,
      )}
      onClick={toTopHandler}
    />
  );
}
