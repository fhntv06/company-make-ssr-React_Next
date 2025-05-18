import { Link, ElementsList } from '@/shared/ui';
import { SiteLink } from '@/shared/lib/types';

interface Props {
  menus: SiteLink[][];
}

export default function MainMenu({ menus }: Props) {
  return (
    <>
      {menus.map((menu) => (
        <div key={menu[0].id} className='col-span-2'>
          {menu.map((item) => (
            <ElementsList key={item.title} className='mb-i24 gap-y-2'>
              <p className='h4 font-medium'>
                <Link to={item.href}>{item.title}</Link>
              </p>
              {item.children?.map((itemSubLink) => (
                <p className='h4' key={itemSubLink.title}>
                  <Link to={itemSubLink.href}>{itemSubLink.title}</Link>
                </p>
              ))}
            </ElementsList>
          ))}
        </div>
      ))}
    </>
  );
}
