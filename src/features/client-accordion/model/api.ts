import { get } from '@/shared/lib/api';
import { IClientAccordion } from './types';

export async function fetchClientsAccordion(filters?: Record<string, unknown>): Promise<IClientAccordion[]> {
  const res = await get('clients-accordion', filters);
  return (await res.json()) as IClientAccordion[];
}
