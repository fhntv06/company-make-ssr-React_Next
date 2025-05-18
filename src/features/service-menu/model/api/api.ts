import { get } from '@/shared/lib/api';
import { SiteLink } from '@/shared/lib/types';

export async function fetchServiceMenu(): Promise<SiteLink[]> {
  const res = await get('services');
  return res.json() as Promise<SiteLink[]>;
}
