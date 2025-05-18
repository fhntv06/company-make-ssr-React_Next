'use client';

import React, { useState } from 'react';
import { FilterButton, Cord, ExpandableContainer, Button } from '@/shared/ui';
import clsx from 'clsx';
// eslint-disable-next-line import/no-cycle
import { JournalTabs, JournalTagList } from '..';
import { IJournalFilters } from '../model/types';
import AuthorList from './AuthorList';

interface Props {
  data: IJournalFilters;
  className?: string;
}

export default function JournalFilter({ data }: Props) {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div className='grid-subcontainer'>
      <JournalTabs className='col-span-4' tabs={data.categories} />
      <div className='col-span-4 hidden lg:block'>
        <FilterButton toggleOpen={toggleOpen} count={0} open={open} />
      </div>
      <Cord className='col-span-full -mx-grid' />
      <div className='col-span-4 mt-4 lg:hidden'>
        <FilterButton toggleOpen={toggleOpen} count={0} open={open} />
      </div>
      <ExpandableContainer
        open={open}
        className={clsx(
          '-mx-grid pb-[calc(theme(spacing.i80)+theme(spacing.grid))] pt-[calc(theme(spacing.i16)+theme(spacing.i16))] grid-container lg:pb-[calc(theme(spacing.i80)+theme(spacing.i32))] lg:pt-i32',
        )}
      >
        <AuthorList className='hidden lg:block' authors={data.authors} />
        <p className='h4 col-span-full mb-4 font-medium lg:hidden'>тэги</p>
        <JournalTagList className='col-span-full mb-4 lg:col-span-2 lg:col-start-5 lg:mb-0' data={data.tags} />
        <JournalTagList className='col-span-full font-medium lg:col-span-2' data={data.education} />
        <p className='h4 col-span-full my-4 font-medium lg:hidden'>авторы</p>
        <AuthorList className='lg:hidden' authors={data.authors} />
        <div className='col-span-4 mt-4 grid grid-cols-4 items-center gap-gap lg:col-start-5 lg:mt-i64'>
          <Button
            onClick={() => {}}
            iconRight='arrow-bottom'
            className='col-span-full md:col-span-2'
            theme='gray'
            size='small'
          >
            применить
          </Button>
          <button onClick={() => {}} className='h4 col-span-full size-fit md:col-span-2'>
            сбросить фильтры
          </button>
        </div>
      </ExpandableContainer>
      <i
        className={clsx('col-span-full -mx-grid mb-grid block h-px bg-black/16 lg:mb-i32 ', {
          'opacity-100 transition-opacity delay-150': open,
          'opacity-0 ': !open,
        })}
      />
    </div>
  );
}
