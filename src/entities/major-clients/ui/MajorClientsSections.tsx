import React, { ReactNode } from 'react';
import { Slider, Button } from '@/shared/ui';
import { ClientCard } from '@/entities/client';
import { fetchClients } from '@/entities/client/api/api';

interface Props {
  children: ReactNode;
  className?: string;
}

export default async function MajorClientsSections({ children, className }: Props) {
  const clients = await fetchClients();
  return (
    <div className={className}>
      {children}
      <div className='col-span-full flex justify-center px-grid py-i168'>
        <Button className='w-full lg:w-auto' href='/about' iconRight='arrow-right' size='big'>
          об агентстве
        </Button>
      </div>
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
  );
}
