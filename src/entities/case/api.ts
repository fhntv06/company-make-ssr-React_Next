import { Case } from '@/entities/case/types';
import { get } from '@/shared/lib/api';

export async function fetchCases(filters?: Record<string, unknown>): Promise<Case[]> {
  const res = await get('cases', filters);
  return (await res.json()) as Case[];
}

interface CaseWithPagination {
  last: number;
  data: Case[];
}

export async function fetchArchiveCases(page: Record<string, unknown>): Promise<CaseWithPagination> {
  const res = await get('cases?_per_page=3', page);
  return (await res.json()) as CaseWithPagination;
}
