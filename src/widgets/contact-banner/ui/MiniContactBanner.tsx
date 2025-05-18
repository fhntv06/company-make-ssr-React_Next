import clsx from 'clsx';
import { Client } from '@/entities/client';
import { Button, ElementsList } from '@/shared/ui';
import { ContactPerson } from '@/widgets/contact-banner/lib/types';
import React from 'react';

interface Props {
  className?: string;
  contactPersons: ContactPerson[];
}

export default function MiniContactBanner({ contactPersons, className }: Props) {
  return (
    <div className={clsx('col-span-full mb-i32 flex items-center !px-0 grid-container', className)}>
      <ElementsList className='top-8 col-span-2 flex'>
        {contactPersons &&
          contactPersons.map((item) => (
            <Client
              data={{
                id: item.id,
                name: item.name,
                icon: item.icon,
              }}
              size={'large'}
              key={item.id}
            />
          ))}
      </ElementsList>
      <p className={'h2 col-span-4'}>hello@make.st</p>
      <div className={'col-span-2'}>
        <Button size={'small'} iconRight={'arrow-right'} theme={'gray'} href='/contact-us'>
          обсудить проект
        </Button>
      </div>
    </div>
  );
}
