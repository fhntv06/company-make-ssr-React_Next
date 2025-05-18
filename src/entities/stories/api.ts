import { get } from '@/shared/lib/api';
import { Stories } from '@/shared/lib/types';

export async function fetchStories(categoryId?: string): Promise<Stories[]> {
  const res = await get('stories', { ...(categoryId && { categoryId }) });
  return (await res.json()) as Stories[];
}
