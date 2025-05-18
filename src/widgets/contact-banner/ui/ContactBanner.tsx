'use client';

import clsx from 'clsx';
import { Client } from '@/entities/client';
import { Button, Link } from '@/shared/ui';
import { ContactPerson } from '@/widgets/contact-banner/lib/types';
import React, { useState } from 'react';
import NextLink from 'next/link';

interface Props {
  contactPersons: ContactPerson[];
  className?: string;
}

export default function ContactBanner({ contactPersons, className }: Props) {
  const [linkHover, setLinkHover] = useState(false);

  return (
    <div className={clsx('col-span-full justify-center pb-i120 pt-i168 md:flex', className)}>
      <div className='relative flex flex-col items-center justify-center'>
        <div className='col-span-full flex items-center lg:translate-y-1/2'>
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
        </div>
        <div className='flex'>
          <NextLink href='/contact-us' className='text-h1-big stretched-link mb-i32 flex gap-2 font-medium lowercase'>
            <span className={clsx('base-link stretched-link', { 'base-link-hover': linkHover })}>Написать нам</span>
          </NextLink>
        </div>
        <Link to='mailto:hello@make.st' className='h4 z-10'>
          hello@make.st
        </Link>
      </div>
      <div className='z-10 ml-2 hidden max-h-[80px] md:flex lg:translate-y-1/2'>
        <Button
          iconRight='arrow-up-right'
          href='/contact-us'
          theme='gray'
          onMouseEnter={() => setLinkHover(true)}
          onMouseLeave={() => setLinkHover(false)}
        />
      </div>
    </div>
  );
}
