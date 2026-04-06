/* ------------------------------------------------------------------ */
/*  Strapi generic response types                                     */
/* ------------------------------------------------------------------ */

export interface StrapiImage {
  id: number;
  url: string;
  alternativeText: string | null;
  width: number;
  height: number;
  formats?: {
    thumbnail?: StrapiImageFormat;
    small?: StrapiImageFormat;
    medium?: StrapiImageFormat;
    large?: StrapiImageFormat;
  };
}

export interface StrapiImageFormat {
  url: string;
  width: number;
  height: number;
}

export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiSingleResponse<T> {
  data: T;
  meta: Record<string, unknown>;
}

/* ------------------------------------------------------------------ */
/*  Domain models – these mirror the Strapi content types              */
/* ------------------------------------------------------------------ */

export interface PlayerProfile {
  id: number;
  documentId: string;
  name: string;
  age: number;
  rank: string;
  position: string;
  profileImage: StrapiImage | null;
  bio: string | null;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export interface TrainingPost {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: StrapiImage | null;
  gallery: StrapiImage[];
  publishedAt: string;
  category: string | null;
  createdAt: string;
  updatedAt: string;
}

export type TrainingEventType =
  | "training"
  | "hallentraining"
  | "turnier"
  | "event";

export interface TrainingEvent {
  id: number;
  documentId: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string | null;
  type: TrainingEventType;
  createdAt: string;
  updatedAt: string;
}

export interface TeamMember {
  id: number;
  documentId: string;
  name: string;
  role: string;
  description: string;
  image: StrapiImage | null;
  order: number;
}

export interface MembershipPlan {
  id: number;
  documentId: string;
  name: string;
  price: number;
  interval: string;
  description: string;
  features: string[];
  highlighted: boolean;
}

/* ------------------------------------------------------------------ */
/*  Gallery                                                            */
/* ------------------------------------------------------------------ */

export type GalleryCategory = "training" | "turnier" | "vereinsleben";

export interface GalleryItem {
  id: number;
  documentId: string;
  title: string;
  description: string | null;
  category: GalleryCategory;
  image: StrapiImage | null;
  date: string;
  createdAt: string;
  updatedAt: string;
}

/* ------------------------------------------------------------------ */
/*  Navigation                                                         */
/* ------------------------------------------------------------------ */

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}
