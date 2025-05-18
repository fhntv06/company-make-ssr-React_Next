import { CallbackForm } from '@/features/callback-form';
import { Avatar, Button, Cord, Link, PageHeader } from '@/shared/ui';
import { ContactCard } from '@/widgets/contact-card';
import { SocialNetworksIconList } from '@/widgets/social-networks';
import clsx from 'clsx';
import React from 'react';

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
];

const cards = [
  {
    title: 'обсудить проект, задать любой вопрос',
    people: [
      {
        id: 0,
        name: 'иван',
        surname: 'тельтевский',
        description: 'важный человек',
        photo: {
          url: '/images/employees/make1.png',
        },
      },
      {
        id: 1,
        name: 'саша',
        surname: 'морозов',
        description: 'важный человек',
        photo: {
          url: '/images/employees/make2.png',
        },
      },
      {
        id: 2,
        name: 'дарья',
        surname: 'тимошкина',
        description: 'важный человек',
        photo: {
          url: '/images/employees/make3.png',
        },
      },
    ],
    linkSlot: (
      <Button iconRight='arrow-right' theme='gray' className='lg:w-fit'>
        обсудить проект
      </Button>
    ),
    children: (
      <div className='flex w-full flex-col gap-y-i24 md:items-center'>
        <div>
          <Link className='h3 md:h2 font-medium' to='mailto:hello@make.st'>
            hello@make.st
          </Link>
        </div>
        <div>
          <Link className='h4 font-medium lg:font-normal' to='https://t.me/makeagency' external={false}>
            написать в тг
          </Link>
        </div>
      </div>
    ),
  },
  {
    title: 'работа в мэйке',
    people: [
      {
        id: 0,
        name: 'катя',
        surname: 'титатева',
        description: 'head of hr',
        photo: {
          url: '/images/employees/make5.png',
        },
      },
    ],
    linkSlot: (
      <ul className='h4 flex flex-col font-medium lg:font-normal'>
        <li>
          <Link to='mailto:hr@make.st'>hr@make.st</Link>
        </li>
        <li>
          <Link to='https://t.me/makeagency' external={false}>
            телеграм
          </Link>
        </li>
      </ul>
    ),
    children: null,
  },
  {
    title: 'предложить сотрудничество',
    people: [
      {
        id: 0,
        name: 'андрей',
        surname: 'титатев',
        description: 'ceo',
        photo: {
          url: '/images/employees/make4.png',
        },
      },
    ],
    linkSlot: (
      <ul className='h4 flex flex-col font-medium lg:font-normal'>
        <li>
          <Link to='mailto:start@make.st'>start@make.st</Link>
        </li>
        <li>
          <Link to='https://t.me/makeagency' external={false}>
            телеграм
          </Link>
        </li>
      </ul>
    ),
    children: null,
  },
];

export default function page() {
  return (
    <main className='grid-container'>
      <PageHeader title='Контакты' />
      <Cord className='col-span-full -mx-grid mb-[calc(theme(spacing.i16)+theme(spacing.i16))]' />
      <div className='col-span-full mb-i120 grid-subcontainer'>
        <div className='col-span-6'>
          <p className='md:h2 h3'>ждём вас в продакшн-офисе</p>
          <p className='md:h2 h3 lg:font-medium'>
            <Link
              className='lg:bg-[length:100%_1px] lg:bg-left-bottom'
              to='https://yandex.ru/maps/64/kemerovo/house/nogradskaya_ulitsa_5/bE8YdgBnTkcOQFtvfX90dH9qZg==/?indoorLevel=1&ll=86.077730%2C55.355393&z=17.13'
              external={false}
            >
              кемерово, ноградская 5, оф. 404
            </Link>
          </p>
          <p className='h2 hidden lg:block'>
            в{' '}
            <Link to='https://t.me/makeagency' underline external={false}>
              телеграм-канале
            </Link>
            ,{' '}
            <Link to='https://vk.com/makeagency' underline external={false}>
              vk
            </Link>{' '}
            и{' '}
            <Link to='https://www.youtube.com/@makeagency' underline external={false}>
              youtube
            </Link>
          </p>
          <p className='h2 md:h3 mb-i80 mt-i64 lg:hidden'>
            <Link className='font-medium' to='tel:+73842650490'>
              +7 (3842) 65-04-90
            </Link>
          </p>{' '}
          <SocialNetworksIconList className='my-i80 lg:hidden' data={socialNetworks} />
        </div>
        <div className='col-span-full lg:col-span-2'>
          <div className='mb-i32 hidden flex-col typo-h3 lg:flex'>
            <div>
              <Link className='font-medium' to='maito:hello@make.st'>
                hello@make.st
              </Link>
            </div>
            <div>
              <Link to='tel:+73842650490'>+7 (3842) 65-04-90</Link>
            </div>
          </div>
          <div className='typo-h4'>
            <div>
              <span>офис продаж</span>
            </div>
            <div>
              <Link to='#0'>москва, серебряническая наб., 29</Link>
            </div>
            <div className='mt-i16'>
              <Link className='font-medium lg:font-normal' to='tel:+74951082449'>
                +7 (495) 108-24-49
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className='col-span-full -mx-grid aspect-[1920/592] max-h-[592px] !gap-0 bg-bg-grey grid-subcontainer lg:grid-rows-1'>
        {cards.map((card, index) => (
          <ContactCard
            key={index}
            className={clsx({ 'col-span-4': !index, 'col-span-full lg:col-span-2': index })}
            title={card.title}
            people={card.people}
            linkSlot={card.linkSlot}
            white={!index}
          >
            {card.children}
          </ContactCard>
        ))}
      </div>
      <div className='col-span-full -mx-grid bg-dark py-i168 text-white grid-container'>
        <h2 className='col-span-full font-medium'>расскажите о своей задаче</h2>
        <Cord className='col-span-full -mx-grid my-[calc(theme(spacing.i16)+theme(spacing.i16))]' white />
        <div className='col-span-full grid-subcontainer'>
          <div className='col-span-2 hidden lg:flex'>
            <Avatar src='/images/employees/make1.png' />
            <Avatar src='/images/employees/make2.png' />
            <Avatar src='/images/employees/make3.png' />
          </div>
          <CallbackForm className='col-span-6' />
        </div>
      </div>
    </main>
  );
}
