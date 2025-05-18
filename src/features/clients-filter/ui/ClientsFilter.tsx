'use client';

import { Button, Cord, ExpandableContainer, Tag, FilterButton, ElementsList } from '@/shared/ui';
import { useState, useEffect } from 'react';
import clsx from 'clsx';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { createUrlWithSearchParam } from '@/shared/lib/helpers';
import { IClientAccordion } from '@/features/client-accordion/model/types';
import { IClientsFilter, ISelectedTags } from '../model/types';
import { useClientFilterStore } from '../model/store';

interface Props {
  filter: IClientsFilter;
  data: IClientAccordion[];
}

export default function Clientsfilter({ filter, data }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const [applied, setApplied] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const {
    data: { filteredClients },
    selectTag,
    selectedTags,
    setClients,
    filterClients,
    setFromUrl,
    resetFilters,
  } = useClientFilterStore();

  const filterCount = selectedTags.industryIds.length + selectedTags.serviceIds.length;

  const toggleOpen = () => {
    setOpen(!open);
  };

  const applyFiltersHandler = () => {
    setOpen(false);
    setApplied(true);
    filterClients();
  };

  const resetFiltersHandler = () => {
    setOpen(false);
    setApplied(false);
    router.replace(decodeURI(window.location.origin + pathname), { scroll: false });
    resetFilters();
  };

  const selectTagHandler = (key: 'industryIds' | 'serviceIds', value: number) => {
    selectTag(key, value);
  };

  const applyFastFilters = (id: number) => {
    selectTagHandler('industryIds', id);
    filterClients();
  };

  useEffect(() => {
    setClients(data);
  }, [data, setClients, filter.industry]);

  useEffect(() => {
    const params = {
      ...(selectedTags.industryIds.length && {
        industry: filter.industry
          .filter((c) => selectedTags.industryIds.includes(c.id))
          .map((c) => c.title)
          .join(','),
      }),
      ...(selectedTags.serviceIds.length && {
        services: filter.services
          .filter((c) => selectedTags.serviceIds.includes(c.id))
          .map((c) => c.title)
          .join(','),
      }),
    };

    router.push(
      decodeURI(
        createUrlWithSearchParam(window.location.origin + pathname, params as Record<string, unknown>).toString(),
      ),
      {
        scroll: false,
      },
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredClients]);

  useEffect(() => {
    if (!(searchParams && searchParams.size > 0)) return;

    const industry = searchParams.get('industry');
    const services = searchParams.get('services');

    const selected: ISelectedTags = {
      industryIds: [],
      serviceIds: [],
    };

    if (industry) {
      selected.industryIds = filter.industry
        .filter((tag) => industry.split(',').includes(tag.title))
        .map((tag) => tag.id);
    }

    if (services) {
      selected.serviceIds = filter.services
        .filter((tag) => services.split(',').includes(tag.title))
        .map((tag) => tag.id);
    }

    if (industry || services) {
      setFromUrl(selected);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <>
      <div className='col-span-4 hidden lg:block'>
        <FilterButton toggleOpen={toggleOpen} count={filterCount} open={open} />
      </div>
      <Cord className='col-span-full -mx-grid mt-[calc(theme(spacing.i16)+theme(spacing.i16))] md:mt-i32' white />
      <div className='col-span-4 mt-[calc(theme(spacing.i16)+theme(spacing.i16))] block md:mt-i32 lg:hidden'>
        <FilterButton toggleOpen={toggleOpen} count={filterCount} open={open} />
      </div>
      <ExpandableContainer
        open={open}
        className={clsx(
          '-mx-grid pb-[calc(theme(spacing.i80)+theme(spacing.grid))] pt-[calc(theme(spacing.i16)+theme(spacing.i16))] grid-container lg:pb-[calc(theme(spacing.i80)+theme(spacing.i32))] lg:pt-i32',
        )}
      >
        <span className='h4 col-span-full mb-4 font-medium lg:hidden'>отрасль</span>
        <ElementsList className='h4 col-span-full mb-4 lg:col-span-2 lg:col-start-5 lg:mb-0'>
          {!!filter.industry.length &&
            filter.industry.map((tag) => (
              <button
                key={tag.id}
                className={selectedTags.industryIds.includes(tag.id) ? 'text-accent-blue' : ''}
                onClick={() => {
                  selectTagHandler('industryIds', tag.id);
                }}
              >
                {tag.title}
              </button>
            ))}
        </ElementsList>
        <span className='h4 col-span-full mb-4 font-medium lg:hidden'>услуги</span>
        <ElementsList className='h4 col-span-full lg:col-span-2'>
          {!!filter.services.length &&
            filter.services.map((tag) => (
              <button
                key={tag.id}
                className={selectedTags.serviceIds.includes(tag.id) ? 'text-accent-blue' : ''}
                onClick={() => {
                  selectTagHandler('serviceIds', tag.id);
                }}
              >
                {tag.title}
              </button>
            ))}
        </ElementsList>
        <div className='col-span-4 mt-i64 grid grid-cols-4 items-center gap-gap lg:col-start-5'>
          <Button
            onClick={applyFiltersHandler}
            iconRight='arrow-bottom'
            className='col-span-full md:col-span-2'
            theme='gray'
            size='small'
          >
            применить
          </Button>
          <button onClick={resetFiltersHandler} className='h4 col-span-full size-fit md:col-span-2'>
            сбросить фильтры
          </button>
        </div>
      </ExpandableContainer>
      <i
        className={clsx('col-span-full -mx-grid mb-grid block h-px bg-white/16 lg:mb-[calc(theme(spacing.i32)-1px)] ', {
          'opacity-100 transition-opacity delay-150': open,
          'opacity-0 ': !open,
        })}
      />
      <div className='col-span-full lg:mb-i120'>
        {!open && applied && (
          <div className='col-span-full -mx-grid border-b border-white/16  grid-container'>
            <p className='col-span-1 col-start-5 text-white'>
              найдено: {(filteredClients && Object.values(filteredClients).flat().length) ?? 0}{' '}
            </p>
          </div>
        )}
        {!open && !applied && (
          <div className='tag-list col-span-full -mx-grid hidden lg:block'>
            {filter.industry.map((tag) => (
              <button
                className='tag-item'
                key={tag.id}
                onClick={() => {
                  applyFastFilters(tag.id);
                }}
              >
                <Tag tag={tag} size='big' selected={selectedTags.industryIds.includes(tag.id)} />
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
