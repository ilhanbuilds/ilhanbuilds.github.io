import type { ImageMetadata } from 'astro';

export type Locale = 'en' | 'tr';
export type Localized<T> = Record<Locale, T>;
export type Status = 'in-development' | 'unreleased' | 'on-hold';
export interface ProjectCopy {
  summary: string;
  overview?: string;
  contribution?: string;
  process?: string;
  technicalDetails?: string;
  lessons?: string;
}
export interface ProjectImage {
  src: ImageMetadata;
  alt: Localized<string>;
}
export interface Project {
  id: string;
  slug: string;
  title: string;
  year: number;
  verifiedDate?: string;
  timelineOrder: number;
  status?: Status;
  category: Localized<string>;
  technologies: string[];
  featured?: number;
  currentlyBuilding?: boolean;
  collaboration?: 'solo' | 'team';
  visibility: 'public' | 'private';
  repositoryUrl?: string;
  demoUrl?: string;
  documentationUrl?: string;
  storeUrl?: string;
  coverImage?: ProjectImage;
  logo?: ProjectImage;
  timelineImage?: ProjectImage;
  gallery?: ProjectImage[];
  translations: Localized<ProjectCopy>;
}
