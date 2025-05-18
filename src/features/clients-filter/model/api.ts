import { get } from '@/shared/lib/api';
import { IClientsFilter } from './types';

export async function fetchClientsFilter(): Promise<IClientsFilter> {
  const res = await get('clients-filter');
  return (await res.json()) as IClientsFilter;
}
