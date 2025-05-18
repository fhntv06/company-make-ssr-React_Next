import React from 'react';
import { PageHeader, Cord, Link, BlocksHeader } from '@/shared/ui';
import { Showreel } from '@/entities/showreel';
import { ReviewItem } from '@/entities/review-item';
import { headers } from 'next/headers';
import clsx from 'clsx';
import { IReviewItem, Tag as TagType } from '@/shared/lib/types';

const tabs = [
  {
    id: 0,
    title: 'клиенты',
    slug: '/clients',
  },
  {
    id: 1,
    title: 'отзывы',
    slug: '/clients/reviews',
  },
];

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

const reviews: IReviewItem[] = [
  {
    id: 1,
    title: 'вектор роспотребнадзора',
    author: 'Иван Иванов',
    tags: [
      {
        id: 1,
        type: 1,
        title: 'брендинг',
      },
      {
        id: 2,
        type: 1,
        title: 'сайт',
      },
    ],
    file: {
      extension: 'pdf',
    },
  },
  {
    id: 2,
    title: 'правительство кузбасса',
    author: 'Иван Иванов',
    tags: [
      {
        id: 1,
        type: 1,
        title: 'сайт',
      },
    ],
    file: {
      extension: 'pdf',
    },
  },
  {
    id: 3,
    title: 'администрация ленинск-кузнецкого района',
    author: 'Иван Иванов',
    tags: [
      {
        id: 1,
        type: 1,
        title: 'сайт',
      },
      {
        id: 2,
        type: 1,
        title: 'техподдержка',
      },
    ],
    file: {
      extension: 'pdf',
    },
  },
  {
    id: 4,
    title: 'кузбасский технопарк',
    author: 'Иван Иванов',
    tags: [
      {
        id: 1,
        type: 1,
        title: 'сайт',
      },
    ],
    file: {
      extension: 'pdf',
    },
  },
  {
    id: 5,
    title: 'администрация юрги',
    author: 'Иван Иванов',
    tags: [
      {
        id: 1,
        type: 1,
        title: 'сайт',
      },
    ],
    file: {
      extension: 'pdf',
    },
  },
  {
    id: 6,
    title: 'администрация кемерово',
    author: 'Иван Иванов',
    tags: [
      {
        id: 1,
        type: 1,
        title: 'аналитика',
      },
    ],
    file: {
      extension: 'pdf',
    },
  },
  {
    id: 7,
    title: 'администрация анжеро-судженска',
    author: 'Иван Иванов',
    tags: [
      {
        id: 1,
        type: 1,
        title: 'сайт',
      },
      {
        id: 2,
        type: 1,
        title: 'техподдержка',
      },
    ],
    file: {
      extension: 'pdf',
    },
  },
  {
    id: 8,
    title: 'германский исторический институт',
    author: 'Иван Иванов',
    tags: [
      {
        id: 1,
        type: 1,
        title: 'сервис',
      },
      {
        id: 2,
        type: 1,
        title: 'техподдержка',
      },
    ],
    file: {
      extension: 'pdf',
    },
  },
  {
    id: 9,
    title: 'вектор роспотребнадзора',
    author: 'Иван Иванов',
    tags: [
      {
        id: 1,
        type: 1,
        title: 'брендинг',
      },
      {
        id: 2,
        type: 1,
        title: 'сайт',
      },
    ],
    file: {
      extension: 'pdf',
    },
  },
  {
    id: 10,
    title: 'правительство кузбасса',
    author: 'Иван Иванов',
    tags: [
      {
        id: 1,
        type: 1,
        title: 'сайт',
      },
    ],
    file: {
      extension: 'pdf',
    },
  },
  {
    id: 11,
    title: 'аижк',
    author: 'Иван Иванов',
    tags: [
      {
        id: 1,
        type: 1,
        title: 'сайт',
      },
    ],
    file: {
      extension: 'pdf',
    },
  },
  {
    id: 12,
    title: 'администрация ленинск-кузнецкого района',
    author: 'Иван Иванов',
    tags: [
      {
        id: 1,
        type: 1,
        title: 'сайт',
      },
      {
        id: 2,
        type: 1,
        title: 'техподдержка',
      },
    ],
    file: {
      extension: 'pdf',
    },
  },
  {
    id: 13,
    title: 'кузбасский технопарк',
    author: 'Иван Иванов',
    tags: [
      {
        id: 1,
        type: 1,
        title: 'сайт',
      },
    ],
    file: {
      extension: 'pdf',
    },
  },
  {
    id: 14,
    title: 'администрация юрги',
    author: 'Иван Иванов',
    tags: [
      {
        id: 1,
        type: 1,
        title: 'сайт',
      },
    ],
    file: {
      extension: 'pdf',
    },
  },
  {
    id: 15,
    title: 'администрация кемерово',
    author: 'Иван Иванов',
    tags: [
      {
        id: 1,
        type: 1,
        title: 'аналитика',
      },
    ],
    file: {
      extension: 'pdf',
    },
  },
  {
    id: 16,
    title: 'администрация анжеро-судженска',
    author: 'Иван Иванов',
    tags: [
      {
        id: 1,
        type: 1,
        title: 'сайт',
      },
      {
        id: 2,
        type: 1,
        title: 'техподдержка',
      },
    ],
    file: {
      extension: 'pdf',
    },
  },
  {
    id: 17,
    title: 'германский исторический институт',
    author: 'Иван Иванов',
    tags: [
      {
        id: 1,
        type: 1,
        title: 'сервис',
      },
      {
        id: 2,
        type: 1,
        title: 'техподдержка',
      },
    ],
    file: {
      extension: 'pdf',
    },
  },
];

export default function ClientsPage() {
  const pathname = headers().get('x-pathname');

  return (
    <main className='grid-container'>
      <PageHeader title='отзывы' withBackLink>
        <div className='col-span-full grid-subcontainer'>
          <div className='h3 col-span-4 flex flex-row space-x-3'>
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
          <Cord className='col-span-full -mx-4 mb-i32 pt-i32 md:-mx-6' white />
          <p className='h4 md:h3 col-span-4'>
            150+ компаний и государственных учреждений доверились нам. со многими сотрудничаем более пяти лет
          </p>
        </div>
      </PageHeader>
      <section className='col-span-full'>
        <ul className='-mx-grid mt-[calc(theme(spacing.i16)*5)] border-t border-light-grey/16 md:mt-i120 dark:border-white/16'>
          {reviews.map((review) => (
            <ReviewItem key={review.id} data={review}></ReviewItem>
          ))}
        </ul>
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
