'use client';

import { Link, MakeAgencyLink } from '@/shared/ui';
import { ServiceMenu } from '@/features/service-menu';
import { useContrastHeader } from '@/features/header-contrast';
import clsx from 'clsx';
import { Contact, SiteLink } from '@/shared/lib/types';
import { BurgerMenu } from '@/features/burger-menu';
import { ContactPerson } from '@/widgets/contact-banner/lib/types';
import { useEffect, useRef, useState } from 'react';
import { useModal } from '@/shared/lib/hooks';
import { usePathname } from 'next/navigation';

const links = [
  { id: 1, href: '/cases', title: 'кейсы' },
  { id: 2, href: '/agency', title: 'агентство' },
  { id: 3, href: '/contacts', title: 'контакты' },
];

interface Props {
  serviceMenu: SiteLink[];
  mainMenu: SiteLink[][];
  additionalMenu: SiteLink[];
  contacts: Contact[];
  socialNetworks: SiteLink[];
  contactPersons: ContactPerson[];
}

export default function Header({
  serviceMenu,
  mainMenu,
  contacts,
  socialNetworks,
  contactPersons,
  additionalMenu,
}: Props) {
  const { opened: burgerMenuOpened, openModal: openBurgerMenu, closeModal: closeBurgerMenu } = useModal();
  const pathname = usePathname();

  const {
    opened: serviceMenuOpened,
    openModal: openServiceMenu,
    closeModal: closeServiceMenu,
  } = useModal({ forceClose: true });

  const { isContrast } = useContrastHeader();
  const previousScrollY = useRef(0);
  const [scrollY, setScrollY] = useState(0);
  const scrolled = scrollY > previousScrollY.current && scrollY > 0;

  useEffect(() => {
    const handleScroll = () => {
      previousScrollY.current = scrollY;
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollY]);

  return (
    <div
      className={clsx(
        'h4 sticky inset-x-0 top-0 z-50 pt-grid grid-container before:absolute before:inset-x-0 before:top-0' +
          ' before:h-[2px] before:bg-main-gradient dark:text-white',
        isContrast ? 'text-white' : 'text-black',
      )}
    >
      <div className='col-span-1'>
        <MakeAgencyLink logoClassName='shrink-0'>
          <p className='h4 hidden font-medium md:block'>мэйк</p>
        </MakeAgencyLink>
      </div>
      <div
        className={clsx(
          'col-span-1 col-start-4 grid grid-cols-subgrid transition-transform duration-200 md:col-span-3 lg:col-span-7',
          {
            '-translate-y-full': scrolled,
            'translate-y-0': !scrolled,
          },
        )}
      >
        <BurgerMenu
          isContrast={isContrast}
          menus={mainMenu}
          contacts={contacts}
          socialNetworks={socialNetworks}
          contactPersons={contactPersons}
          additionalMenu={additionalMenu}
          opened={burgerMenuOpened}
          openModal={openBurgerMenu}
          closeModal={closeBurgerMenu}
          pathname={pathname}
        />
        <ServiceMenu
          className='col-span-1 hidden md:block lg:col-span-2'
          serviceMenu={serviceMenu}
          opened={serviceMenuOpened}
          openModal={openServiceMenu}
          closeModal={closeServiceMenu}
          pathname={pathname}
        />
        <div className={clsx('col-span-1 hidden gap-x-i24 md:flex lg:col-span-2', isContrast && 'opacity-64')}>
          {links.map((link) => (
            <Link key={link.id} to={link.href} className='h-fit shrink-0' underline={pathname === link.href}>
              {link.title}
            </Link>
          ))}
        </div>
        <div className={clsx('col-span-1 hidden lg:flex', isContrast && 'opacity-64')}>
          <Link to='/journal' className='h-fit shrink-0' underline={pathname === '/journal'}>
            журнал
          </Link>
        </div>
        <div
          className={clsx(
            'col-span-1 hidden justify-self-end whitespace-nowrap font-medium lg:flex',
            isContrast && 'opacity-64',
          )}
        >
          <Link className='h-fit shrink-0' to='/discuss-project'>
            обсудить проект
          </Link>
        </div>
      </div>
      <div
        className={clsx(
          'absolute inset-x-0 -bottom-i16 top-0 -z-10 bg-white transition-[transform,background-color] duration-200 dark:bg-dark',
          {
            '-translate-y-full': scrolled || scrollY === 0,
            'translate-y-0': !scrolled && scrollY !== 0,
            '!bg-dark': serviceMenuOpened,
          },
        )}
        aria-hidden
      />
    </div>
  );
}
