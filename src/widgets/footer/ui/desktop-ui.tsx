import { Link, Cord } from '@/shared/ui';
import { MainMenu } from '@/entities/main-menu';
import { ContactPerson } from '@/widgets/contact-banner/lib/types';
import { ContactBanner } from '@/widgets/contact-banner';
import { IFooterData } from '../model/types';
import { Contacts } from '../../contacts';
import { SocialNetworks } from '../../social-networks';

interface Props {
  data: IFooterData;
  contactPersons: ContactPerson[];
}

export default function DesktopFooter({ data: { menus, contacts, socialNetworks }, contactPersons }: Props) {
  return (
    <div className='hidden md:grid-container'>
      <ContactBanner contactPersons={contactPersons} className='ignore-dark hidden md:flex' />
      <Cord className='col-span-full -mx-grid mb-[calc(theme(spacing.i16)+theme(spacing.i16))]' />
      <div className='col-span-full mb-i120 grid-subcontainer'>
        <MainMenu menus={menus} />
        <SocialNetworks data={socialNetworks} />
      </div>
      <div className='col-span-full grid grid-cols-4 gap-x-gap lg:grid-cols-8'>
        <div className='col-span-full mb-i64 grid grid-cols-4 gap-x-gap  lg:grid-cols-8'>
          <Contacts contacts={contacts} />
        </div>
        <div className='col-span-full grid grid-cols-4 gap-x-gap lg:grid-cols-8'>
          <p className='col-span-2 text-dark'>©2024, агентство мэйк</p>
          <p className='col-span-2'>
            <Link to='documents'>документы</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
