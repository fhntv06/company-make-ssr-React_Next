'use client';

import clsx from 'clsx';
import { Tag as TagType } from '@/shared/lib/types';

interface Props {
  tag: TagType;
  grey?: boolean;
  size?: 'small' | 'big';
  selected?: boolean;
  className?: string;
}

export default function Tag({ tag, grey = false, size = 'small', selected, className = '' }: Props) {
  return (
    <div
      className={clsx(
        'tag-gradient hover:tag-active relative flex size-fit items-center justify-center overflow-hidden transition before:transition' +
          ' text-center dark:text-black',
        size === 'small' ? 'h-6 rounded-lg px-2 md:h-8 md:rounded-xl md:px-3' : 'h-12 rounded-[18px] px-6',
        grey && tag.type === 1
          ? 'bg-bg-grey'
          : tag.type === 1
            ? 'bg-white '
            : 'bg-black/[32%] text-white backdrop-blur-xl dark:text-white',
        selected && 'tag-active',
        className,
      )}
    >
      <p className={clsx('font-[size:inherit] relative z-10', { h4: size === 'big' })}>{tag?.title}</p>
    </div>
  );
}
