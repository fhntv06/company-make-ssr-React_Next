'use client';

import { BigInfoCardWrapper } from '@/entities/big-info-card';
import React from 'react';
import { WorkFormatType } from '@/shared/lib/types';

interface Props {
  units: WorkFormatType[];
}

export default function CoreUnits({ units }: Props) {
  return (
    <div className='col-span-full -mx-grid'>
      <BigInfoCardWrapper data={units} withMagneticClientList />
    </div>
  );
}
