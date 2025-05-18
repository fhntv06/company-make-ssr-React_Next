'use client';

import { FunctionComponentElement, PropsWithChildren, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Icon from '@/shared/ui/icon/Icon';
import clsx from 'clsx';

interface Props extends PropsWithChildren {
  open: boolean;
  onClose: () => void;
  mode?: 'center' | 'right' | 'left' | 'fullscreen' | 'top';
  className?: string;
  contentClassName?: string;
  wrapperClassName?: string;
  withoutCloseButton?: boolean;
  withoutSpacing?: boolean;
  closeByMouseLeave?: boolean;
}

function Portal({ children }: PropsWithChildren) {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted && createPortal(children, document.body);
}

export default function Modal({
  open,
  onClose,
  mode = 'center',
  children,
  className,
  contentClassName,
  wrapperClassName,
  withoutCloseButton = false,
  withoutSpacing = false,
  closeByMouseLeave = false,
}: Props): FunctionComponentElement<Props> {
  const ref = useRef<HTMLDivElement | null>(null);

  const onOverlayClick = (e: React.MouseEvent) => {
    if (e.target === ref.current) {
      e.stopPropagation();
      onClose();
    }
  };

  const animation = useMemo(
    () => {
      switch (mode) {
        case 'left':
        case 'fullscreen':
          return {
            initial: { x: '-100%' },
            animate: { x: 0 },
          };
        case 'right':
          return {
            initial: { x: '100%' },
            animate: { x: 0 },
          };
        case 'top':
          return {
            initial: { y: '-100%' },
            animate: { y: 0 },
          };
        default:
          return {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
          };
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <Portal>
      <AnimatePresence>
        {open && (
          <motion.div
            ref={ref}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className={clsx(
              'fixed inset-0 grid grid-cols-8 items-center gap-x-i24 overflow-auto bg-black/16',
              className,
            )}
            onClick={onOverlayClick}
            onMouseMove={closeByMouseLeave ? onOverlayClick : () => {}}
          >
            <motion.div
              initial={animation.initial}
              animate={animation.animate}
              exit={animation.initial}
              transition={{ duration: 0.2 }}
              className={clsx(
                'relative bg-dark',
                {
                  'px-grid': !withoutSpacing,
                  'col-start-1 col-end-7 min-h-[50vh]': mode === 'center',
                  'col-span-4 h-full': mode === 'left',
                  'col-span-full h-full': mode === 'fullscreen',
                  'col-start-4 col-end-9 h-full': mode === 'right',
                  'col-span-full min-h-[50vh] self-start': mode === 'top',
                },
                contentClassName,
              )}
            >
              {!withoutCloseButton && (
                <button className='absolute right-grid top-grid z-[60]' onClick={onClose}>
                  <Icon name='cross' className='size-6 fill-current' />
                </button>
              )}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { delay: 0, duration: 0.1 } }}
                transition={{ duration: 0.2, delay: 0.2 }}
                className={wrapperClassName}
              >
                {children}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Portal>
  );
}
