import React from 'react';
import { PageHeader, Link, Cord, BlocksHeader, ElementsList } from '@/shared/ui';
import { Tag as TagType } from '@/shared/lib/types';
import { Showreel } from '@/entities/showreel';
import { headers } from 'next/headers';
import clsx from 'clsx';
import { AwardTable } from '@/features/award-table';

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

const awardList = [
  {
    id: 1,
    title: 'объединённые кондитеры',
    url: '#0',
    award_name: 'workspace digital awards',
    category: 'сайты, промышленность и оборудование',
    year: '2024',
    award: {
      awardID: 0,
      title: 'title',
      description: 'description',
      color: '#D89774',
    },
  },
  {
    id: 2,
    title: 'gennady',
    url: '#0',
    award_name: 'workspace digital awards',
    category: 'игры, лучшая игра',
    year: '2024',
    award: {
      awardID: 0,
      title: 'title',
      description: 'description',
      color: '#BDBDDA',
    },
  },
  {
    id: 3,
    title: 'gennady',
    url: '#0',
    award_name: 'dprofile',
    category: 'лучшее',
    year: '2024',
    award: {
      awardID: 0,
      title: 'title',
      description: 'description',
      color: '#FE5639',
    },
  },
  {
    id: 4,
    title: 'голоса большой страны',
    url: '#0',
    award_name: 'dprofile',
    category: 'лучшее',
    year: '2024',
    award: {
      awardID: 0,
      title: 'title',
      description: 'description',
      color: '#FE5639',
    },
  },
  {
    id: 5,
    title: 'голоса большой страны',
    url: '#0',
    award_name: 'dprofile',
    category: 'интерфейсы',
    year: '2024',
    award: {
      awardID: 0,
      title: 'title',
      description: 'description',
      color: '#AD9058',
    },
  },
  {
    id: 6,
    title: 'вектор роспортебнадзора',
    url: '#0',
    award_name: 'dprofile',
    category: '3d-дизайн',
    year: '2024',
    award: {
      awardID: 0,
      title: 'title',
      description: 'description',
      color: '#AD9058',
    },
  },
  {
    id: 7,
    title: 'объединённые кондитеры',
    url: '#0',
    award_name: 'dprofile',
    category: 'лучшее',
    year: '2024',
    award: {
      awardID: 0,
      title: 'title',
      description: 'description',
      color: '#FE5639',
    },
  },
  {
    id: 8,
    title: 'объединённые кондитеры',
    url: '#0',
    award_name: 'tagline awards',
    category: 'лучший корпоративный сайт',
    year: '2023',
    award: {
      awardID: 0,
      title: 'title',
      description: 'description',
      color: '#F9CC1F',
    },
  },
  {
    id: 9,
    title: 'мэйк арена',
    url: '#0',
    award_name: 'tagline awards',
    category: 'лучший дизайн собственного проекта агентства',
    year: '2023',
    award: {
      awardID: 0,
      title: 'title',
      description: 'description',
      color: '#D89774',
    },
  },
  {
    id: 10,
    title: 'p.rc stats_bot',
    url: '#0',
    award_name: 'tagline awards',
    category: 'лучший сервис для digital-маркетинга',
    year: '2023',
    award: {
      awardID: 0,
      title: 'title',
      description: 'description',
      color: '#D89774',
    },
  },
  {
    id: 11,
    title: 'объединённые кондитеры',
    url: '#0',
    award_name: 'workspace digital awards',
    category: 'сайты, промышленность и оборудование',
    year: '2024',
    award: {
      awardID: 0,
      title: 'title',
      description: 'description',
      color: '#D89774',
    },
  },
  {
    id: 12,
    title: 'gennady',
    url: '#0',
    award_name: 'workspace digital awards',
    category: 'игры, лучшая игра',
    year: '2024',
    award: {
      awardID: 0,
      title: 'title',
      description: 'description',
      color: '#BDBDDA',
    },
  },
  {
    id: 13,
    title: 'gennady',
    url: '#0',
    award_name: 'dprofile',
    category: 'лучшее',
    year: '2024',
    award: {
      awardID: 0,
      title: 'title',
      description: 'description',
      color: '#BDBDDA',
    },
  },
  {
    id: 14,
    title: 'голоса большой страны',
    url: '#0',
    award_name: 'dprofile',
    category: 'лучшее',
    year: '2024',
    award: {
      awardID: 0,
      title: 'title',
      description: 'description',
      color: '#F9CC1F',
    },
  },
  {
    id: 15,
    title: 'голоса большой страны',
    url: '#0',
    award_name: 'dprofile',
    category: 'интерфейсы',
    year: '2024',
    award: {
      awardID: 0,
      title: 'title',
      description: 'description',
      color: '#D89774',
    },
  },
  {
    id: 16,
    title: 'вектор роспортебнадзора',
    url: '#0',
    award_name: 'dprofile',
    category: '3d-дизайн',
    year: '2024',
    award: {
      awardID: 0,
      title: 'title',
      description: 'description',
      color: '#BDBDDA',
    },
  },
  {
    id: 17,
    title: 'объединённые кондитеры',
    url: '#0',
    award_name: 'dprofile',
    category: 'лучшее',
    year: '2024',
    award: {
      awardID: 0,
      title: 'title',
      description: 'description',
      color: '#BDBDDA',
    },
  },
  {
    id: 18,
    title: 'объединённые кондитеры',
    url: '#0',
    award_name: 'tagline awards',
    category: 'лучший корпоративный сайт',
    year: '2023',
    award: {
      awardID: 0,
      title: 'title',
      description: 'description',
      color: '#F9CC1F',
    },
  },
  {
    id: 19,
    title: 'мэйк арена',
    url: '#0',
    award_name: 'tagline awards',
    category: 'лучший дизайн собственного проекта агентства',
    year: '2023',
    award: {
      awardID: 0,
      title: 'title',
      description: 'description',
      color: '#D89774',
    },
  },
  {
    id: 20,
    title: 'p.rc stats_bot',
    url: '#0',
    award_name: 'tagline awards',
    category: 'лучший сервис для digital-маркетинга',
    year: '2023',
    award: {
      awardID: 0,
      title: 'title',
      description: 'description',
      color: '#D89774',
    },
  },
  {
    id: 21,
    title: 'gennady',
    url: '#0',
    award_name: 'dprofile',
    category: 'лучшее',
    year: '2024',
    award: {
      awardID: 0,
      title: 'title',
      description: 'description',
      color: '#FE5639',
    },
  },
  {
    id: 22,
    title: 'голоса большой страны',
    url: '#0',
    award_name: 'dprofile',
    category: 'лучшее',
    year: '2024',
    award: {
      awardID: 0,
      title: 'title',
      description: 'description',
      color: '#FE5639',
    },
  },
  {
    id: 23,
    title: 'голоса большой страны',
    url: '#0',
    award_name: 'dprofile',
    category: 'интерфейсы',
    year: '2024',
    award: {
      awardID: 0,
      title: 'title',
      description: 'description',
      color: '#AD9058',
    },
  },
  {
    id: 23,
    title: 'голоса большой страны',
    url: '#0',
    award_name: 'dprofile',
    category: 'интерфейсы',
    year: '2024',
    award: {
      awardID: 0,
      title: 'title',
      description: 'description',
      color: '#AD9058',
    },
  },
  {
    id: 24,
    title: 'вектор роспортебнадзора',
    url: '#0',
    award_name: 'dprofile',
    category: '3d-дизайн',
    year: '2024',
    award: {
      awardID: 0,
      title: 'title',
      description: 'description',
      color: '#AD9058',
    },
  },
  {
    id: 25,
    title: 'объединённые кондитеры',
    url: '#0',
    award_name: 'dprofile',
    category: 'лучшее',
    year: '2024',
    award: {
      awardID: 0,
      title: 'title',
      description: 'description',
      color: '#FE5639',
    },
  },
  {
    id: 26,
    title: 'объединённые кондитеры',
    url: '#0',
    award_name: 'tagline awards',
    category: 'лучший корпоративный сайт',
    year: '2023',
    award: {
      awardID: 0,
      title: 'title',
      description: 'description',
      color: '#F9CC1F',
    },
  },
  {
    id: 27,
    title: 'мэйк арена',
    url: '#0',
    award_name: 'tagline awards',
    category: 'лучший дизайн собственного проекта агентства',
    year: '2023',
    award: {
      awardID: 0,
      title: 'title',
      description: 'description',
      color: '#D89774',
    },
  },
  {
    id: 29,
    title: 'p.rc stats_bot',
    url: '#0',
    award_name: 'tagline awards',
    category: 'лучший сервис для digital-маркетинга',
    year: '2023',
    award: {
      awardID: 0,
      title: 'title',
      description: 'description',
      color: '#D89774',
    },
  },
];

export default function AwardsPage() {
  const pathname = headers().get('x-pathname');

  return (
    <main className='grid-container'>
      <PageHeader title='награды' withBackLink>
        <div className='col-span-full grid-subcontainer'>
          <div className='tag-list col-span-full mx-[calc(theme(spacing.i24)*-2)] flex grid-cols-4 gap-x-0 md:mx-0 md:grid md:gap-x-5 lg:grid-cols-8'>
            <ElementsList className='mb-grid mr-i32 flex space-x-3 pl-grid md:col-span-3 md:mb-i32 md:mr-0 md:space-x-6 md:pl-0 lg:col-span-6'>
              {tabs.map((tab) => (
                <Link className={clsx('h3', { 'text-white/64': pathname !== tab.slug })} to={tab.slug} key={tab.id}>
                  {tab.title}
                </Link>
              ))}
            </ElementsList>
            <div className='col-span-full pr-grid md:col-span-1 md:pr-0 md:font-medium lg:col-span-2'>
              <Link className='h3 text-white/64 md:text-white' to='#0'>
                агентство
              </Link>
            </div>
          </div>
          <Cord className='col-span-full -mx-grid mb-2' white />
        </div>
      </PageHeader>
      <section className='col-span-full'>
        <AwardTable data={awardList} />
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
