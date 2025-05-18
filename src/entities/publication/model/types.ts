import { Media, Tag, Person, SiteLink, PublicationType, ContentBlock } from '@/shared/lib/types';

export interface Publication {
  id: number;
  name: string;
  slug: string;
  active: boolean;
  description: string | null;
  publication_date: string;
  created_at: string;
  updated_at: string;
  preview: Media | null;
  tags?: Tag[];
  type: PublicationType;
  content_blocks: ContentBlock[];
  media?: Media;
  author?: Person;
  social_networks?: SiteLink[];
}

export interface ISeriesPublication {
  id: number;
  series: Publication[];
}
