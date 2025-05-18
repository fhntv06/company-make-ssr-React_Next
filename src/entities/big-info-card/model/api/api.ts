import { get } from '@/shared/lib/api';
import { WorkFormatType } from '@/shared/lib/types';

export default async function fetchWorkFormats(): Promise<WorkFormatType[]> {
  const res = await get('work-formats');
  return res.json() as Promise<WorkFormatType[]>;
}
