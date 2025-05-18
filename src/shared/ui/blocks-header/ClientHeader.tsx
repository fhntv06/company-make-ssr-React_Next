import React from 'react';
import { Client } from '@/entities/client';
import clsx from 'clsx';
import { Link, ElementsList } from '@/shared/ui';

interface Props {
  className?: string;
}

export default function ClientHeader({ className }: Props) {
  return (
    <div
      className={clsx(
        'col-span-full grid pt-[calc(theme(spacing.i16)+theme(spacing.i16))] grid-container md:pt-i32',
        className,
      )}
    >
      <div className='col-span-full mb-i48 flex gap-x-i24 md:col-span-2 md:mb-0'>
        <Client
          data={{
            id: 1,
            name: 'Государство',
            icon: '/images/clients/rf.svg',
          }}
          size='large'
        />
        <Client
          data={{
            id: 1,
            name: 'Битрикс',
            icon: '/images/clients/bitrix.svg',
          }}
          size='large'
        />
        <Client
          data={{
            id: 1,
            name: 'Партнер Яндекс',
            icon: '/images/clients/yandex.svg',
          }}
          size='large'
        />
      </div>
      <ElementsList className='col-span-full col-start-1 space-y-2 md:col-span-4 md:col-start-5'>
        <p className='h3 text-white'>
          <Link to='/'>Минкомсвязь РФ</Link>
          <span className='text-light-grey'> аккредитованная ит-компания</span>
        </p>
        <p className='h3 text-white'>
          <Link to='/'>яндекс</Link>
          <span className='text-light-grey'> сертифицированное агентство</span>
        </p>
        <p className='h3 text-white'>
          <Link to='/'>битрикс</Link>
          <span className='text-light-grey'> золотой партнёр</span>
        </p>
      </ElementsList>
    </div>
  );
}
