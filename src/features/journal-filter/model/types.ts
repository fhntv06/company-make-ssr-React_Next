import { Person, Tag } from '@/shared/lib/types';

export interface IJournalFilters {
  categories: {
    id: number;
    title: string;
  }[];
  tags: Tag[];
  education: Tag[];
  authors: Person[];
}
