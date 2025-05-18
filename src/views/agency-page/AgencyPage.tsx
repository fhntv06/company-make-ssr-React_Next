import {
  Button,
  Cord,
  Link,
  LoopedText,
  PageHeader,
  Infographics,
  Breaker,
  ClientHeader,
  Slider,
  ElementsList,
} from '@/shared/ui';
import React from 'react';
import { Showreel } from '@/entities/showreel';
import { SmallSlider } from '@/features/small-slider';
import {
  fetchAboutMakeImages,
  fetchAwardsList,
  fetchCompanyGroups,
  fetchStaffMakeImages,
} from '@/entities/publication/api/api';
import { BigSlider } from '@/features/big-slider';
import { AwardTable } from '@/features/award-table';
import { WorkFormatType } from '@/shared/lib/types';
import { CompanyGroup } from '@/features/company-group';
import { CoreUnits } from '@/features/core-units';
import { ClientCard } from '@/entities/client';
import { fetchClients } from '@/entities/client/api/api';

const tabs = [
  {
    id: 0,
    title: 'награды',
    slug: '/awards',
  },
  {
    id: 1,
    title: 'клиенты',
    slug: '/clients',
  },
  {
    id: 2,
    title: 'работа',
    slug: '/career',
  },
];

export default async function AgencyPage() {
  const smallSlider = await fetchStaffMakeImages();
  const bigSlider = await fetchAboutMakeImages();
  const awardList = await fetchAwardsList();
  const clients = await fetchClients();
  const units: WorkFormatType[] = [
    {
      id: 1,
      title: 'продуктовый юнит',
      subtitle: 'разработка и поддержка',
      description:
        'продуктовый юнит создает, развивает и поддерживает сайты, порталы и приложения. наша экспертиза особенно глубока в разработке для государства и промышленности',
      keywords: [
        {
          id: 0,
          type: 1,
          title: 'аналитика и проектирование',
        },
        {
          id: 2,
          type: 1,
          title: 'разработка',
        },
        {
          id: 3,
          type: 1,
          title: 'дизайн',
        },
        {
          id: 4,
          type: 1,
          title: 'продуктовая разработка',
        },
      ],
    },
    {
      id: 2,
      title: 'рекламный юнит',
      subtitle: 'комплексный digital-маркетинг',
      description: 'контекстная реклама, SEO-продвижение, аналитика и PR',
      keywords: [
        {
          id: 0,
          type: 1,
          title: 'гибкие условия',
        },
        {
          id: 2,
          type: 1,
          title: 'выделенная команда',
        },
        {
          id: 3,
          type: 1,
          title: 'работа спринтами',
        },
        {
          id: 4,
          type: 1,
          title: 'нестандартная разработка',
        },
        {
          id: 5,
          type: 1,
          title: 'тестирование гипотез',
        },
        {
          id: 6,
          type: 1,
          title: 'mvp',
        },
      ],
    },
  ];
  const companyGroups = await fetchCompanyGroups();

  return (
    <main className='grid-container'>
      <PageHeader title={'агентство'}>
        <div className='tag-list col-span-full -mx-grid lg:grid-subcontainer'>
          <ElementsList className='tag-item h3 col-span-4 mr-i24 flex flex-row space-x-i24 lg:col-span-4 lg:mr-0'>
            <div>
              <Link className='h3' to='#0'>
                агентство
              </Link>
            </div>
            <div>
              <Link className='h3' to='#1'>
                команда
              </Link>
            </div>
          </ElementsList>
          <ElementsList className='tag-item h3 col-span-4 flex space-x-i24 lg:col-span-4 lg:[&>*:last-child]:!ml-auto'>
            {tabs.map((tab) => (
              <div key={tab.id}>
                <Link to={tab.slug} className='font-normal lg:font-medium'>
                  {tab.title}
                </Link>
              </div>
            ))}
          </ElementsList>
        </div>
        <Cord className='col-span-full -mx-grid mb-2 pt-[calc(theme(spacing.i16)+theme(spacing.i16))] md:pt-i32' />
      </PageHeader>

      <div className='col-span-full mt-[calc(theme(spacing.i16)+theme(spacing.i16))] grid-subcontainer md:mt-i32'>
        <p className='h2 col-span-full mb-i120 lg:col-span-6'>
          12 лет создаём, продвигаем и поддерживаем цифровые продукты любого масштаба. два офиса — главный в кемерово,
          второй в москве. core-юниты — продуктовый и рекламный
        </p>
        <CoreUnits units={units} />
      </div>

      <div className='col-span-full -mx-grid lg:*:min-h-screen'>
        <Showreel
          className='px-grid'
          media={{ type: 'video', url: 'https://kinescope.io/embed/6fDTjWAubgzmt7ADqh1SXU' }}
          header={<h2 className={'col-span-full font-medium text-white'}>мы мэйк</h2>}
          footer={<Infographics toNumber={50} text='специалистов в штате' postfix='+' />}
          preview={'/images/showrel.jpg'}
        />
        <div className='bg-dark px-i24 pt-grid grid-container md:pt-i80'>
          <div className='col-span-full grid h-fit grid-cols-4 gap-x-i48 gap-y-i80 md:grid-cols-2 md:gap-i80 lg:col-span-4'>
            <Infographics toNumber={200} text='успешных проектов и созданных продуктов' postfix='+' />
            <Infographics toNumber={30} text='наград' postfix='+' />
            <Infographics toNumber={12} text='на рынке' postfix='лет' />
          </div>
          <div className='col-span-full my-i80 lg:col-span-4 lg:my-0'>
            <p className='h3 mb-i80 text-white'>
              строим команды из талантливых специалистов, комбинируем навыки и эффективно управляем проектами любого
              масштаба. наши партнёры получают классный сервис, а мы заслуженно занимаем высокие позиции в отраслевых
              рейтингах
            </p>
            <div className='-mx-grid mb-grid w-screen border-b opacity-16 md:hidden'></div>
            <div className='grid grid-cols-4 md:gap-y-i64'>
              <div className='col-span-full flex flex-col-reverse md:col-span-2 md:flex-col'>
                <p className='relative mb-4 pb-4 text-white/64 after:absolute after:bottom-0 after:left-0 after:-mx-grid after:h-px after:w-screen after:bg-white/16 after:content-[""] md:text-white md:after:mx-0 md:after:w-full '>
                  рейтинг рунета
                </p>
                <Infographics
                  toNumber={15}
                  text='в рейтинге подрядчиков для государства'
                  postfix=''
                  small
                  className='md:pr-i64'
                />
              </div>
              <div className='col-span-full flex flex-col-reverse md:col-span-2 md:flex-col'>
                <p className='relative mb-4 pb-4 text-white/64 after:absolute after:bottom-0 after:left-0 after:-mx-grid after:h-px after:w-screen after:bg-white/16 after:content-[""] md:text-white md:after:mx-0 md:after:w-full'>
                  рейтинг рунета
                </p>
                <Infographics toNumber={56} text='в рейтинге веб-студий' postfix='' small className='md:pr-i64' />
              </div>
              <div className='col-span-full flex flex-col-reverse md:col-span-2 md:flex-col'>
                <p className='relative mb-4 pb-4 text-white/64 after:absolute after:bottom-0 after:left-0 after:-mx-grid after:h-px after:w-screen after:bg-white/16 after:content-[""] md:text-white md:after:mx-0 md:after:w-full'>
                  рейтинг рунета
                </p>
                <Infographics
                  toNumber={20}
                  text='в рейтинге агентств по поддержке и развитию сайтов'
                  postfix=''
                  small
                  className='md:pr-i64'
                />
              </div>
              <div className='col-span-full flex flex-col-reverse md:col-span-2 md:flex-col'>
                <p className='relative mb-4 pb-4 text-white/64 after:absolute after:bottom-0 after:left-0 after:-mx-grid after:h-px after:w-screen after:bg-white/16 after:content-[""] md:text-white md:after:mx-0 md:after:w-full'>
                  tagline
                </p>
                <Infographics toNumber={17} text='в рейтинге дизайн-студий' postfix='' small className='md:pr-i64' />
              </div>
            </div>
            <Button
              className='col-span-full mt-i80 '
              size={'big'}
              theme={'gray'}
              href={'/awards'}
              iconRight={'arrow-right'}
            >
              все рейтинги и награды
            </Button>
          </div>
          <p className='lg:h3 h2 col-span-full mb-[calc(theme(spacing.i16)+theme(spacing.i16))] font-medium text-white md:mb-i32 md:mt-i120'>
            компетенции
          </p>
          <div className='col-span-full -mx-grid'>
            <Breaker />
            <ClientHeader />
          </div>
          <div className='col-span-full lg:col-span-6'>
            <p className='lg:h2 mb-i120 mt-i168 text-white typo-h3'>
              из небольшой региональной студии мы выросли в группу компаний федерального уровня. работаем с крупными
              клиентами из госсектора, промышленности и других отраслей
            </p>
          </div>
          <div className='col-span-full mb-i32 flex justify-between'>
            <p className='h3 hidden text-white md:block'>ключевые клиенты</p>
            <p className='h3 font-medium text-white md:hidden'>компетенции</p>
            <p className='h3 hidden font-medium text-white md:block'>все клиенты</p>
          </div>
          <div className='col-span-full -mx-grid'>
            <Slider
              wrapperClassName='col-span-full'
              slideClassName='lg:basis-[calc((100%-theme(spacing.grid))/4)] md:basis-[calc((100%-theme(spacing.grid))/3)] basis-[calc((100%-theme(spacing.grid)))] !border-white'
              borderSlides
            >
              {clients.map((slide) => (
                <ClientCard key={slide.id} data={slide} />
              ))}
            </Slider>
          </div>
        </div>
      </div>

      <div className='col-span-full grid-subcontainer'>
        <div className='col-span-full -mx-grid bg-dark px-i24 pb-i32 pt-i168'>
          <p className='h2 font-medium text-white'>группа компаний</p>
        </div>
        <div className='col-span-full -mx-grid'>
          <CompanyGroup companyGroups={companyGroups} />
        </div>
      </div>
      <div className='col-span-full -mx-grid mb-i32'>
        <LoopedText className='text-h1-big mb-i120 mt-i200 font-medium'>
          мэйк — это команда мэйк — это люди &nbsp;
        </LoopedText>
        <Cord />
      </div>
      <div className='col-span-full grid-subcontainer'>
        <p className='h3 col-span-full mb-i80 lg:col-span-4'>
          собрали звёзд и научили их работать вместе. ключевые сотрудники с нами более лет 5 лет — в каждом юните своя
          слаженная команда, построенная вокруг мощного костяка
        </p>
        <div className='col-span-full col-start-1 mb-i64 flex flex-col items-start lg:col-span-2 lg:col-start-6 lg:space-y-2'>
          <Link className='h4' to=''>
            работа в мэйке
          </Link>
          <Link className='h4' to=''>
            вакансии
          </Link>
        </div>
        <div className='col-span-full -mx-grid !mb-i168'>
          <SmallSlider media={smallSlider} />
        </div>
        <div className='col-span-full grid-subcontainer'>
          <p className='h3 lg:h2 col-span-full mb-i120 lg:col-span-6'>
            мэйк живёт в лучшем диджитал-офисе кемерова. проводим бесплатные лектории для специалистов креативных
            индустрий, выступаем на профильных конференциях
          </p>
          <div className='col-span-full'>
            <BigSlider media={bigSlider} />
          </div>
        </div>
      </div>

      <div className='col-span-full mt-i168'>
        <p className='col-span-full mb-i120 typo-h3 lg:col-span-6 lg:typo-h2'>
          результаты команды часто
          <br />
          отмечаются наградами
        </p>
        <p className='h3 relative col-span-full font-medium'>последние награды</p>
        <Cord className='col-span-full -mx-grid pt-[calc(theme(spacing.i16)+theme(spacing.i16))] md:pt-i32' />
        <AwardTable data={awardList.slice(0, 10)} />
        <div className='relative mb-i168 flex justify-center'>
          <Button
            className='mt-i120 w-full md:w-auto'
            size={'big'}
            theme={'gray'}
            href={'/awards'}
            iconRight={'arrow-right'}
          >
            все рейтинги и награды
          </Button>
        </div>
      </div>
    </main>
  );
}
