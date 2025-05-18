'use client';

import { Person } from '@/shared/lib/types';
import React, { useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';

interface Props {
  className?: string;
  authors: Person[];
  align?: 'left' | 'right';
}

export default function AuthorList({ authors, align = 'left', className }: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const mouseEnterHandler = (index: number) => {
    setActiveIndex(index);
  };

  const mouseLeaveHandler = () => {
    setActiveIndex(null);
  };

  return (
    <div className={clsx('col-span-2 lowercase', className)}>
      <ul
        className={clsx('mb-4 flex w-[calc(48px*4)] flex-wrap gap-0 lg:w-[calc(64px*4)]', {
          'ml-auto justify-end': align === 'right',
        })}
      >
        {authors.map((author, index) => (
          <li
            key={author.id}
            className={clsx('size-12 transition-[filter]', {
              'grayscale-0': activeIndex === index,
              grayscale: activeIndex !== index && activeIndex !== null,
            })}
            onMouseEnter={() => {
              mouseEnterHandler(index);
            }}
            onMouseLeave={mouseLeaveHandler}
          >
            <button className='relative size-full'>
              <Image fill objectFit='cover' src={author.photo.url} alt={author.name} />
            </button>
          </li>
        ))}
      </ul>
      <div
        className={clsx('transition-opacity', {
          'ml-auto w-fit': align === 'right',
          'opacity-0': activeIndex === null,
        })}
      >
        <p className='capitalize'>
          {authors[activeIndex ?? 0].name} {authors[activeIndex ?? 0].surname}
        </p>
        <p>{authors[activeIndex ?? 0].description}</p>
      </div>
    </div>
  );
}
