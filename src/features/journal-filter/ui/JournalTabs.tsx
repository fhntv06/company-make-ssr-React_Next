'use client';

import React from 'react';
import { TabList, Tab, Tabs } from '@/shared/ui';
import clsx from 'clsx';

interface Props {
  className?: string;
  tabs: {
    id: number;
    title: string;
  }[];
}

export default function JournalTabs({ className, tabs }: Props) {
  return (
    <Tabs>
      <TabList
        className={clsx('tag-list relative -mx-grid flex flex-row space-x-grid', className)}
        itemClassName='tag-item'
      >
        {tabs.map((tab) => (
          <Tab key={tab.id} className='h3'>
            {tab.title}
          </Tab>
        ))}
      </TabList>
    </Tabs>
  );
}
