'use client';

import React, { PropsWithChildren, useContext, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import clsx from 'clsx';
import NavigationContext from '@/shared/lib/context/navigation-context';

interface Props extends PropsWithChildren {
  className?: string;
  id?: string;
}

export default function PageTransition({ children, className, id }: Props) {
  const [enter, setEnter] = useState(true);
  const { navigationViaClick, setApplyUrlChangeDelay } = useContext(NavigationContext);

  useEffect(() => {
    setApplyUrlChangeDelay(navigationViaClick);
  }, [navigationViaClick, setApplyUrlChangeDelay]);

  useEffect(() => {
    if (!navigationViaClick) return () => {};

    document.body.classList.add('body-mask');

    window.addEventListener('router:delay', () => {
      setEnter(false);
    });

    return () => {
      document.body.classList.remove('body-mask');
    };
  }, [navigationViaClick]);

  return (
    <>
      {navigationViaClick ? (
        <AnimatePresence>
          {enter && (
            <motion.div
              className={clsx('mt-i32 bg-white', className)}
              id={id}
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ duration: 0.3 }}
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      ) : (
        <div className={className}>{children}</div>
      )}
    </>
  );
}
