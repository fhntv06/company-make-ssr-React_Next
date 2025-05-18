import { Icon } from '@/shared/ui';
import { IconNames } from '@/shared/ui/icon/type';
import clsx from 'clsx';
import React from 'react';

interface Props {
  className?: string;
}

const awards = [
  {
    id: 1,
    name: 'dprofile',
    count: 12,
  },
  {
    id: 2,
    name: 'рейтинг рунета',
    count: 7,
  },
  {
    id: 3,
    name: 'золотой сайт',
    count: 2,
  },
  {
    id: 4,
    name: 'tagline awards',
    count: 6,
  },
  {
    id: 5,
    name: 'ruward',
    count: 9,
  },
  {
    id: 6,
    name: 'другие',
    count: 23,
  },
];

const iconMap: { [key: string]: IconNames } = {
  dprofile: 'dprofile-award',
  'рейтинг рунета': 'runet-rating-award',
  'золотой сайт': 'golden-site-award',
  'tagline awards': 'tagline-award',
  ruward: 'ruward-award',
  другие: 'other-award',
};

export default function AwardListMobile({ className }: Props) {
  const getIconName = (awardName: string) => iconMap[awardName];

  return (
    <ul className={clsx('flex flex-wrap justify-between text-white md:hidden', className)}>
      {awards.map((award) => (
        <li
          className='flex w-full items-center justify-between gap-gap border-b border-white/16 py-i24 first:border-t'
          key={award.id}
        >
          <p>
            {award.name} <span className='text-white/64'>× {award.count}</span>
          </p>
          <div className='relative size-8'>
            <Icon className='absolute inset-0 size-full' name={getIconName(award.name)} />
          </div>
        </li>
      ))}
    </ul>
  );
}
