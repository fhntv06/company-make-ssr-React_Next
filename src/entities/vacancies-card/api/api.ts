import { VacancyCard } from '@/entities/vacancies-card/types/types';
import { get } from '@/shared/lib/api';

export async function fetchVacancies(): Promise<VacancyCard[]> {
  const res = await get('vacancies');
  return (await res.json()) as VacancyCard[];
}
