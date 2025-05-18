import React, { FunctionComponentElement } from 'react';
import { Client } from '@/entities/client/model/types';
import Image from 'next/image';
import clsx from 'clsx';
import Link from 'next/link';
// eslint-disable-next-line import/no-unresolved
import plural from 'plural-ru';

interface Props {
  data: Client;
  className?: string;
}

export default function ClientCard({ data, className }: Props): FunctionComponentElement<Props> {
  return (
    <Link
      href={`client/${data.slug}`}
      key={data.id}
      className={clsx(
        'group flex aspect-square size-full flex-col items-center justify-between p-i24',
        'gradient-border gradient-border-bottom',
        className,
      )}
    >
      <div
        className={
          'h4 mr-auto text-white opacity-0 transition-opacity group-hover:pointer-events-auto group-hover:opacity-100'
        }
      >
        {data.title}
      </div>
      <div className='relative size-full max-h-[80px]'>
        <Image fill objectFit='contain' src={data.logotype.url} alt={`slide-${data.title}`} />
      </div>
      <div
        className={
          'p pointer-events-none mr-auto text-white opacity-0 transition-opacity group-hover:pointer-events-auto group-hover:opacity-64'
        }
      >
        {data.projects.length} {plural(data.projects.length, 'проект', 'проекта', 'проектов')}
      </div>
    </Link>
  );
}
