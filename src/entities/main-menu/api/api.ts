import { SiteLink } from '@/shared/lib/types';
import { get } from '@/shared/lib/api';

export async function fetchFooterMenu(): Promise<SiteLink[][]> {
  const res = await get('footer-menu');
  const data = (await res.json()) as SiteLink[];

  return [data.slice(0, 3), data.slice(3, -1), data.slice(5)];
}

export async function fetchMainMenu(): Promise<SiteLink[][]> {
  const res = await get('burger-menu');
  const data = (await res.json()) as SiteLink[];

  return [data.slice(0, 4), data.slice(4)];
}

export async function fetchAdditionalMenu(): Promise<SiteLink[]> {
  const res = await get('additional-menu');
  return (await res.json()) as SiteLink[];
}
