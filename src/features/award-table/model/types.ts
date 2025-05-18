// eslint-disable-next-line import/no-cycle
import { Award } from '@/entities/case';

export interface AwardItem {
  id: number;
  title: string;
  url: string;
  award_name: string;
  category: string;
  year: string;
  award: Award;
}
