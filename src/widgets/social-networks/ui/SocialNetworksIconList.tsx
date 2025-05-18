import React from 'react';
import { SiteLink } from '@/shared/lib/types';
import Link from 'next/link';
import { Icon } from '@/shared/ui';
import { IconNames } from '@/shared/ui/icon/type';
import clsx from 'clsx';

interface Props {
  data: SiteLink[];
  className?: string;
}

const iconMap: {
  [key: string]: IconNames;
} = {
  't.me': 'telegram',
  'vk.com': 'vk',
  'youtube.com': 'youtube',
  'behance.net': 'behance',
  'dprofile.ru': 'dprofile',
  'vc.ru': 'vc',
};

export default function SocialNetworksIconList({ data, className }: Props) {
  const socialBaseLinks = Object.keys(iconMap);

  const iconList = data.reduce((acc, item) => {
    socialBaseLinks.forEach((baseLink) => {
      if (item.href.includes(baseLink)) {
        acc.push(iconMap[baseLink]);
      }
    });
    return acc;
  }, [] as IconNames[]);

  return (
    <ul className={clsx('flex text-black', className)}>
      {data.map((item, index) => (
        <li className='button-gradient group relative size-12 rounded-2xl lg:size-16 lg:rounded-3xl' key={item.id}>
          <Link
            className='stretched-link inline-flex size-full items-center justify-center'
            href={item.href}
            aria-label={item.title}
            rel='noreferrer'
            target='_blank'
          >
            <Icon className='size-6 group-hover:animate-slide' name={iconList[index]} />
          </Link>
        </li>
      ))}
    </ul>
  );
}
