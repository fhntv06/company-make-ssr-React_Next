import { fetchFooterMenu } from '@/entities/main-menu';
import { fetchContacts } from '@/entities/contact';
import { fetchSocialNetworks } from '@/entities/social-network';
import { fetchContactPersons } from '@/widgets/contact-banner/model/api';
import DesktopFooter from './desktop-ui';
import MobileFooter from './mobile-ui';

export default async function Footer() {
  const menus = await fetchFooterMenu();
  const contacts = await fetchContacts();
  const socialNetworks = await fetchSocialNetworks();
  const contactPersons = await fetchContactPersons();

  return (
    <footer
      className='
        ignore-dark gradient-border gradient-border-active relative col-span-full pb-6 before:bottom-0'
    >
      <DesktopFooter data={{ menus, contacts, socialNetworks }} contactPersons={contactPersons} />
      <MobileFooter socialNetworks={socialNetworks} contactPersons={contactPersons} />
    </footer>
  );
}
