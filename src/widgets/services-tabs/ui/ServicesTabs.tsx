'use client';

import React from 'react';
import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Cord,
  Link,
  ExpandableContainer,
  Icon,
  ElementsList,
} from '@/shared/ui';
import { ServiceCard } from '@/features/service-card';
import { ServiceCard as ServiceCardType } from '@/shared/lib/types';
import clsx from 'clsx';

interface Props {
  data: ServiceCardType[];
}

const tabs = [
  {
    id: 0,
    title: 'услуги',
  },
  {
    id: 1,
    title: 'отраслевые решения',
  },
];

export default function Services({ data }: Props) {
  const [activeTab, setActiveTab] = React.useState<number | null>(null);

  return (
    <Tabs>
      <TabList className='col-span-4 lg:col-span-6'>
        {tabs.map((tab) => (
          <Tab key={tab.id} className='h3'>
            {tab.title}
          </Tab>
        ))}
      </TabList>
      <div className='col-span-2 hidden pb-i32 lg:block lg:pb-0'>
        <Link to='#work-formats' className='h3 font-medium'>
          форматы работ
        </Link>
      </div>
      <Cord className='col-span-full -mx-grid' />
      <TabPanels>
        <TabPanel className='col-span-full mt-i32'>
          <div className='col-span-full mb-i80 grid-subcontainer'>
            <p className='h3 col-span-full lg:col-span-4'>
              разрабатываем, продвигаем и поддерживаем цифровые продукты. запускаем с нуля и развиваем существующие
              сервисы
            </p>
            <div className='col-span-full col-start-1 flex flex-col lg:col-span-2 lg:col-start-7'>
              <div className='col-span-2 mt-i64 block pb-i32 lg:hidden lg:pb-0'>
                <Link to='#work-formats' className='h3 font-medium'>
                  форматы работ
                </Link>
              </div>
              <ElementsList className='h4 col-span-2 flex flex-col gap-2 lg:col-start-7 '>
                <div>
                  <Link to='#0'>как мы работаем</Link>
                </div>
                <div>
                  <Link to='#0' className='max-[1194px]:base-link-hover'>
                    презентация
                  </Link>
                </div>
              </ElementsList>
            </div>
          </div>
          <div className='col-span-full -mx-grid hidden border-t border-black/15 lg:block'>
            {data.map((item) => (
              <ServiceCard key={item.id} service={item} />
            ))}
          </div>
          <div className='col-span-full -mx-grid block lg:hidden'>
            {data.map((item, index) => (
              <div
                key={item.id}
                className={clsx(
                  'border-t border-black/15 pt-i32 last:mb-0 last:border-b',
                  index === activeTab && 'gradient-border-top gradient-border gradient-border-active',
                )}
              >
                <button
                  onClick={() => {
                    if (index === activeTab) {
                      setActiveTab(null);
                    } else {
                      setActiveTab(index);
                    }
                  }}
                  className='h3 mb-i16 flex w-full items-center justify-between px-grid font-medium text-black'
                >
                  {item.title}
                  <Icon name={index === activeTab ? 'cross' : 'plus'} className='ml-2 size-6 fill-black' />
                </button>
                <ExpandableContainer open={index === activeTab}>
                  <div>
                    <ServiceCard service={item} />
                  </div>
                </ExpandableContainer>
              </div>
            ))}
          </div>
        </TabPanel>
        <TabPanel className='mt-i32'>Таб с другим контентом</TabPanel>
      </TabPanels>
    </Tabs>
  );
}
