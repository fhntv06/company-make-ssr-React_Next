import React from 'react';
import { Table, Tr, Td, Link } from '@/shared/ui';
import clsx from 'clsx';
import { IRatingItem } from '../model/types';

interface Props {
  className?: string;
  data: IRatingItem[];
}

const breakWord = (word: string): string => {
  return word.replace('-', '-\u200B');
};

export default function RatingTable({ data, className }: Props) {
  return (
    <Table className={clsx('h4', className)}>
      {data.map((rating) => (
        <Tr key={rating.id} className='flex gap-i24'>
          <Td className='col-span-4 flex flex-col lg:hidden'>
            <div>
              <span
                className={clsx('break-words', {
                  'h2 font-medium': rating.priority > 0,
                })}
              >
                {typeof rating.place === 'string' ? breakWord(rating.place) : rating.place}
              </span>
            </div>
            <div className='pt-i12'>
              <span className='col-span-3 break-words'>
                <span className='typo-h4'>{rating.description}</span>
                <div className='pt-i12 text-gray-300'>
                  <Link className='stretched-link typo-p' to={rating.url.href}>
                    {rating.url.title}, <span className='inline'>2024</span>
                  </Link>
                </div>
              </span>
            </div>
          </Td>
          <Td className='col-span-2 hidden items-end justify-between lg:flex'>
            <span
              className={clsx({
                'lg:h2 font-medium': rating.priority > 0,
              })}
            >
              {rating.place}
            </span>
            <div className='flex items-baseline gap-grid lg:hidden'>
              <Link className='stretched-link font-medium' to={rating.url.href}>
                {rating.url.title}
              </Link>
              <span className='p'>2024</span>
            </div>
          </Td>
          <Td className='col-span-full hidden lg:col-span-4 lg:flex'>
            <span>{rating.description}</span>
          </Td>
          <Td className='col-span-2 hidden items-end justify-between lg:flex'>
            <Link className='stretched-link font-medium' to={rating.url.href}>
              {rating.url.title}
            </Link>
            <span className='p'>2024</span>
          </Td>
        </Tr>
      ))}
    </Table>
  );
}
