import { Stories } from '@/entities/stories/model/types';

export async function getStories(): Promise<Stories[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_JSON_API_URL}/stories`);
  return (await res.json()) as Stories[];
}
