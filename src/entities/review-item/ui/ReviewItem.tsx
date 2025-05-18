import React from 'react';
import { Tr, Td, Tag, Link } from '@/shared/ui';
import clsx from 'clsx';
import { IReviewItem } from '@/shared/lib/types';

interface Props {
  data: IReviewItem;
  className?: string;
}

export default function ReviewItem({ data, className }: Props) {
  return (
    <Tr className={clsx('relative transition-colors duration-200', className)}>
      <Td className='col-span-full grid-subcontainer'>
        <div className='col-span-full flex items-center justify-between lg:col-span-4 lg:mb-0'>
          <Link className='h4 md:h3 stretched-link font-medium' to='#0'>
            {data.title}
          </Link>
        </div>
        <div className='col-span-2'>
          <span className='p text-grey md:text-white'>{data.author}</span>
          <span className='p text-grey md:hidden md:text-white'>, .{data.file.extension}</span>
        </div>
        <div className='col-span-2 hidden justify-between gap-i12 lg:flex'>
          <div className='flex flex-wrap'>
            {data.tags[0] && <Tag tag={data.tags[0]} />}
            {data.tags[1] && <Tag tag={data.tags[1]} />}
          </div>
          <span>.{data.file.extension}</span>
        </div>
      </Td>
    </Tr>
  );
}
