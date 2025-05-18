import React from 'react';
import { PageHeader, Button, Cord } from '@/shared/ui';
import { JournalFilter, JournalList, AuthorList, JournalTagList } from '@/features/journal-filter';
import { SocialNetworksIconList } from '@/widgets/social-networks';
import { fetchStories } from '@/entities/stories/api';
import { fetchLastVideoPublications } from '@/entities/publication';
import { VideoPublicationSlider } from '@/widgets/video-publication-slider';
import StoriesSliderList from '@/widgets/stories-list/ui/StoriesSliderList';

const journal = [
  {
    id: 1,
    series: [
      {
        id: 0,
        name: 'пресс-центр на сайте: кому и для чего нужен, часть 1',
        slug: 'priess-tsientr-na-saitie-komu-i-dlia-chiegho-nuzhien-chast-1',
        active: true,
        description: null,
        publication_date: '2024-02-15T20:23:00.000000Z',
        created_at: '2024-03-11T20:24:17.000000Z',
        updated_at: '2024-03-25T17:31:04.000000Z',
        preview: {
          url: '/images/publications/01.jpg',
        },
        type: 2,
        tags: [
          {
            id: 7,
            type: 1,
            title: 'исследование',
          },
          {
            id: 1,
            type: 1,
            title: 'технологии',
          },
        ],
        content_blocks: [],
        author: {
          id: 0,
          name: 'Иван',
          surname: 'Тильтевский',
          photo: {
            url: '/images/employees/make1.png',
          },
          description: 'важный человек',
        },
      },
      {
        id: 1,
        name: 'пресс-центр на сайте: кому и для чего нужен, часть 2',
        slug: 'priess-tsientr-na-saitie-komu-i-dlia-chiegho-nuzhien-chast-2',
        active: true,
        description: 'советуем сначала прочитать первую часть',
        publication_date: '2024-02-15T20:23:00.000000Z',
        created_at: '2024-03-11T20:24:17.000000Z',
        updated_at: '2024-03-25T17:31:04.000000Z',
        preview: {
          url: '/images/publications/02.jpg',
        },
        type: 2,
        content_blocks: [],
      },
    ],
  },
  {
    id: 2,
    name: 'каждый пятый региональный госсайт работает на иностранной платформе',
    slug: 'kazhdyi-piatyi-rieghional-nyi-ghossait-rabotaiet-na-inostrannoi-platformie',
    active: true,
    description: null,
    publication_date: '2024-02-15T20:23:00.000000Z',
    created_at: '2024-03-11T20:24:17.000000Z',
    updated_at: '2024-03-25T17:31:04.000000Z',
    preview: null,
    type: 2,
    tags: [
      {
        id: 7,
        type: 1,
        title: 'исследование',
      },
      {
        id: 1,
        type: 1,
        title: 'vc.ru',
      },
    ],
    content_blocks: [],
    author: {
      id: 0,
      name: 'Иван',
      surname: 'Тильтевский',
      photo: {
        url: '/images/employees/make1.png',
      },
      description: 'важный человек',
    },
  },
  {
    id: 3,
    name: 'SEO и контекстная реклама: сравнение, стоимость, выгода',
    slug: 'seo-i-kontiekstnaia-rieklama-sravnieniie-stoimost-vyghoda',
    active: true,
    description: null,
    publication_date: '2024-02-15T20:23:00.000000Z',
    created_at: '2024-03-11T20:24:17.000000Z',
    updated_at: '2024-03-25T17:31:04.000000Z',
    preview: null,
    type: 2,
    tags: [
      {
        id: 0,
        type: 1,
        title: 'маркетинг',
      },
      {
        id: 7,
        type: 1,
        title: 'исследование',
      },
      {
        id: 2,
        type: 1,
        title: 'seo',
      },
      {
        id: 3,
        type: 1,
        title: 'контекстная реклама',
      },
    ],
    content_blocks: [],
    author: {
      id: 1,
      name: 'Александр',
      surname: 'Морозов',
      photo: {
        url: '/images/employees/make2.png',
      },
      description: 'важный человек',
    },
  },
  {
    id: 4,
    name: 'ORM для автодилеров: как повысить узнаваемость бренда через работу с отзывами',
    slug: 'orm-dlia-avtodilierov-kak-povysit-uznavaiemost-brienda-chieriez-rabotu-s-otzyvami',
    active: true,
    description:
      'прежде чем посетить автосалон и приобрести автомобиль, около 90% клиентов читают отзывы в интернете. поэтому на образ и общее впечатление бренда влияет то, какую информацию о нем пишут в сети.',
    publication_date: '2024-02-15T20:23:00.000000Z',
    created_at: '2024-03-11T20:24:17.000000Z',
    updated_at: '2024-03-25T17:31:04.000000Z',
    preview: null,
    type: 2,
    tags: [
      {
        id: 0,
        type: 1,
        title: 'маркетинг',
      },
      {
        id: 7,
        type: 1,
        title: 'исследование',
      },
      {
        id: 2,
        type: 1,
        title: 'orm',
      },
    ],
    content_blocks: [],
    author: {
      id: 1,
      name: 'Александр',
      surname: 'Морозов',
      photo: {
        url: '/images/employees/make2.png',
      },
      description: 'важный человек',
    },
  },
  {
    id: 5,
    name: 'smm для автодилера: почему нужно вести соцсети',
    slug: 'smm-dlia-avtodiliera-pochiemu-nuzhno-viesti-sotssieti',
    active: true,
    description:
      'большинство пользователей до 30 лет сначала просматривает страницу дилера в соцсетях, а потом посещает сайт. потенциальные клиенты смотрят, насколько бизнес вовлечен в работу с аудиторией',
    publication_date: '2024-02-15T20:23:00.000000Z',
    created_at: '2024-03-11T20:24:17.000000Z',
    updated_at: '2024-03-25T17:31:04.000000Z',
    preview: null,
    type: 2,
    tags: [
      {
        id: 0,
        type: 1,
        title: 'маркетинг',
      },
      {
        id: 7,
        type: 1,
        title: 'исследование',
      },
      {
        id: 2,
        type: 1,
        title: 'orm',
      },
    ],
    content_blocks: [],
    author: {
      id: 1,
      name: 'Александр',
      surname: 'Морозов',
      photo: {
        url: '/images/employees/make2.png',
      },
      description: 'важный человек',
    },
  },
  {
    id: 6,
    name: 'мэйк представл игру gennady на игропром-2023',
    slug: 'meik-priedstavl-ighru-gennady-na-ighroprom-2023',
    active: true,
    description:
      'игровая студия мэйка feed-64 представила свой первый проект — хардкорный платформер gennady на выставке игропром',
    publication_date: '2024-02-15T20:23:00.000000Z',
    created_at: '2024-03-11T20:24:17.000000Z',
    updated_at: '2024-03-25T17:31:04.000000Z',
    preview: {
      url: '/images/publications/03.jpg',
    },
    type: 2,
    tags: [
      {
        id: 8,
        type: 1,
        title: 'геймдев',
      },
      {
        id: 1,
        type: 1,
        title: 'события',
      },
    ],
    content_blocks: [],
    author: {
      id: 1,
      name: 'Александр',
      surname: 'Морозов',
      photo: {
        url: '/images/employees/make2.png',
      },
      description: 'важный человек',
    },
  },
];

const journalFilters = {
  categories: [
    {
      id: 0,
      title: 'все',
    },
    {
      id: 0,
      title: 'маркетинг',
    },
    {
      id: 0,
      title: 'события',
    },
    {
      id: 0,
      title: 'проекты',
    },
    {
      id: 0,
      title: 'жизнь',
    },
  ],
  tags: [
    {
      id: 0,
      type: 1,
      title: 'автодилеры',
    },
    {
      id: 1,
      type: 1,
      title: 'лекторий',
    },
    {
      id: 2,
      type: 1,
      title: 'награды',
    },
    {
      id: 3,
      type: 1,
      title: 'доклады',
    },
    {
      id: 4,
      type: 1,
      title: 'конференции',
    },
    {
      id: 5,
      type: 1,
      title: 'видеопродакшн',
    },
    {
      id: 6,
      type: 1,
      title: 'полезное',
    },
    {
      id: 7,
      type: 1,
      title: 'исследования',
    },
    {
      id: 8,
      type: 1,
      title: 'геймдев',
    },
  ],
  education: [
    {
      id: 0,
      type: 1,
      title: 'школа проектирования',
    },
    {
      id: 1,
      type: 1,
      title: 'школа ruby',
    },
    {
      id: 2,
      type: 1,
      title: 'школа smm',
    },
  ],
  authors: [
    {
      id: 0,
      name: 'Иван',
      surname: 'Тельтевский',
      photo: {
        url: '/images/employees/make1.png',
      },
      description: 'важный человек',
    },
    {
      id: 1,
      name: 'Александр',
      surname: 'Морозов',
      photo: {
        url: '/images/employees/make2.png',
      },
      description: 'важный человек',
    },
    {
      id: 2,
      name: 'Екатерина',
      surname: 'Титаева',
      photo: {
        url: '/images/employees/make5.png',
      },
      description: 'важный человек',
    },
    {
      id: 3,
      name: 'Николай',
      surname: 'Кузнецов',
      photo: {
        url: '/images/employees/make7.png',
      },
      description: 'важный человек',
    },
    {
      id: 4,
      name: 'Вадим',
      surname: 'Данилков',
      photo: {
        url: '/images/employees/make9.png',
      },
      description: 'важный человек',
    },
    {
      id: 5,
      name: 'Даниил',
      surname: 'Филиппов',
      photo: {
        url: '/images/employees/make8.png',
      },
      description: 'важный человек',
    },
    {
      id: 6,
      name: 'Александр',
      surname: 'Кудрявцев',
      photo: {
        url: '/images/employees/make6.png',
      },
      description: 'важный человек',
    },
  ],
};

const socialNetworks = [
  {
    id: 1,
    title: 'телеграм-канал',
    href: 'https://t.me/makeagency',
    children: [],
  },
  {
    id: 2,
    title: 'vk',
    href: 'https://vk.com/makeagency',
    children: [],
  },
  {
    id: 3,
    title: 'youtube',
    href: 'https://www.youtube.com/@makeagency',
    children: [],
  },
  {
    id: 4,
    title: 'vc',
    href: 'https://vc.ru/makeagency',
    children: [],
  },
  {
    id: 5,
    title: 'dprofile',
    href: 'https://dprofile.ru/makeagency',
    children: [],
  },
  {
    id: 6,
    title: 'behance',
    href: 'https://www.behance.net/titaev',
    children: [],
  },
];

export default async function JournalPage() {
  const stories = await fetchStories();
  const videoPublications = await fetchLastVideoPublications();

  return (
    <main className='grid-container'>
      <PageHeader title='журнал' withBackLink>
        <JournalFilter className='col-span-4' data={journalFilters} />
      </PageHeader>
      <StoriesSliderList
        className='col-span-full mb-i48 flex w-full *:flex-1 [&>*:first-child]:!pl-0 [&>*:last-child]:!pr-0'
        data={stories}
      />
      <div className='relative col-span-full grid-subcontainer before:col-span-full before:-mx-grid before:mb-grid before:h-px before:bg-light-grey before:content-[""]'>
        <div className='col-span-2 hidden lg:block'>
          <div className='sticky top-grid space-y-i64 lg:top-i120'>
            <JournalTagList data={journalFilters.tags} />
            <JournalTagList className='font-medium' data={journalFilters.education} />
          </div>
        </div>
        <JournalList className='col-span-4' data={journal} />
        <div className='col-span-2 hidden lg:block'>
          <div className='sticky top-grid lg:top-i120'>
            <AuthorList className='mb-i64' authors={journalFilters.authors} align='right' />
            <SocialNetworksIconList className='ml-auto w-[calc(64px*4)] flex-wrap justify-end' data={socialNetworks} />
          </div>
        </div>
      </div>
      <div className='col-span-full mb-i168 mt-i80 flex md:justify-center'>
        <Button
          className='col-span-full w-full md:w-auto'
          size='big'
          iconRight='arrow-right'
          href='/about'
          theme='gray'
        >
          больше материалов
        </Button>
      </div>
      <h2 className='col-span-full font-medium'>видео</h2>
      <Cord className='col-span-full -mx-grid my-4 lg:my-i32' />
      <VideoPublicationSlider className='col-span-full' data={videoPublications} />
      <div className='col-span-full mb-i168 mt-i120 flex md:justify-center'>
        <Button
          className='col-span-full w-full md:w-auto'
          size='big'
          iconRight='arrow-right'
          href='/about'
          theme='gray'
        >
          все видео
        </Button>
      </div>
      <Cord className='col-span-full -mx-grid mb-[calc(theme(spacing.i16)+theme(spacing.i16))] hidden md:block' />
    </main>
  );
}
