import { get } from '@/shared/lib/api';
import { Client } from '@/entities/client/model/types';

export async function fetchClients(): Promise<Client[]> {
  const res = await get('clients');
  return (await res.json()) as Client[];
}
