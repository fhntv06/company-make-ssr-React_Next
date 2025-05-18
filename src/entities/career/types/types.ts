import { VerticalTab } from '@/features/vertical-tabs/types/types';
import { IMediaSlider } from '@/shared/lib/types';

export interface HRContact {
  title: string;
  link: string;
}

export interface CareerPersonHR {
  name: string;
  description: string;
  contacts: HRContact[];
  post: string;
  image: string;
}

export interface CareerTab {
  description: string;
  person: CareerPersonHR;
  image: string;
  tabs: VerticalTab[];
  media: IMediaSlider[];
}
