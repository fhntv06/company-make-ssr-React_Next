import { Client, Media } from '@/shared/lib/types';

interface StoryContent extends Media {
  duration: number;
}

export interface Stories {
  id: number;
  client: Client;
  content: StoryContent[];
  preview: Media;
  description: string;
}
