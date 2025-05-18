'use client';

/* eslint-disable tailwindcss/no-custom-classname */

import { Button, Cord, ExpandableContainer, Tag, FilterButton, ElementsList } from '@/shared/ui';
import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { Category, ExpandableRef } from '@/shared/lib/types';
import { useCaseFilterStore } from '@/features/case-filter/model/store';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { createUrlWithSearchParam } from '@/shared/lib/helpers';
import CaseTabs from './CasesTabs';

interface Props {
  categories: Category[];
  className?: string;
}

export default function CaseFilter({ categories, className }: Props) {
  const expandableRef = useRef<ExpandableRef>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [applied, setApplied] = useState<boolean>(false);
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    cases,
    tags,
    loading,
    services,
    filters,
    filters: { tagId, serviceId },
    reset,
    setFromUrl,
    updateCases,
    setSelectedTag,
    setSelectedTagIds,
    setCurrentCategory,
    setSelectedServiceIds,
  } = useCaseFilterStore();

  useEffect(
    () => {
      if (searchParams && searchParams.size > 0) {
        const categoryId = searchParams.get('categoryId');
        const category = categories.find((item) => String(item.id) === categoryId);
        if (category) {
          setFromUrl(searchParams, category);
        }
      } else {
        setCurrentCategory(categories[0]);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useEffect(() => {
    if (!loading) {
      expandableRef.current?.updateHeight();
    }
  }, [loading]);

  const toggleOpen = () => {
    setOpen(!open);
  };

  const onReset = () => {
    setApplied(false);
    setOpen(false);
    reset();
    setCurrentCategory(categories[0]);
  };

  const apply = () => {
    updateCases();
    const baseUrl = window.location.origin + pathname;
    router.push(decodeURI(createUrlWithSearchParam(baseUrl, filters as Record<string, unknown>).toString()), {
      scroll: false,
    });
    setApplied(true);
    setOpen(false);
  };

  return (
    <div className={clsx('mb-[calc(theme(spacing.i80)-theme(spacing.i32))]', className)}>
      <div className='relative h-fit grid-subcontainer'>
        <CaseTabs categories={categories} className='tag-list col-span-4 -mx-grid' withUrlChange />
        <FilterButton
          className='hidden lg:inline-flex'
          toggleOpen={toggleOpen}
          open={open}
          count={(tagId ? tagId.length : 0) + (serviceId ? serviceId.length : 0)}
        />
        <Cord className='absolute bottom-0 col-span-full -mx-grid' />
        <FilterButton
          className='mt-i32 inline-flex lg:hidden'
          toggleOpen={toggleOpen}
          open={open}
          count={(tagId ? tagId.length : 0) + (serviceId ? serviceId.length : 0)}
        />
      </div>
      <ExpandableContainer ref={expandableRef} open={open} className='py-i32 grid-subcontainer'>
        <span className='h4 col-span-full mb-4 font-medium lg:hidden'>отрасль</span>
        <ElementsList className='h4 col-span-full mb-4 space-y-2 lg:col-span-2 lg:col-start-5 lg:mb-0'>
          {tags &&
            tags.flat().map((tag) => (
              <button
                key={tag.id}
                className={tagId && tagId.includes(String(tag.id)) ? 'text-accent-blue' : ''}
                onClick={() => setSelectedTagIds(tag.id)}
              >
                {tag.title}
              </button>
            ))}
        </ElementsList>
        <span className='h4 col-span-full mb-4 font-medium lg:hidden'>услуги</span>
        <ElementsList className='h4 col-span-full space-y-2 lg:col-span-2'>
          {services &&
            services.map((service) => (
              <button
                key={service.id}
                className={serviceId && serviceId.includes(String(service.id)) ? 'text-accent-blue' : ''}
                onClick={() => setSelectedServiceIds(service.id)}
              >
                {service.title}
              </button>
            ))}
        </ElementsList>
        <div className='col-span-full mt-i64 grid items-center gap-gap lg:col-span-4 lg:col-start-5 lg:grid-cols-4'>
          <Button onClick={apply} iconRight='arrow-bottom' className='col-span-2' theme='gray' size='small'>
            применить
          </Button>
          <button onClick={onReset} className='h4 col-span-2 size-fit'>
            сбросить фильтры
          </button>
        </div>
      </ExpandableContainer>
      {!open &&
        (applied ? (
          <div className='pt-i32 grid-container'>
            <p className='col-span-1 col-start-5 text-dark'>найдено: {cases?.length ?? 0}</p>
          </div>
        ) : (
          <div className='tag-list -mx-grid hidden gap-x-i24 pt-i32 lg:flex'>
            <div className='tag-item flex'>
              {tags &&
                tags[0].map((tag) => (
                  <button key={tag.id} onClick={() => setSelectedTag(tag.id)}>
                    <Tag tag={tag} grey size='big' selected={tagId && tagId.includes(String(tag.id))} />
                  </button>
                ))}
            </div>
            <div className='tag-item flex'>
              {tags &&
                tags[1].map((tag) => (
                  <button key={tag.id} onClick={() => setSelectedTag(tag.id)}>
                    <Tag tag={tag} grey size='big' selected={tagId && tagId.includes(String(tag.id))} />
                  </button>
                ))}
            </div>
          </div>
        ))}
    </div>
  );
}
