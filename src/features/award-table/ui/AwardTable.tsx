import { Award } from '@/entities/award';
import { Table, Tr, Td, Link } from '@/shared/ui';
import clsx from 'clsx';
import React from 'react';
// eslint-disable-next-line import/no-cycle
import { AwardItem } from '../model/types';

interface Props {
  data: AwardItem[];
  className?: string;
}

export default function AwardTable({ data, className }: Props) {
  return (
    <Table className={clsx('h4', className)}>
      {data.map((item, index) => (
        <Tr
          key={item.id}
          className={clsx(
            'relative !flex !items-center justify-between',
            'after:absolute after:bottom-0 after:right-0',
            'after:mx-[calc(theme.spacing.grid*-2)] after:h-px after:w-screen',
            'after:bg-black/16 after:content-[""] after:dark:bg-white/64 after:md:dark:bg-white/16',
            'lg:!grid',
            '!border-0',
          )}
          style={{ zIndex: data.length - index }}
        >
          <Td className='col-span-4 flex grid-cols-4 flex-col justify-between gap-x-6 lg:grid'>
            <Link className='stretched-link mb:my-0 col-span-2 mb-1 font-medium' to={item.url}>
              {item.title}
            </Link>
            <div className='p lg:h4 col-span-2 text-grey md:col-span-2 lg:text-white' role='presentation'>
              {item.award_name}
            </div>
          </Td>
          <Td className='col-span-3 hidden lg:block'>{item.category}</Td>
          <Td className='col-span-1 flex justify-between lg:items-center'>
            <span className='p hidden lg:block'>{item.year}</span>
            <Award className='z-10' award={item.award} mask={item.award_name === 'dprofile'} />
          </Td>
        </Tr>
      ))}
    </Table>
  );
}
