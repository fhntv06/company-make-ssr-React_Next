import { Contact } from '@/entities/contact';
import { type Contact as IContact } from '@/shared/lib/types';

interface Props {
  contacts: IContact[];
}

export default function Contacts({ contacts }: Props) {
  return contacts.map((contact) => <Contact key={contact.id} data={contact} />);
}
