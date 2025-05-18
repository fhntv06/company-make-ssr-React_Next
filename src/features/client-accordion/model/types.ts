import { IReview, Media, Tag } from '@/shared/lib/types';

export interface IClientAccordion {
  id: number;
  industryId: number;
  title: string;
  shortDescription: string;
  description: string;
  tags: Tag[];
  logotype: Media;
  reviews: IReview[];
}
