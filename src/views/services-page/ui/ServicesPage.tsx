import { ServicesTabs } from '@/widgets/services-tabs';
import { fetchWorkFormats, BigInfoCardWrapper } from '@/entities/big-info-card';
import { PageHeader } from '@/shared/ui';
import { fetchServiceCards } from '@/features/service-card';
import { Showreel } from '@/entities/showreel';
import React from 'react';

export default async function CasesPage() {
  const serviceCards = await fetchServiceCards();
  const workFormats = await fetchWorkFormats();

  return (
    <>
      {/* eslint-disable-next-line tailwindcss/no-custom-classname */}
      <main className='pt-i160 grid-container'>
        <PageHeader title='Услуги' className='' />
        <ServicesTabs data={serviceCards} />
        <div className='col-span-full -mx-grid *:h-screen md:*:h-full lg:mt-i120'>
          <Showreel
            media={{ type: 'video', url: 'https://kinescope.io/embed/6fDTjWAubgzmt7ADqh1SXU' }}
            preview={'/images/showrel.jpg'}
            playButton
          />
        </div>
        <h2 id='work-formats' className='col-span-full mb-i32 mt-i168 font-medium'>
          Форматы работ
        </h2>
        <div className='col-span-full -mx-grid'>
          <BigInfoCardWrapper data={workFormats} />
        </div>
      </main>
    </>
  );
}
