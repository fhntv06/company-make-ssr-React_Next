import React from 'react';
import clsx from 'clsx';
import { Icon } from '..';

interface Props {
  toggleOpen: () => void;
  open: boolean;
  count: number;
  className?: string;
}

export default function FilterButton({ toggleOpen, open, count, className }: Props) {
  return (
    <button onClick={toggleOpen} className={clsx('h3 inline-flex size-fit items-center font-medium', className)}>
      фильтры
      {!!count && <span className='p ml-1 self-start text-dark dark:text-white/64'>{count}</span>}
      <Icon
        name='plus'
        className={clsx('ml-2 size-4 fill-black transition-transform md:size-6', { 'rotate-45': open })}
      />
    </button>
  );
}
