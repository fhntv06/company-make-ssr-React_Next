import { Scene, SceneClient } from '@/features/webgl-scene';
import { Button, Cord, LoopedText, ElementsList } from '@/shared/ui';
import { CardMenu } from '@/widgets/card-menu';
import {
  fetchMainPublication,
  MainPublication,
  fetchLastPublications,
  SmallPublication,
  VideoPublication,
  fetchLastVideoPublications,
} from '@/entities/publication';
import { MainPageCases } from '@/widgets/cases';
import { fetchCases } from '@/entities/case';
import React from 'react';
import { fetchCardsMenu } from '@/entities/links-card';
import { MainInfographicsScreen } from '@/widgets/infographics-screen';
import { fetchTags } from '@/entities/showreel/api';
import { fetchCategories } from '@/entities/categories';

export default async function Home() {
  const mainPublication = await fetchMainPublication();
  const lastPublications = await fetchLastPublications();
  const services = await fetchCategories();
  const cardsMenu = await fetchCardsMenu();
  const cases = await fetchCases({ categoryId: '1' });
  const tags = await fetchTags();
  const videoPublications = await fetchLastVideoPublications();

  return (
    <main className=''>
      <header className='relative bg-bg-grey grid-subcontainer before:absolute before:inset-x-0 before:bottom-full before:h-24 before:bg-bg-grey'>
        <div className='relative col-span-full lg:col-span-5 lg:col-start-4'>
          <div className='absolute inset-x-0 top-56 aspect-video max-h-[1200px] md:top-0 lg:top-10'>
            <Scene />
          </div>
        </div>
        <div className='z-10 col-span-full mb-i32 mt-i200 flex flex-col justify-between px-grid md:flex-row md:items-end'>
          <h2 className='mb-[calc(theme(spacing.i120)*2+theme(spacing.i48))] font-medium md:mb-0'>
            создаём
            <br />и сопровождаем
            <br />
            цифровые продукты
          </h2>
          <SceneClient className='ml-auto' />
        </div>
        <CardMenu data={cardsMenu} />
      </header>

      <div className='pt-i168 grid-container'>
        <div className='text-h1-big col-span-full mb-i120 inline-flex w-full justify-center lowercase'>
          <h1 className='relative text-center font-medium'>
            Кейсы
            <sup className='p absolute left-full font-normal text-dark lg:top-[1em]'>200+</sup>
          </h1>
        </div>
        <div className={'col-span-full'}>
          <MainPageCases data={cases} services={services} />
        </div>
      </div>

      {/* eslint-disable-next-line tailwindcss/no-custom-classname */}
      <h2 className='pt-i160 mb-[calc(theme(spacing.i16)+theme(spacing.i16))] px-grid font-medium lowercase md:mb-i32'>
        Журнал
      </h2>
      <Cord />
      <div className='mb-[calc(2*theme(spacing.i120))] grid-container lg:pt-2'>
        <MainPublication data={mainPublication} className='col-span-4 border-b border-t-0 p-grid lg:border-b-0' />
        <div className='col-span-4 -mx-grid mb-i80 lg:mx-0'>
          <ElementsList className='w-full'>
            {lastPublications.map((publication) => (
              <SmallPublication key={publication.id} data={publication} />
            ))}
          </ElementsList>
        </div>
        <div className='col-span-full gap-y-i120 grid-subcontainer lg:space-y-0'>
          {videoPublications.map((p) => (
            <VideoPublication key={p.id} data={p} className='col-span-4' />
          ))}
        </div>
        <div className='col-span-full mt-i120 inline-flex justify-center'>
          <Button iconRight='arrow-right' href='#' theme='gray'>
            Все публикации
          </Button>
        </div>
      </div>
      <LoopedText className='mb-i120'>
        <h2 className={'text-h1-big inline tracking-tighter'}>
          диджитал-агентство<span className='font-medium'> мэйк </span> в цифрах и фактах &nbsp;
        </h2>
      </LoopedText>
      <MainInfographicsScreen tags={tags} />
    </main>
  );
}
