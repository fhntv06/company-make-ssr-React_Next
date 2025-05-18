import { Tag } from '@/shared/lib/types';

export interface IClientsFilter {
  id: number;
  industry: Tag[];
  services: Tag[];
}

export interface ISelectedTags {
  industryIds: number[];
  serviceIds: number[];
}
