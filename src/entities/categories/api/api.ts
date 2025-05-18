import { get } from '@/shared/lib/api';
import { Category } from '@/shared/lib/types';

export async function fetchCategories() {
  const res = await get('categories');
  return (await res.json()) as Category[];
}
