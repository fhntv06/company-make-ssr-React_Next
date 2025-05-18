'use client';

import React, { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useCaseFilterStore } from '@/features/case-filter/model/store';
import { Category } from '@/shared/lib/types';
import { createUrlWithSearchParam } from '@/shared/lib/helpers';
import clsx from 'clsx';
import { TabList, Tab, Tabs } from '@/shared/ui';

interface Props {
  categories: Category[];
  withUrlChange?: boolean;
  className?: string;
}

export default function CasesTabs({ categories, withUrlChange = false, className = '' }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const { filters, setCurrentCategory, updateStories } = useCaseFilterStore();

  useEffect(
    () => {
      if (!withUrlChange) {
        updateStories();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const onSelectCategory = (category: Category) => {
    setCurrentCategory(category);

    if (withUrlChange) {
      router.push(
        decodeURI(
          createUrlWithSearchParam(window.location.origin + pathname, filters as Record<string, unknown>).toString(),
        ),
      );
    }
  };

  return (
    <Tabs>
      {categories && (
        <TabList className={clsx('relative flex flex-row space-x-grid', className)} itemClassName='tag-item'>
          {categories.map((category) => (
            <Tab key={category.id} className='h3' onClick={() => onSelectCategory(category)}>
              {category.title}
            </Tab>
          ))}
        </TabList>
      )}
    </Tabs>
  );
}
