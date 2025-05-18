'use client';

import { PropsWithChildren, forwardRef, useEffect, useRef, useState, useImperativeHandle, Ref } from 'react';
import { ExpandableRef } from '@/shared/lib/types';

interface Props extends PropsWithChildren {
  open: boolean;
  defaultVisibleRows?: number;
  // eslint-disable-next-line max-len
  // На случай если обычный подсчет строк не работает и можно посчитать высоту вне компонента. Например для списка, если у элементов есть отступы
  defaultMinHeight?: number;
  className?: string;
}

const getHeight = (target: HTMLDivElement) => {
  const { height } = target.getBoundingClientRect();
  return height;
};

function ExpandableContainer(
  { open, defaultVisibleRows = 0, defaultMinHeight = 0, children, className = '' }: Props,
  ref: Ref<ExpandableRef>,
) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const [minHeight, setMinHeight] = useState<number>(defaultMinHeight);
  const [maxHeight, setMaxHeight] = useState<number>(0);

  useEffect(
    () => {
      if (wrapperRef.current) {
        setMaxHeight(getHeight(wrapperRef.current));

        if (defaultVisibleRows) {
          const { lineHeight } = window.getComputedStyle(wrapperRef.current);

          setMinHeight(parseInt(lineHeight, 10) * defaultVisibleRows);
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useImperativeHandle(
    ref,
    () => ({
      updateHeight: () => {
        setMaxHeight(getHeight(wrapperRef.current!));
      },
    }),
    [],
  );

  return (
    <div
      style={{ maxHeight: open ? maxHeight : minHeight }}
      className='col-span-full overflow-hidden transition-[max-height]'
    >
      <div ref={wrapperRef} className={className}>
        {children}
      </div>
    </div>
  );
}

export default forwardRef(ExpandableContainer);
