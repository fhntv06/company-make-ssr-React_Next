import { Client, ContentBlock, IReview, Media, Person, SiteLink, Tag } from '@/shared/lib/types';

export interface Award {
  awardID: number;
  title: string;
  description: string;
  color: string;
  svg?: Media;
}

export interface ICaseTeam {
  department: string;
  members: Person[];
}

export interface Case {
  id: number;
  categoryID: number;
  date: string;
  title: string;
  description: string;
  url: string; //
  slug: string; //
  logotype: Media;
  links: SiteLink[]; //
  tags: Tag[];
  awards: Award[];
  position: 2 | 4;
  media: Media;
  client: Client[];
  video: { src: string };
  achievements?: { title: string; description: string }[];
  content_blocks: ContentBlock[]; //
  review?: IReview; //
  team?: ICaseTeam[]; //
}
