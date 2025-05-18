import { PropsWithChildren, ReactNode, useEffect, useRef, useState } from 'react';
import { Hint } from '@/shared/ui';
import { AnimatePresence, motion } from 'framer-motion';
import clsx from 'clsx';

interface Props extends PropsWithChildren {
  transparentHint?: boolean;
  hintDescription: ReactNode;
  className?: string;
}

export default function ShowHint({ children, hintDescription, transparentHint = false, className }: Props) {
  const [hintVisibility, setHintVisibility] = useState(false);

  const triggerRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // eslint-disable-next-line consistent-return
    const getHintRightPosition = () => {
      if (triggerRef.current && hintRef.current) {
        const trigger = triggerRef.current;
        const hint = hintRef.current;
        if (trigger.getBoundingClientRect().x > hintRef.current.offsetWidth) {
          if (
            window.innerWidth >
            trigger.getBoundingClientRect().x + hint.offsetWidth / 2 + trigger.offsetWidth / 2 + 15
          ) {
            return -hint.offsetWidth / 2 + trigger.offsetWidth / 2;
          }
          return 0;
        }
        return -hint.offsetWidth + trigger.offsetWidth;
      }
    };

    if (hintVisibility && hintRef.current && triggerRef.current) {
      const hintRightPosition = getHintRightPosition();
      hintRef.current.style.top = `${triggerRef.current.offsetHeight + 16}px`;
      hintRef.current.style.right = `${hintRightPosition ?? 0}px`;
    }
  }, [hintVisibility]);

  return (
    <div className={clsx('relative size-fit', className)}>
      <AnimatePresence>
        <motion.div
          ref={triggerRef}
          onHoverStart={() => setHintVisibility(true)}
          onHoverEnd={() => setHintVisibility(false)}
        >
          {children}
        </motion.div>
        {hintVisibility && (
          <div ref={hintRef} className='absolute'>
            <Hint transparent={transparentHint}>{hintDescription}</Hint>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
