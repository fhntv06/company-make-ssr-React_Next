import { get } from '@/shared/lib/api';
import { CareerTab } from '@/entities/career/types/types';

export async function fetchCareer(): Promise<CareerTab[]> {
  const res = await get('career');
  return (await res.json()) as CareerTab[];
}
