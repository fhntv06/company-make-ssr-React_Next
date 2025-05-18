import React from 'react';
import { PageHeader, Link, BlocksHeader, Slider } from '@/shared/ui';
import { ClientCard } from '@/entities/client';
import { ClientAccordionList } from '@/features/client-accordion';
import { Tag as TagType } from '@/shared/lib/types';
import { headers } from 'next/headers';
import { Showreel } from '@/entities/showreel';
import clsx from 'clsx';
import { fetchClients } from '@/entities/client/api/api';
import { ClientsFilter } from '@/features/clients-filter';
import { fetchClientsAccordion } from '@/features/client-accordion/model/api';
import { fetchClientsFilter } from '@/features/clients-filter/model/api';

const tabs = [
  {
    id: 0,
    title: 'клиенты',
    slug: '/clients',
  },
  {
    id: 1,
    title: 'отзывы',
    slug: '/clients/reviews',
  },
];

const tags: TagType[] = [
  {
    id: 1,
    type: 1,
    title: 'государство',
  },
  {
    id: 2,
    type: 1,
    title: 'промышленность и трансопрт',
  },
  {
    id: 3,
    type: 1,
    title: 'финансы и телеком',
  },
  {
    id: 4,
    type: 1,
    title: 'медицина',
  },
  {
    id: 5,
    type: 1,
    title: 'сфера услуг',
  },
  {
    id: 6,
    type: 1,
    title: 'cтартапы',
  },
];

export default async function ClientsPage() {
  const clientsSliderData = await fetchClients();
  const clientsAccordionData = await fetchClientsAccordion();
  const filter = await fetchClientsFilter();

  const pathname = headers().get('x-pathname');

  return (
    <main className='grid-container'>
      <PageHeader title='клиенты' withBackLink>
        <div className='col-span-full grid-subcontainer'>
          <div className='h3 col-span-4 flex flex-row space-x-6'>
            {tabs.map((tab) => (
              <Link className={clsx({ 'text-white/64': pathname !== tab.slug })} to={tab.slug} key={tab.id}>
                {tab.title}
              </Link>
            ))}
          </div>
          <ClientsFilter filter={filter} data={clientsAccordionData} />
          <p className='h3 col-span-4'>
            150+ компаний и государственных учреждений доверились нам. со многими сотрудничаем более пяти лет
          </p>
        </div>
      </PageHeader>
      <section className='col-span-full -mx-grid mt-[calc(theme(spacing.i16)+theme(spacing.i16))] md:mt-i32'>
        <Slider
          slideClassName='lg:basis-[calc((100%-theme(spacing.grid))/4)] md:basis-[calc((100%-theme(spacing.grid))/3)] basis-[calc((100%-theme(spacing.grid)))]'
          borderSlides
        >
          {clientsSliderData.map((slide) => (
            <ClientCard key={slide.id} data={slide} />
          ))}
        </Slider>
      </section>
      <section className='col-span-full'>
        <ClientAccordionList data={clientsAccordionData} filter={filter} className='-mx-grid' />
      </section>
      <section className='col-span-full -mx-grid mt-i120'>
        <Showreel
          media={{ type: 'video', url: 'https://kinescope.io/embed/6fDTjWAubgzmt7ADqh1SXU' }}
          header={<BlocksHeader tags={tags} />}
          preview={'/images/showrel.jpg'}
        />
      </section>
    </main>
  );
}
