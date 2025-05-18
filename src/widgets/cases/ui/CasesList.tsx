'use client';

import { useCaseFilterStore } from '@/features/case-filter';
import { BigCaseCard, Case } from '@/entities/case';
import clsx from 'clsx';

interface Props {
  data: Case[];
  className?: string;
}

export default function CasesList({ data, className }: Props) {
  const { cases } = useCaseFilterStore();

  const caseList: Case[] = cases ?? data;

  return (
    <div className={clsx('relative col-span-full -mx-grid border-t border-black/15  before:bg-light-grey', className)}>
      {caseList.map((c) => (
        <BigCaseCard key={c.id} data={c} />
      ))}
    </div>
  );
}
