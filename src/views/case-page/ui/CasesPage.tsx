import { fetchCategories } from '@/entities/categories';
import { fetchArchiveCases, fetchCases } from '@/entities/case';
import { CaseFilter } from '@/features/case-filter';
import { CasesArchive, CasesList } from '@/widgets/cases';
import React, { Suspense } from 'react';
import { fetchTags } from '@/entities/showreel/api';
import BlocksHeader from '@/shared/ui/blocks-header/BlocksHeader';
import { PageHeader, Slider } from '@/shared/ui';
import { Showreel } from '@/entities/showreel';
import { ClientCard } from '@/entities/client';
import { fetchClients } from '@/entities/client/api/api';

export default async function CasesPage() {
  const categories = await fetchCategories();
  const cases = await fetchCases();
  const archiveCases = await fetchArchiveCases({ _page: 1 });
  const tags = await fetchTags();
  const clients = await fetchClients();

  return (
    <>
      {/* eslint-disable-next-line tailwindcss/no-custom-classname */}
      <main className='pt-i160 grid-container'>
        <PageHeader title='Кейсы'>
          <div className='col-span-full'>
            <Suspense>
              <CaseFilter categories={categories} />
            </Suspense>
          </div>
        </PageHeader>
        {/* <h1 className='text-h1-big col-span-full mb-i120 text-center font-medium lowercase'>Кейсы</h1> */}
        <CasesList data={cases} className='mb-i120' />
        <CasesArchive data={archiveCases.data} lastPage={archiveCases.last} />
      </main>
      <Showreel
        media={{ type: 'video', url: 'https://kinescope.io/embed/6fDTjWAubgzmt7ADqh1SXU' }}
        header={<BlocksHeader tags={tags} />}
        preview={'/images/showrel.jpg'}
        footer={
          <div className='col-span-full px-grid text-white'>
            <p className='h3'>клиенты</p>
          </div>
        }
        className='h-screen'
      />
      <div className='col-span-full -mx-grid bg-dark'>
        <Slider
          wrapperClassName='col-span-full'
          slideClassName='lg:basis-[calc((100%-theme(spacing.grid))/4)] md:basis-[calc((100%-theme(spacing.grid))/3)] basis-[calc((100%-theme(spacing.grid)))] !border-white'
          borderSlides
        >
          {clients.map((slide) => (
            <ClientCard key={slide.id} data={slide} />
          ))}
        </Slider>
      </div>
    </>
  );
}
