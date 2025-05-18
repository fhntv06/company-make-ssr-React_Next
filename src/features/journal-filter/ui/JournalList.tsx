'use client';

import React from 'react';
import { MainPublication, SeriesPublication } from '@/entities/publication';
import { ISeriesPublication, Publication as IPublication } from '@/entities/publication/model/types';

interface Props {
  data: (IPublication | ISeriesPublication)[];
  className?: string;
}

export default function JournalList({ data, className }: Props) {
  return (
    <div className={className}>
      {data.map((pub) => (
        <div key={pub.id} className='*:last:border-b'>
          {(pub as ISeriesPublication).series ? (
            <SeriesPublication data={pub as ISeriesPublication} showAuthor />
          ) : (
            <MainPublication className='pb-i32 pt-i24' data={pub as IPublication} showAuthor />
          )}
        </div>
      ))}
    </div>
  );
}
