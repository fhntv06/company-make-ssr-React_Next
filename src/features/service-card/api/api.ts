import { get } from '@/shared/lib/api';
import { ServiceCard } from '@/shared/lib/types';

export async function fetchServiceCards(): Promise<ServiceCard[]> {
  const res = await get('service-cards');
  return res.json() as Promise<ServiceCard[]>;
}
