import { MakeAgencyLink, Link, Cord } from '@/shared/ui';
import { MobileFooter } from '@/widgets/footer';
import { CommonProps } from '../model/types';
import { isLinkActive } from '../../../../config';

export default function MobileBurgerMenu({ menus, socialNetworks, pathname, contactPersons }: CommonProps) {
  return (
    <div className='col-span-full flex flex-col lg:hidden'>
      <div className='mb-[calc(theme(spacing.i120)+theme(spacing.i48))] flex flex-col px-grid'>
        <MakeAgencyLink className='mb-i120' />
        <ul className='h3'>
          <li>
            <Link to={menus[1][0].href} underline={isLinkActive(menus[1][0].href, pathname)}>
              {menus[1][0].title}
            </Link>
          </li>
          {menus[0].map((item) => (
            <li key={item.id}>
              <Link to={item.href} underline={isLinkActive(item.href, pathname)}>
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <Cord white className='mb-[calc(theme(spacing.i120)+theme(spacing.i48))]' />
      <MobileFooter contactPersons={contactPersons} contrast socialNetworks={socialNetworks} className='!grid' />
    </div>
  );
}
