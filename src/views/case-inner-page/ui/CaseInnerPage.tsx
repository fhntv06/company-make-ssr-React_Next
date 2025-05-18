import { CaseElement, Case } from '@/entities/case';
import { PageHeader, Cord, Tag, Link, SeeMore, ElementsList } from '@/shared/ui';
import React from 'react';
import htmlParser from 'html-react-parser';
import { AwardsList } from '@/features/awards-list';
import Image from 'next/image';
import { CaseContentBlocks } from '@/widgets/content-blocks';
import { ReviewBigCard } from '@/entities/review-card';
import { CaseTeam } from '@/widgets/cases';

interface Props {
  data: Case;
}

const cases = [
  {
    id: 0,
    categoryId: 1,
    title: 'optitech',
    description: 'корпоративный сайт агропромышленного интегратора, диджитал-поддержка трансформации бизнеса',
    position: 4,
    date: '2024-03-13T02:55:00.000000Z',
    media: {
      url: '/images/cases/optitech.png',
      size: 1000,
    },
    video: { src: 'https://kinescope.io/embed/6fDTjWAubgzmt7ADqh1SXU' },
    tags: [
      {
        id: 0,
        type: 1,
        title: 'web',
      },
      {
        id: 1,
        type: 1,
        title: 'реклама',
      },
      {
        id: 2,
        type: 2,
        title: 'промышленность',
      },
    ],
    awards: [
      {
        awardID: 0,
        title: 'title',
        description: 'description',
        color: '#F9CC1F',
      },
      {
        awardID: 1,
        title: 'title',
        description: 'description',
        color: '#BDBDDA',
      },
      {
        awardID: 2,
        title: 'title',
        description: 'description',
        color: '#D89774',
      },
    ],
    achievements: [
      {
        title: '3,5k',
        description: 'товаров в интегрированном каталоге',
      },
    ],
    client: [
      {
        icon: '/images/clients/optitech.svg',
        name: 'Оптитек',
        size: 'large',
        bg: '#FF002E',
      },
    ],
  },
  {
    id: 1,
    categoryId: 1,
    title: 'объединённые кондитеры',
    description: 'корпоративный сайт крупнейшего кондитерского холдинга,\nинтеграция с 1С-каталогом на 3500 позиций',
    position: 4,
    date: '2023-03-13T02:55:00.000000Z',
    media: {
      url: '/images/cases/uniconf.png',
      size: 1000,
    },
    tags: [
      {
        id: 0,
        type: 1,
        title: 'web',
      },
      {
        id: 2,
        type: 2,
        title: 'промышленность',
      },
    ],
    awards: [
      {
        awardID: 0,
        title: 'title',
        description: 'description',
        color: '#F9CC1F',
      },
      {
        awardID: 1,
        title: 'title',
        description: 'description',
        color: '#BDBDDA',
      },
      {
        awardID: 2,
        title: 'title',
        description: 'description',
        color: '#D89774',
      },
    ],
    achievements: [
      {
        title: '3,5k',
        description: 'товаров в интегрированном каталоге',
      },
    ],
    client: [
      {
        icon: '/images/clients/uniconf.svg',
        name: 'Объединенные конитеры',
        size: 'large',
        bg: '#FF002E',
      },
    ],
  },
  {
    id: 2,
    categoryId: 2,
    title: 'голоса большой страны',
    description: 'впечатляющий сайт известного в индустрии кинопроизводственного и музыкального комплекса',
    position: 2,
    date: '2022-03-13T02:55:00.000000Z',
    media: {
      url: '/images/cases/vbc.png',
      size: 1000,
    },
    tags: [
      {
        id: 0,
        type: 1,
        title: 'web',
      },
      {
        id: 2,
        type: 2,
        title: 'медиа',
      },
    ],
    awards: [
      {
        awardID: 0,
        title: 'title',
        description: 'description',
        color: '#F9CC1F',
      },
      {
        awardID: 1,
        title: 'title',
        description: 'description',
        color: '#BDBDDA',
      },
      {
        awardID: 2,
        title: 'title',
        description: 'description',
        color: '#D89774',
      },
    ],
    achievements: [
      {
        title: '3,5k',
        description: 'товаров в интегрированном каталоге',
      },
    ],
    client: [
      {
        icon: '/images/clients/gbs.svg',
        name: 'Голоса большой страны',
        size: 'large',
        bg: '#FF002E',
      },
    ],
  },
];

export default function CaseInnerPage({ data }: Props) {
  return (
    <main className='grid-container' id='page-start'>
      <PageHeader
        withBackLink
        title={htmlParser(data.title) as string}
        titleClassName='h2 !text-left !mb-[calc(theme(spacing.i16)+theme(spacing.i16))]'
      />
      <Cord className='col-span-full -mx-grid mb-[calc(theme(spacing.i16)+theme(spacing.i16))]' />
      <div className='col-span-full grid-subcontainer lg:mb-i168'>
        {data.tags.length && (
          <div className='col-span-2 mr-i48 hidden flex-wrap gap-2 lg:flex'>
            {data.tags.map((tag) => (
              <Tag tag={tag} key={tag.id} grey={tag.type === 1} />
            ))}
          </div>
        )}
        {data.description && (
          <div className='col-span-4 mt-0 lg:order-none'>
            <p className='h3'>{data.description}</p>
          </div>
        )}
        {data.awards.length && (
          <div className='col-span-2 mt-i80 flex lg:order-none lg:mt-0 lg:justify-end'>
            <AwardsList awardClassName='!size-8' awards={data.awards} />
          </div>
        )}
      </div>
      <div className='col-span-full mb-[calc(theme(spacing.i16)+calc(theme(spacing.i16)))] h-fit grid-subcontainer'>
        {data.logotype && (
          <div className='col-span-2 hidden lg:block'>
            {/* TODO: вставить картинку нормально, проверить на других изображениях */}
            <div className='relative aspect-[278/48] max-h-[48px] max-w-[278px]'>
              <Image src={data.logotype.url} alt='временная картинка' fill objectFit='contain' />
            </div>
          </div>
        )}
        {data.links.length && (
          <ul className='h4 col-span-4 mt-i80 lg:mt-0'>
            {data.links.map((link) => (
              <li key={link.id}>
                <Link to={link.href}>{link.title}</Link>
              </li>
            ))}
          </ul>
        )}
        {data.url && (
          <p className='h3 col-span-full mt-i80 h-fit lg:col-span-1 lg:mt-0'>
            <Link className='font-medium' to={data.url}>
              {data.url.replace('https://', '')}
            </Link>
          </p>
        )}
      </div>
      {data.media && (
        <div className='relative col-span-full -mx-grid mb-[calc(theme(spacing.i16)+calc(theme(spacing.i16)))] aspect-video max-h-[1080px] lg:mb-i120'>
          <Image fill objectFit='cover' src={data.media.url} alt={data.title} />
        </div>
      )}
      <CaseContentBlocks
        className='mb-[calc(theme(spacing.i16)+theme(spacing.i16))] lg:mb-i168'
        data={data.content_blocks}
      />
      {data.review && (
        <>
          <h3 className='col-span-full font-medium'>отзыв клиента</h3>
          <div className='col-span-full -mx-grid'>
            <ReviewBigCard className='my-i32 px-grid' data={data.review} />
          </div>
        </>
      )}
      {data.team && (
        <>
          <h3 className='col-span-4 mb-i64 font-medium lg:mb-0'>команда проекта</h3>
          <CaseTeam className='col-span-4' data={data.team} />
        </>
      )}
      <SeeMore className='col-span-full mt-i168' buttonTitle='все кейсы'>
        <ElementsList className='col-span-full -mx-grid'>
          {cases.map((c) => (
            <CaseElement key={c.id} data={c as unknown as Case} />
          ))}
        </ElementsList>
      </SeeMore>
    </main>
  );
}
