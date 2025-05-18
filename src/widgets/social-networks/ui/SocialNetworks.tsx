import { SiteLink } from '@/shared/lib/types';
import { Link, ElementsList } from '@/shared/ui';

interface Props {
  data: SiteLink[];
}

export default function SocialNetworks({ data }: Props) {
  const links = data.reduce(
    (current, item) => {
      if (item.title === 'behance' || item.title === 'dprofile') {
        current[1] = [...current[1], item];
        return current;
      }

      current[0] = [...current[0], item];
      return current;
    },
    [[], []] as SiteLink[][],
  );

  return (
    <div className='col-span-2 flex flex-col gap-y-i24'>
      {links.map((menu) => (
        <ElementsList key={menu[0].id} className='gap-y-2'>
          {menu.map((item) => (
            <p key={item.id} className='h4'>
              <Link external={false} to={item.href}>
                {item.title}
              </Link>
            </p>
          ))}
        </ElementsList>
      ))}
    </div>
  );
}
