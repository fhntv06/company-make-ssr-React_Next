import React from 'react';
import { Link } from '@/shared/ui';
import { SiteLink } from '@/shared/lib/types';
import clsx from 'clsx';
import { ContactPerson } from '@/widgets/contact-banner/lib/types';
import { ContactBanner } from '@/widgets/contact-banner';

interface Props {
  contactPersons: ContactPerson[];
  socialNetworks: SiteLink[];
  contrast?: boolean;
  className?: string;
}

export default function MobileFooter({ contactPersons, socialNetworks, contrast = false, className }: Props) {
  return (
    <div className={clsx('px-grid md:hidden', className)}>
      <ContactBanner contactPersons={contactPersons} className={clsx({ '!ignore-dark': !contrast })} />
      <div
        className={clsx('-mx-grid w-screen border-b', {
          'border-white': contrast,
          'border-black': !contrast,
        })}
      ></div>
      <div className='pt-i32'>
        <span className='typo-h4'>кемерово, ноградская 5, оф. 404</span>
        <div className='pt-i64 grid-subcontainer'>
          <div className='col-span-2 flex flex-col'>
            <span className='font-normal typo-p'>телефон</span>
            <span className='pt-i16 typo-h4'>8 800 555 35 35</span>
          </div>
          <div className='col-span-2 flex flex-col pr-i64'>
            <span className='font-normal typo-p'>офис продаж мск</span>
            <span className='pt-i16 typo-h4'>8 800 555 35 35</span>
          </div>
        </div>

        <div className='pt-i64'>
          <span className='font-normal typo-p'>социальные сети</span>
          <div className='grid-subcontainer'>
            {socialNetworks.map((network) => {
              return (
                <Link key={network.id} to={`mailto:${network.href}`} className='z-10 col-span-2 pt-i16 typo-h4'>
                  {network.title}
                </Link>
              );
            })}
          </div>
        </div>
        <p className={clsx('pt-i120', { 'text-dark': !contrast, 'text-white/64': contrast })}>©2024, агентство мэйк</p>
      </div>
    </div>
  );
}
