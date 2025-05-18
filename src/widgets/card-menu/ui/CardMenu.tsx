'use client';

import { LinksCard } from '@/entities/links-card';
import { SiteLink } from '@/shared/lib/types';
import { Slider } from '@/shared/ui';
import clsx from 'clsx';

interface Props {
  data: SiteLink[];
}

export default function CardMenu({ data }: Props) {
  return (
    <div className='col-span-full bg-white bg-opacity-[0.02] backdrop-blur-sm'>
      <div className='hidden !gap-0 lg:grid-subcontainer'>
        {data.map((item, index) => (
          <LinksCard
            key={item.id}
            className={clsx('col-span-2 border-y border-r border-black last:border-r-0', {
              'md:after:hidden': index > 1,
            })}
            title={item.title}
            links={item.children ?? []}
          />
        ))}
      </div>
      <Slider wrapperClassName='col-span-full block lg:hidden' slideClassName='basis-3/4' borderSlides>
        {data.map((item) => (
          <LinksCard key={item.id} title={item.title} links={item.children ?? []} />
        ))}
      </Slider>
    </div>
  );
}
