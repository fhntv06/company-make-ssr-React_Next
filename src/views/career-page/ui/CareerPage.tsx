import { Cord, LoopedText, PageHeader, Link, Button, Slider, ElementsList } from '@/shared/ui';
import Infographics from '@/shared/ui/infographics/Infographics';
import { fetchCareer } from '@/entities/career';
import { fetchLastVideoPublications, VideoPublication } from '@/entities/publication';
import { fetchVacancies, VacanciesCard } from '@/entities/vacancies-card';
import Image from 'next/image';
import React from 'react';
import { VerticalTabs } from '@/features/vertical-tabs';
import { BigSlider } from '@/features/big-slider';
import AccordionList from '@/shared/ui/accordion-list/AccordionList';
import { PageVideo } from '@/entities/page-video';

const tabsHeader = [
  {
    id: 1,
    title: 'преимущества',
  },
  {
    id: 2,
    title: 'вакансии',
  },
  {
    id: 3,
    title: 'офис',
  },
];

export default async function CasesPage() {
  const data = await fetchCareer();
  const vacancies = await fetchVacancies();
  const videoPublications = await fetchLastVideoPublications();

  const { description, image, person, tabs, media } = data[0];

  return (
    <main className='grid-container'>
      <PageHeader title='работа в мэйке' />
      <div className='tag-list col-span-full mx-[calc(theme(spacing.i24)*-2)] flex grid-cols-4 gap-x-0 md:mx-0 md:grid md:gap-x-5 lg:grid-cols-8'>
        <ElementsList className='mb-grid mr-i32 flex space-x-3 pl-grid md:col-span-3 md:mb-i32 md:mr-0 md:space-x-6 md:pl-0 lg:col-span-6'>
          {tabsHeader.map((tab) => (
            <Link key={tab.id} to={`#${tab.title}`} className='h3'>
              {tab.title}
            </Link>
          ))}
        </ElementsList>
        <p className='h3 col-span-full pr-grid font-medium md:col-span-1 md:pr-0 lg:col-span-2'>стажировка</p>
      </div>
      <Cord className='col-span-full -mx-4 md:-mx-6' />
      <div className='col-span-full mb-[calc(theme(spacing.i120))] mt-grid grid-subcontainer md:mb-i120 md:mt-i32'>
        <p className='h3 col-span-4 mb-[calc(theme(spacing.i64))] md:mb-i32 lg:mb-0'>{description}</p>
        <div className='col-span-full flex flex-col gap-2 lg:col-start-7'>
          <div className='flex flex-col'>
            <div className='mb-i64 flex md:hidden'>
              <div className='relative mr-i48 size-16 overflow-hidden rounded-3xl bg-transparent'>
                <Image src={person.image} alt={person.name} fill objectFit='cover' objectPosition='top' />
              </div>
              <div>
                <p className='typo-h3'>{person.name}</p>
                <p className='text-dark'>{person.post}</p>
              </div>
            </div>
            <div className='mb-i32 hidden place-content-between md:flex'>
              <div>
                <p className='h4'>{person.name}</p>
                <p className='text-dark'>{person.post}</p>
              </div>
              <div className='relative size-16 overflow-hidden rounded-3xl bg-transparent'>
                <Image src={person.image} alt={person.name} fill objectFit='cover' objectPosition='top' />
              </div>
            </div>
            <div className='flex flex-col gap-y-2'>
              {person.contacts.map((contact) => (
                <Link
                  key={contact.title}
                  to={`mailto:${contact.link}`}
                  className='h2 md:h4 font-medium md:font-normal'
                  external={false}
                >
                  {contact.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className='relative col-span-full -mx-grid mb-i168 flex aspect-video items-center justify-center'>
        <Image src={image} alt='Alt' fill objectFit='cover' />
      </div>
      <h3 id='преимущества' className='h2 col-span-full mb-grid font-medium md:mb-i32'>
        работа в мэйке — это
      </h3>
      <Cord className='col-span-full -mx-4 md:-mx-6' />
      <AccordionList className='mb-i168 grid md:hidden' titles={tabs.map((tab) => tab.title)}>
        {tabs.map((item) => (
          <div key={item.id}>
            <p className='h4 mb-grid mt-[calc(theme(spacing.i24)*2)]'>{item.description}</p>
            {item.cover.type === 'video' && <PageVideo data={item} className='mt-i64' />}
            {item.cover.type === 'image' && (
              <div className='relative flex aspect-video items-center justify-center'>
                <Image src={item.cover.url} alt='Alt' fill objectFit='cover' />
              </div>
            )}
          </div>
        ))}
      </AccordionList>
      <VerticalTabs className='mb-[calc(theme(spacing.i80)*4)] hidden md:grid' data={tabs} />
      <h3 id='вакансии' className='h2 col-span-full mb-grid font-medium md:mb-i32'>
        вакансии
      </h3>
      <div className='ignore-dark gradient-border gradient-border-active col-span-full -mx-grid !w-screen grid-cols-8 before:bottom-0 md:hidden'></div>
      <div className='col-span-full -mx-grid hidden border-y border-black bg-bg-grey md:grid-container'>
        <Slider
          slideClassName='basis-[calc(100%/1.4+32px)] md:basis-[calc(100%/2.5)] lg:basis-[calc(100%/4)]'
          wrapperClassName='col-span-full -mx-grid'
        >
          {vacancies.map((card) => (
            <VacanciesCard key={card.id} title={card.title} links={card.links} className='col-span-2 p-grid' />
          ))}
        </Slider>
      </div>

      <AccordionList className='bg-bg-grey md:hidden' titles={vacancies.map((vacancy) => vacancy.title)}>
        {vacancies.map((card) => (
          <VacanciesCard key={card.id} links={card.links} className='col-span-2' />
        ))}
      </AccordionList>
      <div className='col-span-full -mx-grid bg-bg-grey pt-grid grid-container md:pt-i32'>
        <div className='col-span-full mb-i64 md:col-span-6 md:mb-i64'>
          <p className='h2'>не нашли подходящих активных вакансий? расскажите о своём опыте нашему hr Кате</p>
        </div>
        <div className='col-span-full mb-i120 grid grid-cols-4 gap-x-5 md:mb-i120 lg:grid-cols-8'>
          <div className='col-span-full mb-i12 pt-0 md:mb-i32 md:pt-i168 lg:col-span-2 lg:mb-0'>
            <p className='h2 mb-0 font-medium md:mb-i64'>
              <Link to={person.contacts[0].link} external={false}>
                {person.contacts[0].title}
              </Link>
            </p>
            <p className='h4 mb-i24 hidden md:block'>
              подпишитесь на телеграм-канал и следите за нами на hh.ru — не упустите клёвую работу
            </p>
            <p className='mb-[8px] hidden md:block'>
              <Link to='/' className='h4' external={false}>
                телеграм-канал
              </Link>
            </p>
            <p className='hidden md:block'>
              <Link to='https://hh.ru' className='h4'>
                мэйк на hh
              </Link>
            </p>
          </div>
          <div className='relative mb-i32 hidden h-[640px] content-center items-end sm:col-span-4 md:col-span-3 md:grid lg:col-span-2 lg:col-start-4 lg:mb-0'>
            <Image fill src={person.image} alt={person.name} objectFit='cover' objectPosition='top left' />
          </div>
          <p className='h2 col-span-full mb-i80 grid font-medium md:mb-i120 lg:col-span-2 lg:col-start-7 lg:justify-items-end lg:pt-i168'>
            <Link to={person.contacts[1].link} external={false} className='h-fit'>
              {person.contacts[1].title}
            </Link>
          </p>
          <div className='relative col-span-full row-span-2 mb-i80 flex items-center justify-center pb-[142%] md:hidden'>
            <Image src={person.image} alt={person.name} fill objectFit='cover' objectPosition='top left' />
          </div>
          <div className='col-span-full grid grid-cols-4 gap-x-4 md:hidden'>
            <p className='h4 col-span-3 mb-i64'>
              подпишитесь на телеграм-канал и следите за нами на hh.ru — не упустите клёвую работу
            </p>
            <p className='col-span-full mb-i16'>
              <Link to='/' className='h4 max-[1194px]:base-link-hover' external={false}>
                телеграм-канал
              </Link>
            </p>
            <p className='col-span-full'>
              <Link to='https://hh.ru' className='h4 max-[1194px]:base-link-hover'>
                мэйк на hh
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className='col-span-full -mx-grid overflow-hidden bg-dark'>
        <LoopedText className='text-h1-big pb-i120 pt-i168 text-white'>место диджитал-силы в кемерово </LoopedText>
        <Cord className='col-span-full -mx-4 md:-mx-6' white />
        <div id='офис' className='mb-i80 pt-i32'>
          <BigSlider media={media} />
        </div>
        <div className='col-span-full mb-i120 gap-y-i80 grid-container md:gap-y-i80'>
          <div className='col-span-4 hidden grid-cols-2 gap-x-4 md:gap-x-5 lg:grid'>
            <Infographics toNumber={320} text='площадь офиса' postfix='м2' />
          </div>
          <div className='col-span-2 col-start-1 grid grid-cols-2 gap-x-4 md:gap-x-5 lg:col-span-4 lg:col-start-5'>
            <Infographics toNumber={120} text='часов лекториев' />
          </div>
          <div className='col-span-2 col-start-3 grid grid-cols-2 gap-x-4 md:gap-x-5 lg:col-span-4'>
            <Infographics toNumber={120} text='человек — вместимость' />
          </div>
          <div className='col-span-4 lg:col-start-5'>
            <p className='h4 md:h3 mb-i64 text-white'>
              проводим образовательные активности: для сотрудников и внешней аудитории. у нас выступают лидеры отрасли —
              Артём Геллер, Артём бреславский и другие
            </p>
            <ElementsList className='mb-grid flex flex-col md:col-span-3 md:mb-i32 lg:col-span-6'>
              <Link to='/' className='h4 text-white' underline>
                лектории мэйка
              </Link>
              <Link to='/' className='h4 max-[1194px]:base-link-hover text-white'>
                как мы строили офис
              </Link>
            </ElementsList>
          </div>
        </div>
        <div className='col-span-full mb-grid grid-container md:mb-i32'>
          <p className='h4 md:h3 col-span-4 text-white'>записи лекториев</p>
        </div>
        <Cord className='col-span-full -mx-4 md:-mx-6' white />
        <div className='col-span-full gap-y-i120 pt-grid grid-container md:gap-y-i168 md:pt-i32'>
          {videoPublications.map((p) => (
            <VideoPublication key={p.id} data={p} className='col-span-4' contrast />
          ))}
        </div>
        <div className='col-span-full flex justify-center pb-i168 pt-i120'>
          <Button
            href='/about'
            className='hidden md:flex'
            wrapperClassName='md:rounded-2xl'
            iconRight='arrow-right'
            size='big'
          >
            все публикации
          </Button>
          <Button
            href='/about'
            className='mx-grid w-full md:hidden'
            wrapperClassName='px-grid pl-i48'
            iconRight='arrow-right'
            size='small'
          >
            все публикации
          </Button>
        </div>
      </div>
    </main>
  );
}
