import { get } from '@/shared/lib/api';
import { ContactPerson } from '@/widgets/contact-banner/lib/types';

export async function fetchContactPersons(): Promise<ContactPerson[]> {
  const res = await get('contact-person');
  return res.json() as Promise<ContactPerson[]>;
}
