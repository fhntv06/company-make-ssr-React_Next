import React from 'react';
import Icon from '@/shared/ui/icon/Icon';
import clsx from 'clsx';
import { ExpandableContainer } from '@/shared/ui';

interface Props {
  children?: React.ReactNode;
  title?: string;
  isOpened: boolean;
  onClick: () => void;
  className?: string;
}

export default function Accordion({ children, title, isOpened, onClick, className }: Props) {
  return (
    <div
      className={`col-span-full flex flex-col border-b border-light-grey p-[calc(theme(spacing.i24)*2)] ${className}`}
    >
      <button className='flex items-center justify-between' onClick={onClick}>
        <p className='h3 font-medium '>{title}</p>
        <Icon name='plus' className={clsx('size-6 transition-transform duration-200', { 'rotate-45': isOpened })} />
      </button>
      <ExpandableContainer className='mb-[calc(theme(spacing.i24)*2)]' open={isOpened}>
        {children}
      </ExpandableContainer>
    </div>
  );
}
