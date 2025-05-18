'use client';

import { VerticalTab as VerticalTabType } from '@/features/vertical-tabs/types/types';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@/shared/ui';
import Image from 'next/image';
import { PageVideo } from '@/entities/page-video';

interface Props {
  data: VerticalTabType[];
  className?: string;
}

export default function VerticalTabs({ data, className = '' }: Props) {
  return (
    <div className={`col-span-full mt-i32 grid-cols-4 gap-x-5 px-0 md:grid-cols-8 ${className}`}>
      <Tabs>
        <TabList className='col-span-full space-y-2 md:col-span-3' row={false}>
          {data.map((item) => (
            <Tab key={item.id} className='h2 text-left'>
              {item.title}
            </Tab>
          ))}
        </TabList>
        <div className='col-span-full md:col-span-4 md:col-start-5'>
          <TabPanels>
            {data.map((item) => (
              <TabPanel key={item.id}>
                <p className='h4'>{item.description}</p>
                {item.cover.type === 'video' && <PageVideo data={item} className='mt-i64' />}
                {item.cover.type === 'image' && (
                  <div className='relative mt-i64 flex aspect-video items-center justify-center'>
                    <Image src={item.cover.url} alt='Alt' fill objectFit='cover' />
                  </div>
                )}
              </TabPanel>
            ))}
          </TabPanels>
        </div>
      </Tabs>
    </div>
  );
}
