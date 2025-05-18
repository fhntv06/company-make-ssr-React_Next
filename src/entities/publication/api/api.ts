import { Publication } from '@/entities/publication/model/types';
import { get } from '@/shared/lib/api';
import { CompanyGroup, IMediaSlider } from '@/shared/lib/types';
// eslint-disable-next-line import/no-cycle
import { AwardItem } from '@/features/award-table';

export async function fetchPublications(): Promise<Publication[]> {
  const res = await get('publications');
  return (await res.json()) as Publication[];
}

export async function fetchMainPublication(): Promise<Publication> {
  const res = await get('publications?type=1&_limit=1');
  const data = (await res.json()) as Publication[];
  return data[0];
}

export async function fetchLastPublications(): Promise<Publication[]> {
  const res = await get('publications?_limit=5');
  return (await res.json()) as Publication[];
}

export async function fetchLastVideoPublications(): Promise<Publication[]> {
  const res = await get('video-publications');
  return (await res.json()) as Publication[];
}

export async function fetchAboutMakeImages(): Promise<IMediaSlider[]> {
  const res = await get('about-make-slider');
  return (await res.json()) as IMediaSlider[];
}

export async function fetchStaffMakeImages(): Promise<IMediaSlider[]> {
  const res = await get('staff-make-slider');
  return (await res.json()) as IMediaSlider[];
}

export async function fetchAwardsList(): Promise<AwardItem[]> {
  const res = await get('awards-list');
  return (await res.json()) as AwardItem[];
}

export async function fetchCompanyGroups(): Promise<CompanyGroup[]> {
  const res = await get('company-group');
  return (await res.json()) as CompanyGroup[];
}
