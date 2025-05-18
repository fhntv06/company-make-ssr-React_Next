'use client';

import React, { useState } from 'react';
import { WorkFormatType } from '@/shared/lib/types';
import clsx from 'clsx';
// eslint-disable-next-line import/no-cycle
import { BigInfoCard } from '..';

interface Props {
  data: WorkFormatType[];
  className?: string;
  withMagneticClientList?: boolean;
}

export default function BigInfoCardWrapper({ data, className, withMagneticClientList }: Props) {
  const [hoveredItem, setHoveredItem] = useState<null | number>(null);

  return (
    <div className={clsx('grid grid-cols-1 lg:grid-cols-2', className)}>
      {data.map((item, index) => (
        <div
          key={item.id}
          className='h-full border-b border-black bg-black/[6%] first:border-t lg:border-t'
          onMouseEnter={() => setHoveredItem(index)}
          onMouseLeave={() => {
            setHoveredItem(null);
          }}
        >
          <BigInfoCard
            data={item}
            className={clsx('border-b-0')}
            withMagneticClientList={withMagneticClientList && index === 0}
            hoveredItem={hoveredItem}
            index={index}
          />
        </div>
      ))}
    </div>
  );
}
