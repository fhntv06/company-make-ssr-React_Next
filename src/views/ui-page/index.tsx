'use client';

import {
  Button,
  Dropdown,
  Modal,
  Spoiler,
  Checkbox,
  Radio,
  LoopedText,
  Cord,
  MakeAgencyLink,
  // Infographics,
  BlocksHeader,
  ElementsList,
} from '@/shared/ui';
import React, { useState } from 'react';
import { DropDownItem } from '@/shared/model/dropdown/types';
import { useModal } from '@/shared/lib/hooks';
import { Scene } from '@/features/webgl-scene';
import { Client } from '@/entities/client';
// import { InfographicsScreen } from '@/widgets/infographics-screen';
import { Showreel } from '@/entities/showreel';
import { Tag as TagType } from '@/shared/lib/types';
import AdsBanner from '@/features/ui/AdsBanner';
import { AwardTable } from '@/features/award-table/';
import { SmallSlider } from '@/features/small-slider';
import { BigSlider } from '@/features/big-slider';
import CookiePopup from '@/shared/ui/cookie-popup/CookiePopup';
import { GallerySlider, GalleryViewer } from '@/features/gallery';

const PLUG_DROPDOWN_ITEMS = [
  { id: 1, value: 1, label: 'Первый пункт' },
  { id: 2, value: 2, label: 'Второй пункт' },
  { id: 3, value: 3, label: 'Третий пункт' },
  { id: 4, value: 4, label: 'Четвертый пункт' },
];

const tags: TagType[] = [
  {
    id: 1,
    type: 1,
    title: 'промышленность',
  },
  {
    id: 2,
    type: 1,
    title: 'государство',
  },
  {
    id: 3,
    type: 1,
    title: 'автодилеры',
  },
  {
    id: 4,
    type: 1,
    title: 'техника и транспорт',
  },
];

const adsTags: TagType[] = [
  {
    id: 1,
    type: 1,
    title: 'конструктор',
  },
  {
    id: 2,
    type: 1,
    title: 'ит-инфраструктура',
  },
  {
    id: 3,
    type: 1,
    title: 'продукт',
  },
];

const adsBannerData = {
  mainClient: {
    id: 1,
    name: 'Конструктор®',
    icon: '/images/clients/gosweb.svg',
  },
  title: 'сайт госучреждения за 3 дня',
  tags: adsTags,
  clients: [
    {
      id: 1,
      name: 'Правительство Кузбасса',
      icon: '/images/clients/kuzbass-gov.svg',
    },
    {
      id: 2,
      name: 'ЯНАО',
      icon: '/images/clients/yanao.svg',
    },
    {
      id: 3,
      name: 'ЖНС',
      icon: '/images/clients/zhns.svg',
    },
  ],
  description: 'конструктор — современная российская платформа и инструмент для создания сайтов госучреждений',
  link: 'gos-editor.ru',
};

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
];

const galleryImages = [
  {
    id: 0,
    media: {
      url: '/images/gallery/gallery1.jpg',
      type: 'image/jpeg',
      aggregate_type: 'image',
      extension: 'jpg',
    },
  },
  {
    id: 1,
    media: {
      url: '/images/gallery/gallery2.jpg',
      type: 'image/jpeg',
      aggregate_type: 'image',
      extension: 'jpg',
    },
  },
  {
    id: 2,
    media: {
      url: '/images/gallery/gallery3.jpg',
      type: 'image/jpeg',
      aggregate_type: 'image',
      extension: 'jpg',
    },
  },
];

const aboutMakeImages = [
  {
    id: 0,
    media: {
      url: '/images/make_about_slider/2.jpg',
      type: 'image/jpeg',
      aggregate_type: 'image',
      extension: 'jpg',
    },
  },
  {
    id: 1,
    media: {
      url: '/images/make_about_slider/2.jpg',
      type: 'image/jpeg',
      aggregate_type: 'image',
      extension: 'jpg',
    },
  },
  {
    id: 2,
    media: {
      url: '/images/make_about_slider/2.jpg',
      type: 'image/jpeg',
      aggregate_type: 'image',
      extension: 'jpg',
    },
  },
  {
    id: 3,
    media: {
      url: '/images/make_about_slider/2.jpg',
      type: 'image/jpeg',
      aggregate_type: 'image',
      extension: 'jpg',
    },
  },
  {
    id: 4,
    media: {
      url: '/video/video1.mov',
      type: 'video',
      aggregate_type: 'video',
      extension: 'video',
    },
    duration: 5000,
  },
  {
    id: 5,
    media: {
      url: '/images/make_about_slider/2.jpg',
      type: 'image/jpeg',
      aggregate_type: 'image',
      extension: 'jpg',
    },
  },
  {
    id: 6,
    media: {
      url: '/video/video1.mov',
      type: 'video',
      aggregate_type: 'video',
      extension: 'video',
    },
    duration: 5000,
    userControls: true,
  },
];
const staffMakeImages = [
  {
    id: 0,
    media: {
      url: '/images/make_staff_slider/1.jpg',
      type: 'image/jpeg',
      aggregate_type: 'image',
      extension: 'jpg',
    },
    name: 'Andrew',
    position: 'ceo',
  },
  {
    id: 1,
    media: {
      url: '/images/make_staff_slider/1.jpg',
      type: 'image/jpeg',
      aggregate_type: 'image',
      extension: 'jpg',
    },
    name: 'Andrew',
    position: 'ceo',
  },
  {
    id: 2,
    media: {
      url: '/images/make_staff_slider/1.jpg',
      type: 'image/jpeg',
      aggregate_type: 'image',
      extension: 'jpg',
    },
    name: 'Andrew',
    position: 'ceo',
  },
  {
    id: 3,
    media: {
      url: '/images/make_staff_slider/1.jpg',
      type: 'image/jpeg',
      aggregate_type: 'image',
      extension: 'jpg',
    },
    name: 'Andrew',
    position: 'ceo',
  },
  {
    id: 4,
    media: {
      url: '/images/make_staff_slider/1.jpg',
      type: 'image/jpeg',
      aggregate_type: 'image',
      extension: 'jpg',
    },
    name: 'Andrew',
    position: 'ceo',
  },
  {
    id: 5,
    media: {
      url: '/images/make_staff_slider/1.jpg',
      type: 'image/jpeg',
      aggregate_type: 'image',
      extension: 'jpg',
    },
    name: 'Andrew',
    position: 'ceo',
  },
  {
    id: 6,
    media: {
      url: '/images/make_staff_slider/1.jpg',
      type: 'image/jpeg',
      aggregate_type: 'image',
      extension: 'jpg',
    },
    name: 'Andrew',
    position: 'ceo',
  },
  {
    id: 7,
    media: {
      url: '/images/make_staff_slider/1.jpg',
      type: 'image/jpeg',
      aggregate_type: 'image',
      extension: 'jpg',
    },
    name: 'Andrew',
    position: 'ceo',
  },
  {
    id: 8,
    media: {
      url: '/images/make_staff_slider/1.jpg',
      type: 'image/jpeg',
      aggregate_type: 'image',
      extension: 'jpg',
    },
    name: 'Andrew',
    position: 'ceo',
  },
];

export default function UIPage() {
  const [selected, setSelected] = useState<DropDownItem | null>(null);
  // const [accordionOpen, setAccordionOpen] = useState<boolean>(false);
  const { opened: open, openModal: onOpen, closeModal: onClose } = useModal();
  const { opened: openLeftModal, openModal: onOpenLeftModal, closeModal: onCloseLeftModal } = useModal();
  const { opened: openRightModal, openModal: onOpenRightModal, closeModal: onCloseRightModal } = useModal();

  return (
    <div className='grid-container'>
      <h1 className='col-span-full mb-i48'>UI Kit</h1>
      <Cord className='col-span-full mb-i32' />
      {/* <Cord className="col-span-full mb-i32" /> */}
      {/* <Cord className="col-span-full mb-i32" /> */}
      {/* <Cord className="col-span-full mb-i32" /> */}
      {/* <Cord className="col-span-full" /> */}
      <h2 className='col-span-full mb-i32'>WebGL сцена</h2>
      <div className='col-span-full h-screen'>
        <Scene />
      </div>
      <h2 className='col-span-full mb-i32'>Аккордеон и спойлер</h2>
      {/* <Accordion title='Аккордеон' className='col-span-3' open={accordionOpen} setOpen={setAccordionOpen}>
        <ul>
          {PLUG_DROPDOWN_ITEMS.map((item) => (
            <li key={item.id}>{item.label}</li>
          ))}
        </ul>
      </Accordion> */}
      <Spoiler className='col-span-3'>
        <ul>
          {PLUG_DROPDOWN_ITEMS.map((item) => (
            <li key={item.id}>{item.label}</li>
          ))}
        </ul>
      </Spoiler>
      <h2 className='col-span-full my-i32 typo-h2'>Чекбокс и радио</h2>
      <form className='col-span-full grid-cols-subgrid'>
        <Checkbox label='Чекбокс с лейблом' className='grid-cols-2' />
        <Radio name='radio' label='Радио с лейблом' className='grid-cols-2' />
        <Radio name='radio' label='Радио с лейблом 2' className='grid-cols-2' />
      </form>
      <h2 className='col-span-full'>Куки</h2>
      <div className='col-span-full grid grid-cols-4 bg-light-grey p-8'>
        <div className='col-span-full mb-6 grid'>
          <CookiePopup />
        </div>
        <div className='col-span-full'>
          <CookiePopup theme='black' />
        </div>
      </div>
      <h2 className='col-span-full my-i32 typo-h2'>Кнопки</h2>
      <div className='col-span-full grid bg-light-grey grid-container'>
        <Button
          href='https://google.com'
          iconRight='arrow-right'
          className='col-span-3'
          onClick={
            () => alert('work in progress') // eslint-disable-line no-alert
          }
          theme='black'
        >
          Google
        </Button>
        <Button
          iconRight='arrow-right'
          className='col-span-3'
          onClick={
            () => alert('work in progress') // eslint-disable-line no-alert
          }
          theme='black'
        >
          Кнопка
          <span className='absolute right-[-8px] top-0 translate-x-full text-white text-opacity-64 typo-p'>02:17</span>
        </Button>
        <Button
          iconRight='arrow-right'
          className='col-span-3'
          onClick={
            () => alert('work in progress') // eslint-disable-line no-alert
          }
          theme='gray'
        >
          Кнопка
        </Button>
        <Button
          iconRight='compare'
          className='col-span-3'
          onClick={
            () => alert('work in progress') // eslint-disable-line no-alert
          }
        >
          Кнопка
        </Button>
      </div>
      <h2 className='col-span-full my-i32 typo-h2'>Дропдаун</h2>
      <Dropdown items={PLUG_DROPDOWN_ITEMS} className='col-span-3' selected={selected} setSelected={setSelected} />
      <h2 className='col-span-full my-i32 typo-h2'>Инпуты</h2>
      <h2 className='col-span-full my-i32 typo-h2'>Модалка</h2>
      <div className='col-span-full grid bg-light-grey grid-container'>
        <Button iconLeft='compare' className='col-span-3 max-w-fit' onClick={onOpen} theme='black'>
          Дефолтная
        </Button>
        <Button iconLeft='compare' className='col-span-3 max-w-fit' onClick={onOpenRightModal} theme='gray'>
          Справа
        </Button>
        <Button iconLeft='compare' className='col-span-3 max-w-fit' onClick={onOpenLeftModal}>
          Слева
        </Button>
      </div>
      <Modal open={open} onClose={onClose}>
        <h3>Модалка с контентом в центре</h3>
      </Modal>
      <Modal open={openLeftModal} onClose={onCloseLeftModal} mode='left'>
        <h3>Модалка с контентом слева</h3>
      </Modal>
      <Modal open={openRightModal} onClose={onCloseRightModal} mode='right'>
        <h3>Модалка с контентом справа</h3>
      </Modal>
      <LoopedText>
        <h2 className={'text-h1-big inline tracking-tighter'}>
          диджитал-агентство<span className='font-medium'> мэйк </span> в цифрах и фактах &nbsp;
        </h2>
      </LoopedText>
      <h2 className='col-span-full my-i32 typo-h2'>Логотип</h2>
      <div className='col-span-full flex items-center gap-i16'>
        <MakeAgencyLink logoClassName='w-20 h-20' />
        <MakeAgencyLink shape='circle' />
        <MakeAgencyLink className='flex gap-i16 font-bold'>
          <span>мэйк</span>
        </MakeAgencyLink>
      </div>
      <h2 className='col-span-full my-i32 typo-h2'>Клиент</h2>
      <div className='col-span-full flex items-center gap-i16 bg-black'>
        <Client
          data={{
            id: 1,
            name: 'ЯНАО',
            icon: '/images/yanao.png',
            bg: '#0061D9',
          }}
        />
        <Client
          data={{
            id: 2,
            name: 'ЯНАО',
            icon: '/images/vector.svg',
            bg: '#FF002E',
          }}
        />
        <Client
          data={{
            id: 3,
            name: 'ЯНАО',
            icon: '/images/rostelekom.png',
          }}
        />
      </div>
      <h2 className='col-span-full my-i32 typo-h2'>Клиенты в списке элементов с ховером</h2>
      <ElementsList className='col-span-full flex items-center gap-i16 bg-black'>
        <Client
          data={{
            id: 1,
            name: 'ЯНАО',
            icon: '/images/yanao.png',
            bg: '#0061D9',
          }}
        />
        <Client
          data={{
            id: 2,
            name: 'ЯНАО',
            icon: '/images/vector.svg',
            bg: '#FF002E',
          }}
        />
        <Client
          data={{
            id: 3,
            name: 'ЯНАО',
            icon: '/images/rostelekom.png',
          }}
        />
      </ElementsList>
      <h2 className='col-span-full my-i32 typo-h2'>Список элементов с ховером</h2>
      <ElementsList className='col-span-4 flex items-center gap-i16'>
        {PLUG_DROPDOWN_ITEMS.map((item) => (
          <p key={item.id}>{item.label}</p>
        ))}
      </ElementsList>
      <ElementsList className='col-span-4 flex flex-col gap-i16'>
        {PLUG_DROPDOWN_ITEMS.map((item) => (
          <p key={item.id}>{item.label}</p>
        ))}
      </ElementsList>
      {/* <div className='col-span-full my-i32 bg-black grid-container'>
        <Infographics toNumber={20} text={'прирост активной аудитории сервиса'} prefix='+' postfix='%' />
        <Infographics toNumber={200} text={'успешных проектов и созданных продуктов'} postfix='+' isAnimation={true} />
        <Infographics toNumber={50} text={'успешных проектов и созданных продуктов'} isAnimation={true} type='float' />
        <Infographics toNumber={25} text={'успешных проектов и созданных продуктов'} small={true} />
      </div> */}
      <div className='col-span-full my-5'>
        <Showreel
          media={{ type: 'video', url: 'https://kinescope.io/embed/6fDTjWAubgzmt7ADqh1SXU' }}
          header={<BlocksHeader tags={tags} />}
          preview={'/images/showrel.jpg'}
        />
      </div>
      <h2 className='col-span-full my-i32 typo-h2'>Карточка со ссылками</h2>
      {/* <InfographicsScreen /> */}
      <h2 className='col-span-full my-i32 typo-h2'>Рекламный баннер</h2>
      <AdsBanner data={adsBannerData} />
      <h2 className='col-span-full my-i32 typo-h2'>Пример таблицы</h2>
      <AwardTable data={awardList} />
      <h2 className='col-span-full my-i32 typo-h2'>Слайдеры</h2>
      <div className={'col-span-full my-i32'}>
        <SmallSlider media={staffMakeImages} />
      </div>
      <div className={'col-span-full my-i32'}>
        <BigSlider media={aboutMakeImages} />
      </div>
      <h2 className='col-span-full my-i32 typo-h2'>Галерея</h2>
      <div className={'col-span-full my-i32'}>
        <GalleryViewer media={galleryImages} />
      </div>
      <h2 className='col-span-full my-i32 typo-h2'>Слайдер с галереей</h2>
      <div className={'col-span-full my-i32'}>
        <GallerySlider className='aspect-video min-h-[788px]' media={galleryImages} />
      </div>
    </div>
  );
}
