import { Group, Object3D, Object3DEventMap } from 'three';
import { MaterialData, ObjectData, TextureData } from '@/features/webgl-scene/model/types';

export interface Tag {
  id: number;
  type: number;
  title: string;
}

export interface Media {
  aggregate_type?: string;
  extension?: string;
  type?: string;
  url: string;
  size?: number;
  name?: string;
  mime_type?: string;
}

export interface Client {
  id: number;
  name: string;
  icon: string;
  bg?: string;
}

export interface SiteLink {
  id: number;
  title: string;
  href: string;
  children?: SiteLink[];
  special?: boolean;
  clients?: Client[];
  description?: string;
  stats?: string[];
}

export interface Service {
  id: number;
  title: string;
  categoryId: number | string;
}

export interface Category {
  id: number | string;
  title: string;
  tags: Tag[];
  services: Service[];
}

export interface ExpandableRef {
  updateHeight: () => void;
}

export interface Filters {
  categoryId?: string;
  tagId?: string[];
  serviceId?: string[];
}

export interface Stories {
  id: number;
  client: Client;
  content: [];
  preview: Media;
  description: string;
  categoryId: number;
}

export interface KinescopeRef {
  onStartLoading: () => void;
  onPlay: () => void;
  onPause: () => void;
}

export interface Contact {
  id: number;
  address: string;
  phone: string;
}

export interface ServiceCard {
  id: number;
  title: string;
  links: SiteLink[];
}

export interface WorkFormatType {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image?: Media;
  tags?: Tag[];
  keywords?: Tag[];
}
export interface ModelRef {
  scene: Group<Object3DEventMap> | undefined;
}

export interface ModelData {
  sceneFile: string;
  scenePublicPath: string;
  objects: Record<string, ObjectData>;
  materials: Record<string, MaterialData>;
  textures: Record<string, TextureData>;
  client: Client;
}

export interface ModelParams {
  [key: string]: Object3D;
}

export interface AdsBannerData {
  mainClient: Client;
  title: string;
  tags: Tag[];
  clients: Client[];
  description: string;
  link: string;
}

export interface Person {
  id: number;
  name: string;
  surname: string;
  description: string;
  photo: Media;
}

export interface IProject {
  id: number;
  title: string;
  slug: string;
}

export interface IReviewItem {
  id: number;
  title: string;
  author: string;
  tags: Tag[];
  file: {
    extension: string;
  };
}

export type VideoType = 'youtube' | 'rutube' | 'kinescope' | 'file';

export interface VideoData {
  url: string;
  videoId?: string;
  type?: VideoType;
}

export interface IReview {
  id: number;
  name: string;
  slug: string;
  description?: string;
  media?: Media;
  tags?: Tag[];
  person?: Person;
  pdf?: string;
}

export interface IMediaSlider {
  id: number;
  media: Media;
  name?: string;
  position?: string;
  duration?: number;
  userControls?: boolean;
  subtext?: string;
}

export interface CompanyGroup {
  id: number;
  title: string;
  description: string;
  media: Media;
  link?: string;
  type: 1 | 2;
}

export enum ContentBlockType {
  'CONTENT' = 1,
  'IMAGE' = 2,
  'BIG_IMAGE' = 3,
  'QUOTE' = 4,
  'AUTHOR_QUOTE' = 5,
  'DOCUMENT' = 6,
  'DOUBLE_IMAGE' = 7,
  'SLIDER' = 8,
}

export enum PublicationType {
  MAIN = 1,
  STANDARD,
}

export interface ArticleMedia {
  id: number;
  iframe: string | null;
  media: Media | null;
  subtext: string | null;
}

export interface ContentBlock {
  id: number;
  big_text: string;
  small_text: string;
  text: string;
  content: string;
  small_content: string;
  images: ArticleMedia[];
  content_block_type: ContentBlockType;
  files: ArticleMedia[];
}
