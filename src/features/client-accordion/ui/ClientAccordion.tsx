'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { Tr, Td, Tag, Icon, ExpandableContainer, Slider } from '@/shared/ui';
import { ReviewCard } from '@/entities/review-card';
import { IClientAccordion } from '../model/types';

interface Props {
  data: IClientAccordion;
}

export default function ClientAccordion({ data }: Props) {
  const [open, setOpen] = useState(false);

  const toggleHandler = () => {
    setOpen((prev) => !prev);
  };

  const renderToggleButton = (className?: string) => (
    <button className='mt-1 self-start'>
      <Icon
        className={clsx('size-6 transition-transform duration-200', { 'rotate-45': open }, className)}
        name='plus'
      />
    </button>
  );

  return (
    <Tr
      className={clsx('transition-colors duration-200 last:border-b-0', {
        'bg-bg-grey text-black': open,
      })}
      withoutGradientBorder
      withoutGrid
    >
      <Td
        className={clsx(
          'col-span-full cursor-pointer items-center border-b border-white/16 p-4 grid-subcontainer md:p-6',
          {
            'gradient-border gradient-border-bottom': !open,
          },
        )}
        onClick={toggleHandler}
      >
        <div className='col-span-full flex items-center justify-between lg:col-span-4 lg:mb-0'>
          <span className='h3 font-medium'>{data.title}</span>
          {renderToggleButton('lg:hidden')}
        </div>
        <div className='col-span-2 hidden lg:block'>
          <span className='typo-p'>{data.shortDescription}</span>
        </div>
        <div className='col-span-2'>
          <div className='hidden justify-between gap-i12 lg:flex'>
            <div className='flex flex-wrap'>
              {data.tags.slice(0, 2).map((tag) => (
                <Tag key={tag.id} tag={tag} />
              ))}
            </div>
            {renderToggleButton()}
          </div>
        </div>
      </Td>
      <Td className='col-span-full'>
        <ExpandableContainer className='grid-subcontainer lg:pt-i64' open={open}>
          <div className='col-span-full mb-8 px-grid grid-subcontainer'>
            <div className='col-span-full lg:col-span-4'>
              <Image
                className='hidden lg:inline-block'
                src={data.logotype.url}
                alt={data.title}
                width={94}
                height={80}
              />
              <p className='block pb-4 typo-p lg:hidden'>{data.shortDescription}</p>
            </div>
            <p className='h4 col-span-full lg:col-span-4'>{data.description}</p>
          </div>
          <Slider
            wrapperClassName='col-span-full !border-black'
            slideClassName='lg:basis-[calc((100%-theme(spacing.grid))/2)] basis-[calc((100%-theme(spacing.grid)))] !border-black first:after:!bg-red-500'
            borderSlides
          >
            {data.reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </Slider>
        </ExpandableContainer>
      </Td>
    </Tr>
  );
}
