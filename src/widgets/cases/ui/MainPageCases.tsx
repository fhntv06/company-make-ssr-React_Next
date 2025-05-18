'use client';

import React from 'react';
import { type Case, CaseCard } from '@/entities/case';
import { Button, Link, Cord } from '@/shared/ui';
import { Category } from '@/shared/lib/types';
import { StoriesList } from '@/widgets/stories-list';
import { CaseTabs, useCaseFilterStore } from '../../../features/case-filter';

interface Props {
  data: Case[];
  services: Category[];
}

export default function Cases({ data, services }: Props) {
  const { cases, stories } = useCaseFilterStore();

  const caseList = cases ?? data;
  const filteredStories = stories && stories.filter((story) => story.content.length > 0);

  return (
    <>
      {services && (
        // eslint-disable-next-line tailwindcss/no-custom-classname
        <div className='tag-list relative -mx-grid flex'>
          <CaseTabs categories={services} />
          <Link to='/cases?categoryId=1' className='h3 h-fit pr-grid font-medium lg:ml-auto'>
            все кейсы
          </Link>
        </div>
      )}
      <Cord className='-mx-grid mb-[calc(theme(spacing.i16)+theme(spacing.i16))] md:mb-i32' />
      {stories && !!stories.length && (
        <div className='col-span-full mb-i80 overflow-x-auto scrollbar-none lg:-mx-grid lg:overflow-x-visible lg:grid-subcontainer'>
          <div className='hidden lg:col-span-2 lg:block'>
            <p className='relative inline before:absolute before:left-[calc(100%+4px)] before:top-0 before:size-2 before:rounded-full before:bg-accent-red'>
              live
            </p>
          </div>
          <div className='col-span-full flex flex-wrap gap-x-i24 md:col-span-4 lg:justify-center'>
            {filteredStories && <StoriesList className='-mx-grid' data={filteredStories} />}
          </div>
        </div>
      )}
      <div className='flex flex-col lg:items-center'>
        {caseList && (
          <div className={'grid-rows-min-content col-span-full mb-i120 gap-x-i24 gap-y-i80 grid-subcontainer'}>
            {caseList.map((caseItem, index) => {
              const prevCase = index > 0 ? caseList[index - 1] : null;
              const cols = prevCase && caseItem.position === 2 && prevCase?.position === 2 ? 4 : caseItem.position;

              return <CaseCard key={caseItem.id} data={caseItem} columns={cols} />;
            })}
          </div>
        )}
        <Button className='mb-i168' iconRight='arrow-right' href='/cases' theme='gray'>
          Все кейсы
        </Button>
      </div>
    </>
  );
}
