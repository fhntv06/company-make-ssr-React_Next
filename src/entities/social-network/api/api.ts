import { get } from '@/shared/lib/api';
import { SiteLink } from '@/shared/lib/types';

export async function fetchSocialNetworks(): Promise<SiteLink[]> {
  const res = await get('social-networks');
  return (await res.json()) as SiteLink[];
}
