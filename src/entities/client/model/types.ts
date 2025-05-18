import { IProject, IReview, Media, Tag } from '@/shared/lib/types';

export interface Client {
  id: number;
  industryId: number; //
  title: string;
  shortDescription: string; //
  description: string; //
  tags: Tag[]; //
  slug: string;
  projects: IProject[];
  icon: Media;
  logotype: Media;
  reviews: IReview[];
}
