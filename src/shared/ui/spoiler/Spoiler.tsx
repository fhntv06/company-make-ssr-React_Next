'use client';

import { PropsWithChildren, useState } from 'react';
import ExpandableContainer from '@/shared/ui/expandable-container/ExpandableContainer';
import Icon from '@/shared/ui/icon/Icon';
import clsx from 'clsx';

interface Props extends PropsWithChildren {
  className?: string;
  defaultVisibleRows?: number;
  defaultMinHeight?: number;
}

export default function Spoiler({ className, children, defaultVisibleRows = 3, defaultMinHeight = 0 }: Props) {
  const [open, setOpen] = useState<boolean>(false);

  const toggleOpenState = () => {
    setOpen(!open);
  };

  return (
    <div className={clsx('flex flex-col', className)}>
      <ExpandableContainer open={open} defaultVisibleRows={defaultVisibleRows} defaultMinHeight={defaultMinHeight}>
        {children}
      </ExpandableContainer>
      <button
        onClick={toggleOpenState}
        className={clsx('flex items-center gap-i12 self-end uppercase', { 'pt-i16': open })}
      >
        {!open ? 'Развернуть' : 'Свернуть'}
        <Icon name='dropdown' className={clsx('size-6 transition', { 'rotate-180': open })} />
      </button>
    </div>
  );
}
