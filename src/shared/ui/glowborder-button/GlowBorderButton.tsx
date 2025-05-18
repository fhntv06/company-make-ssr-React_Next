import React from 'react';
import clsx from 'clsx';
import Icon from '../icon/Icon';

interface Props {
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  className?: string;
}

export default function GlowBorderButton({ onClick, className }: Props) {
  return (
    <div className='group pointer-events-none fixed left-0 top-0 z-50 h-screen w-screen'>
      <button
        onClick={onClick}
        className={clsx(
          'pointer-events-auto absolute bottom-grid right-grid flex items-center justify-center',
          'bg-main-gradient-2',
          'size-12 rounded-2xl lg:size-16 lg:rounded-3xl',
          className,
        )}
      >
        <div className='relative z-10 flex size-[inherit] scale-95 items-center justify-center rounded-[inherit] bg-gray-50'>
          <span className='relative z-20 bg-gray-50'>
            <Icon name={'envelope'} className={'size-6 text-black group-hover:animate-slide dark:text-black'} />
          </span>
        </div>
        <div className='absolute inset-0 -z-10 size-[inherit] rounded-[inherit] bg-main-gradient-2' />
      </button>
    </div>
  );
}
