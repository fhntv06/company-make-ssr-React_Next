import { SiteLink } from '@/shared/lib/types';
import { get } from '@/shared/lib/api';

export async function fetchCardsMenu(): Promise<SiteLink[]> {
  const res = await get('cards-menu');
  return (await res.json()) as SiteLink[];
}
