'use client';

import React from 'react';
import clsx from 'clsx';
import { Table, Cord } from '@/shared/ui';
import { useClientFilterStore } from '@/features/clients-filter/model/store';
import { IClientsFilter } from '@/features/clients-filter/model/types';
import ClientAccordion from './ClientAccordion';
import { IClientAccordion } from '../model/types';

interface Props {
  data: IClientAccordion[];
  filter: IClientsFilter;
  className?: string;
}

export default function ClientAccordionList({ data, filter, className }: Props) {
  const {
    data: { filteredClients },
  } = useClientFilterStore();

  const getIndustryTitle = (id: number) => {
    const industry = filter.industry.find((item) => item.id === id);

    if (industry) {
      return industry.title;
    }

    return null;
  };

  return (
    <>
      {filteredClients ? (
        <>
          {Object.keys(filteredClients).length
            ? Object.keys(filteredClients).map((key) => (
                <div key={key} className='mb-i120 mt-i168' id={key}>
                  <h2 className='flex gap-2 font-medium'>
                    <span>{getIndustryTitle(Number(key))}</span>
                    <span className='self-start font-normal text-white/64 typo-h4'>
                      {filteredClients[key].length} +
                    </span>
                  </h2>
                  <Cord className='-mx-4 pt-[calc(theme(spacing.i16)+theme(spacing.i16))] md:-mx-6 md:pt-i32' white />
                  <Table className={className} withoutNegativeMargins>
                    {filteredClients[key].map((item) => (
                      <ClientAccordion key={item.id} data={item} />
                    ))}
                  </Table>
                </div>
              ))
            : null}
        </>
      ) : (
        <>
          <Cord className='-mx-4 mt-i168 pt-i32 md:-mx-6' white />
          <Table className={clsx('mb-i120', className)} withoutNegativeMargins>
            {data.map((item) => (
              <ClientAccordion key={item.id} data={item} />
            ))}
          </Table>
        </>
      )}
    </>
  );
}
