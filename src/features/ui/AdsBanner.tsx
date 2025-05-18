import React from 'react';
import { Client } from '@/entities/client';
import { AdsBannerData } from '@/shared/lib/types';
import { Link, Tag } from '@/shared/ui';
import clsx from 'clsx';

interface Props {
  data: AdsBannerData;
  className?: '';
}

export default function AdsBanner({ data, className }: Props) {
  return (
    <div
      className={clsx('col-span-full aspect-[3/1] gap-i32 bg-bg-grey pb-i32 pt-i24 grid-container lg:gap-0', className)}
    >
      <div className='col-span-full flex gap-i32 lg:col-span-2'>
        <Client data={data.mainClient} />
        <span className='h3 text-dark'>{data.mainClient.name}</span>
      </div>
      <div className='col-span-full lg:col-span-4'>
        <h2>{data.title}</h2>
      </div>
      <div className='col-span-full lg:col-span-2'>
        <div className='flex flex-wrap justify-end gap-y-2'>
          {data.tags.map((item) => (
            <Tag key={item.id} tag={item} />
          ))}
        </div>
      </div>
      <div className='col-span-2 flex items-end'>
        {data.clients.map((client) => (
          <Client data={client} key={client.id} />
        ))}
      </div>
      <div className='col-span-2 grid grid-cols-4 lg:col-span-4'>
        <div className='col-span-full flex items-end typo-h4 lg:col-span-2'>{data.description}</div>
      </div>
      <div className='col-span-full flex items-end justify-end lg:col-span-2 lg:justify-stretch'>
        <Link to='#0' className='font-medium typo-h4'>
          {data.link}
        </Link>
      </div>
    </div>
  );
}
