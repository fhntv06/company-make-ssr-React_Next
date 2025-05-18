'use client';

import { CaseElement, Case, fetchArchiveCases } from '@/entities/case';
import { Button, Cord, ElementsList } from '@/shared/ui';
import { useState } from 'react';

interface Props {
  data: Case[];
  lastPage: number;
}
export default function CasesArchive({ data, lastPage }: Props) {
  const [cases, setCases] = useState<Case[]>(data);
  const [page, setPage] = useState<number>(1);

  const loadMore = async () => {
    try {
      const nextPage = page + 1;
      const d = await fetchArchiveCases({ _page: nextPage });
      setCases([...cases, ...d.data]);

      setPage(nextPage);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h2 className='col-span-4 mb-i32 font-medium'>работы списком и архивные кейсы</h2>
      <Cord className='col-span-full -mx-grid' />
      <ElementsList className='col-span-full -mx-grid'>
        {cases.map((c) => (
          <CaseElement key={c.id} data={c} />
        ))}
      </ElementsList>
      <div className='col-span-full inline-flex justify-center py-i120'>
        {lastPage !== page && (
          <Button iconRight='arrow-bottom' theme='gray' onClick={loadMore} className='w-full justify-center'>
            более ранние работы
          </Button>
        )}
      </div>
    </>
  );
}
