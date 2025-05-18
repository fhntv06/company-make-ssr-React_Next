'use client';

import { WorkFormatType } from '@/shared/lib/types';
import React, { useRef, useState } from 'react';
import { Link, Tag } from '@/shared/ui';
import clsx from 'clsx';
import Image from 'next/image';
import { MagneticClientList } from '@/entities/magnetic-client-list';
import { Client } from '@/entities/client';
import { type Client as TClient } from '@/shared/lib/types';

interface Props {
  data: WorkFormatType;
  className?: string;
  withMagneticClientList?: boolean;
  hoveredItem?: number | null;
  index?: number | null;
}

const clientsLogo: TClient[] = [
  {
    id: 1,
    icon: 'images/clients_magnetic/roskosmos.svg',
    name: 'roskosmos',
  },
  {
    id: 2,
    icon: 'images/clients_magnetic/gbs.svg',
    name: 'gbs',
  },
  {
    id: 3,
    icon: 'images/clients_magnetic/ami.svg',
    name: 'ami',
  },
  {
    id: 4,
    icon: 'images/clients_magnetic/kuzbas-gov.svg',
    name: 'kuzbas-gov',
  },
  {
    id: 5,
    icon: 'images/clients_magnetic/vector.svg',
    name: 'vector',
  },
  {
    id: 6,
    icon: 'images/clients_magnetic/zhns.svg',
    name: 'zhns',
  },
  {
    id: 7,
    icon: 'images/clients_magnetic/savoy.svg',
    name: 'savoy',
  },
  {
    id: 8,
    icon: 'images/clients_magnetic/gosveb.svg',
    name: 'gosveb',
  },
  {
    id: 9,
    icon: 'images/clients_magnetic/yanao.svg',
    name: 'yanao',
  },
  {
    id: 10,
    icon: 'images/clients_magnetic/rostelekom.svg',
    name: 'rostelekom',
  },
  {
    id: 11,
    icon: 'images/clients_magnetic/optitech.svg',
    name: 'optitech',
  },
];

export default function BigInfoCard({
  data,
  withMagneticClientList = false,
  hoveredItem = null,
  index = null,
  className,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      className={clsx(
        'relative col-span-4 flex flex-col border-black p-4 md:p-6 md:first:border-r',
        'size-full md:aspect-[8/9] md:max-h-[848px]',
        'lg:gradient-border lg:gradient-border-bottom',
        'hover:before:w-full',
        {
          'select-all md:select-none': withMagneticClientList,
        },
        className,
      )}
      onMouseEnter={() => setHovered(true)}
    >
      <div className='grid grid-cols-4'>
        <div className='col-span-full row-start-1 mb-0 md:col-span-2 md:mb-i16'>
          <Link
            to='#0'
            className={clsx('h3 font-medium lowercase', {
              'stretched-link': !withMagneticClientList,
            })}
          >
            {data.title}
          </Link>
        </div>
        {data.keywords && (
          <div className='col-span-full row-start-4 mt-i32 hidden flex-wrap justify-start gap-2 md:col-span-2 md:row-start-1 md:mt-0 md:flex md:justify-end'>
            {data.keywords.map((keyword) => (
              <Tag key={keyword.id} tag={keyword} />
            ))}
          </div>
        )}
        <div className='col-span-full col-start-1 mt-i32 flex flex-col gap-i16 md:col-span-2 md:col-start-2'>
          <h4
            className={clsx('text-black/65 transition-colors', {
              'md:text-black/64': hoveredItem !== index && hoveredItem !== null,
              'md:text-black': hoveredItem === index || hoveredItem === null,
            })}
          >
            {data.image && (
              <div
                className={clsx('relative mb-i48 block aspect-[3/1] transition-opacity md:hidden', {
                  'md:opacity-64': hoveredItem !== index && hoveredItem !== null,
                  'md:opaicty-100': hoveredItem === index || hoveredItem === null,
                })}
              >
                <Image src={data.image.url} alt={data.image.url} fill objectFit='contain' />
              </div>
            )}
            {data.subtitle}
          </h4>
          <p>{data.description}</p>
        </div>
      </div>
      {data.image && (
        <div
          className={clsx('relative mt-i80 hidden aspect-[3/1] transition-opacity md:block', {
            'md:opacity-64': hoveredItem !== index && hoveredItem !== null,
            'md:opaicty-100': hoveredItem === index || hoveredItem === null,
          })}
        >
          <Image src={data.image.url} alt={data.image.url} fill objectFit='contain' />
        </div>
      )}
      {data.tags && (
        <div className='mb-i64 mt-auto hidden flex-wrap md:mb-0 md:flex'>
          {data.tags.map((tag) => (
            <Tag key={tag.id} tag={tag} className='!bg-black/[6%]' size='big' />
          ))}
        </div>
      )}
      {withMagneticClientList && (
        <div className='tag-list col-span-full -mx-grid mt-i80 gap-2 md:hidden '>
          {clientsLogo.map((logo) => (
            <div className='tag-item w-fit' key={logo.id}>
              <Client data={logo} size='large' key={logo.id} />
            </div>
          ))}
        </div>
      )}
      <div className='hidden md:block'>
        {withMagneticClientList && hovered && <MagneticClientList outsideContainerRef={ref} />}
      </div>
    </div>
  );
}
