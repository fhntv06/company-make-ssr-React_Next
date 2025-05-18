import { Contact, SiteLink } from '@/shared/lib/types';
import { ContactPerson } from '@/widgets/contact-banner/lib/types';

export interface CommonProps {
  isContrast: boolean;
  menus: SiteLink[][];
  contacts: Contact[];
  socialNetworks: SiteLink[];
  additionalMenu: SiteLink[];
  contactPersons: ContactPerson[];
  pathname: string;
}
