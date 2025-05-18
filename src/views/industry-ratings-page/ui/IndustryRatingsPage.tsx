import React from 'react';
import { PageHeader, Link, Cord, BlocksHeader, ElementsList } from '@/shared/ui';
import { Showreel } from '@/entities/showreel';
import { Tag as TagType } from '@/shared/lib/types';
import { headers } from 'next/headers';
import clsx from 'clsx';
import { RatingTable } from '@/features/rating-table';

const tags: TagType[] = [
  {
    id: 1,
    type: 1,
    title: 'государство',
  },
  {
    id: 2,
    type: 1,
    title: 'промышленность и трансопрт',
  },
  {
    id: 3,
    type: 1,
    title: 'финансы и телеком',
  },
  {
    id: 4,
    type: 1,
    title: 'медицина',
  },
  {
    id: 5,
    type: 1,
    title: 'сфера услуг',
  },
  {
    id: 6,
    type: 1,
    title: 'cтартапы',
  },
];

const tabs = [
  {
    id: 0,
    title: 'награды',
    slug: '/awards',
  },
  {
    id: 1,
    title: 'отраслевые рейтинги',
    slug: '/awards/industry',
  },
];

const ratingItems = [
  {
    id: 1,
    place: 25,
    description: 'рейтинг разработчиков государственных систем',
    url: {
      title: 'рейтинг рунета',
      href: '#0',
    },
    year: 2024,
    priority: 1,
  },
  {
    id: 2,
    place: 'топ-100',
    description: 'рейтинг подрядчиков для крупных компаний',
    url: {
      title: 'рейтинг рунета',
      href: '#0',
    },
    year: 2024,
    priority: 1,
  },
  {
    id: 3,
    place: 8,
    description: 'рейтинг чего-то там',
    url: {
      title: 'рейтинг рунета',
      href: '#0',
    },
    year: 2024,
    priority: 1,
  },
  {
    id: 4,
    place: 25,
    description: 'рейтинг разработчиков государственных систем',
    url: {
      title: 'рейтинг рунета',
      href: '#0',
    },
    year: 2024,
    priority: 1,
  },
  {
    id: 5,
    place: 'топ-50',
    description: 'название рейтинга',
    url: {
      title: 'tagline',
      href: '#0',
    },
    year: 2024,
    priority: 1,
  },
  {
    id: 6,
    place: 'топ-200',
    description: 'название рейтинга',
    url: {
      title: 'tagline',
      href: '#0',
    },
    year: 2024,
    priority: 0,
  },
  {
    id: 7,
    place: 78,
    description: 'название рейтинга',
    url: {
      title: 'tagline',
      href: '#0',
    },
    year: 2024,
    priority: 0,
  },
  {
    id: 8,
    place: 'топ-150',
    description: 'название рейтинга',
    url: {
      title: 'tagline',
      href: '#0',
    },
    year: 2024,
    priority: 0,
  },
  {
    id: 9,
    place: 'топ-150',
    description: 'название рейтинга',
    url: {
      title: 'tagline',
      href: '#0',
    },
    year: 2024,
    priority: 0,
  },
  {
    id: 10,
    place: 'топ-200',
    description: 'название рейтинга',
    url: {
      title: 'tagline',
      href: '#0',
    },
    year: 2024,
    priority: 0,
  },
  {
    id: 11,
    place: 'топ-200',
    description: 'название рейтинга',
    url: {
      title: 'tagline',
      href: '#0',
    },
    year: 2024,
    priority: 0,
  },
  {
    id: 12,
    place: 'топ-200',
    description: 'название рейтинга',
    url: {
      title: 'tagline',
      href: '#0',
    },
    year: 2024,
    priority: 0,
  },
  {
    id: 13,
    place: 'топ-200',
    description: 'название рейтинга',
    url: {
      title: 'tagline',
      href: '#0',
    },
    year: 2024,
    priority: 0,
  },
  {
    id: 14,
    place: 'топ-200',
    description: 'название рейтинга',
    url: {
      title: 'tagline',
      href: '#0',
    },
    year: 2024,
    priority: 0,
  },
  {
    id: 15,
    place: 'топ-200',
    description: 'название рейтинга',
    url: {
      title: 'tagline',
      href: '#0',
    },
    year: 2024,
    priority: 0,
  },
  {
    id: 16,
    place: 'топ-200',
    description: 'название рейтинга',
    url: {
      title: 'tagline',
      href: '#0',
    },
    year: 2024,
    priority: 0,
  },
  {
    id: 17,
    place: 'топ-200',
    description: 'название рейтинга',
    url: {
      title: 'tagline',
      href: '#0',
    },
    year: 2024,
    priority: 0,
  },
  {
    id: 18,
    place: 'топ-200',
    description: 'название рейтинга',
    url: {
      title: 'tagline',
      href: '#0',
    },
    year: 2024,
    priority: 0,
  },
  {
    id: 19,
    place: 'топ-200',
    description: 'название рейтинга',
    url: {
      title: 'tagline',
      href: '#0',
    },
    year: 2024,
    priority: 0,
  },
  {
    id: 20,
    place: 'топ-200',
    description: 'название рейтинга',
    url: {
      title: 'tagline',
      href: '#0',
    },
    year: 2024,
    priority: 0,
  },
  {
    id: 21,
    place: 'топ-200',
    description: 'название рейтинга',
    url: {
      title: 'tagline',
      href: '#0',
    },
    year: 2024,
    priority: 0,
  },
  {
    id: 22,
    place: 'топ-200',
    description: 'название рейтинга',
    url: {
      title: 'tagline',
      href: '#0',
    },
    year: 2024,
    priority: 0,
  },
  {
    id: 23,
    place: 'топ-200',
    description: 'название рейтинга',
    url: {
      title: 'tagline',
      href: '#0',
    },
    year: 2024,
    priority: 0,
  },
  {
    id: 24,
    place: 'топ-200',
    description: 'название рейтинга',
    url: {
      title: 'tagline',
      href: '#0',
    },
    year: 2024,
    priority: 0,
  },
];

export default function AwardsPage() {
  const pathname = headers().get('x-pathname');

  return (
    <main className='grid-container'>
      <PageHeader title='рейтинги' withBackLink>
        <div className='col-span-full grid-subcontainer'>
          <div className='tag-list col-span-full mr-[calc(theme(spacing.i24)*-2)] flex grid-cols-4 gap-x-0 md:mx-0 md:gap-x-5 lg:hidden lg:grid-cols-8'>
            <ElementsList className='mb-grid mr-i32 flex space-x-3 pl-0 md:col-span-3 md:mb-i32 md:mr-0 md:space-x-6 lg:col-span-6'>
              <Link to='/awards' className='h3 text-white/64'>
                награды
              </Link>
              <Link to='/awards/industry' className='h3'>
                отраслевые рейтинги
              </Link>
              <Link to='#0' className='h3 text-white/64'>
                агентство
              </Link>
            </ElementsList>
            <Cord
              className='col-span-full -mx-grid mb-2 pt-[calc(theme(spacing.i16)+theme(spacing.i16))] md:pt-i32'
              white
            />
          </div>
          <div className='h3 col-span-full hidden flex-row space-x-6 lg:col-span-6 lg:flex'>
            {tabs.map((tab) => (
              <Link
                className={clsx({
                  'text-white/64': pathname !== tab.slug,
                })}
                to={tab.slug}
                key={tab.id}
              >
                {tab.title}
              </Link>
            ))}
          </div>
          <Link className='h3 col-span-2 hidden font-medium lg:flex' to='#0'>
            агентство
          </Link>
          <Cord
            className='col-span-full -mx-grid mb-2 pt-[calc(theme(spacing.i16)+theme(spacing.i16))] md:pt-i32'
            white
          />
        </div>
      </PageHeader>
      <section className='col-span-full'>
        <RatingTable data={ratingItems} />
      </section>
      <section className='col-span-full -mx-grid mt-[calc(2*theme(spacing.i120))]'>
        <Showreel
          media={{ type: 'video', url: 'https://kinescope.io/embed/6fDTjWAubgzmt7ADqh1SXU' }}
          header={<BlocksHeader tags={tags} />}
          preview={'/images/showrel.jpg'}
        />
      </section>
    </main>
  );
}
