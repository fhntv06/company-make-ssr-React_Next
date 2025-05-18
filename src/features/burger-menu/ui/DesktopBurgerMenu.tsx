import { Cord, Link, MakeAgencyLink, ElementsList } from '@/shared/ui';
import { Contacts } from '@/widgets/contacts';
import { SocialNetworks } from '@/widgets/social-networks';
import clsx from 'clsx';
import { MiniContactBanner } from '@/widgets/contact-banner';
import { CommonProps } from '../model/types';
import { isLinkActive } from '../../../../config';

export default function DesktopBurgerMenu({
  menus,
  contacts,
  socialNetworks,
  contactPersons,
  additionalMenu,
  pathname,
}: CommonProps) {
  return (
    <div className='col-span-full hidden lg:grid-container'>
      <div className='col-span-1'>
        <MakeAgencyLink>
          <p className='h4 font-medium text-white'>мэйк</p>
        </MakeAgencyLink>
      </div>
      <div className='col-span-6 col-start-3 mb-i120 grid grid-cols-subgrid gap-x-gap'>
        <div className='col-span-2'>
          {menus[0].map((item) => (
            <ElementsList key={item.id} className={clsx('gap-y-2', Boolean(item.children?.length) && 'mb-i24')}>
              <p className='h3'>
                <Link to={item.href} underline={isLinkActive(item.href, pathname)}>
                  {item.title}
                </Link>
              </p>
              {item.children?.map((itemSubLink) => (
                <p className='h4' key={itemSubLink.title}>
                  <Link to={itemSubLink.href} underline={isLinkActive(itemSubLink.href, pathname)}>
                    {itemSubLink.title}
                  </Link>
                </p>
              ))}
            </ElementsList>
          ))}
        </div>
        <div className='col-span-2'>
          {menus[1].map((item) => (
            <ElementsList key={item.id} className={clsx('gap-y-2', Boolean(item.children?.length) && 'mb-i24')}>
              <p className='h3'>
                <Link to={item.href} underline={isLinkActive(item.href, pathname)}>
                  {item.title}
                </Link>
              </p>
              {item.children?.map((itemSubLink) => (
                <p className='h4' key={itemSubLink.title}>
                  <Link to={itemSubLink.href}>{itemSubLink.title}</Link>
                </p>
              ))}
            </ElementsList>
          ))}
          {additionalMenu &&
            additionalMenu.map((item) => (
              <ElementsList key={item.id} className='gap-y-2'>
                <p className='h4'>
                  <Link to={item.href}>{item.title}</Link>
                </p>
              </ElementsList>
            ))}
        </div>
        <SocialNetworks data={socialNetworks} />
      </div>
      <div></div>
      <MiniContactBanner contactPersons={contactPersons} />
      <Cord className='col-span-full -mx-gap' white />
      <div className='col-span-full col-start-3 mb-i64 grid grid-cols-subgrid gap-x-gap pt-i32'>
        <Contacts contacts={contacts} />
      </div>
      <div className='col-span-full grid grid-cols-subgrid gap-x-gap'>
        <p className='col-span-2'>©2024, агентство мэйк</p>
        <p className='col-span-2 inline-flex gap-x-gap'>
          <Link to='documents'>документы</Link>
          <Link to='documents'>политика конфиденциальности</Link>
        </p>
      </div>
    </div>
  );
}
