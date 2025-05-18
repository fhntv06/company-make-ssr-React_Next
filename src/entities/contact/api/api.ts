import { get } from '@/shared/lib/api';
import { Contact } from '@/shared/lib/types';

export async function fetchContacts(): Promise<Contact[]> {
  const res = await get('contacts');
  return (await res.json()) as Contact[];
}
