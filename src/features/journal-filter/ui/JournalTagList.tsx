'use client';

import { ElementsList } from '@/shared/ui';
import { Tag } from '@/shared/lib/types';
import clsx from 'clsx';
import React from 'react';

interface Props {
  data: Tag[];
  className?: string;
}

export default function JournalQuickFilters({ data, className }: Props) {
  return (
    <ElementsList className={clsx('h4 space-y-2', className)} itemClassName='w-fit'>
      {data.map((tag) => (
        <button key={tag.id} onClick={() => {}}>
          {tag.title}
        </button>
      ))}
    </ElementsList>
  );
}
