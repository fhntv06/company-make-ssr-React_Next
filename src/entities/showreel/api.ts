import { get } from '@/shared/lib/api';
import { Tag } from '@/shared/lib/types';

export async function fetchTags(): Promise<Tag[]> {
  const res = await get('tags');
  return (await res.json()) as Tag[];
}
