/**
 * Data access layer.
 *
 * Tries Strapi first when a token is configured.
 * Falls back to mock data only during build or in development when Strapi is
 * unreachable. At runtime in production, errors are re-thrown so that ISR
 * keeps the last successfully cached page instead of caching mock data.
 *
 * Every public function here is meant to be called from Server Components.
 */

import type {
  PlayerProfile,
  TrainingPost,
  TrainingEvent,
  GalleryItem,
  StrapiResponse,
  StrapiSingleResponse,
} from "@/types";
import type {
  HomePageContent,
  AboutPageContent,
  SportPageContent,
  TrainingPageContent,
  MembershipPageContent,
  GalleryPageContent,
  PlayersPageContent,
  BlogPageContent,
  CalendarPageContent,
  ImprintPageContent,
  PrivacyPageContent,
  GlobalContent,
} from "@/types/pages";
import { fetchStrapi } from "./strapi";
import {
  mockPlayers,
  mockPosts,
  mockEvents,
  mockGallery,
} from "@/data/mock";
import {
  mockHomePage,
  mockAboutPage,
  mockSportPage,
  mockTrainingPage,
  mockMembershipPage,
  mockGalleryPage,
  mockPlayersPage,
  mockBlogPage,
  mockCalendarPage,
  mockImprintPage,
  mockPrivacyPage,
  mockGlobalContent,
} from "@/data/page-mocks";

const HAS_STRAPI = !!process.env.STRAPI_API_TOKEN;
const IS_BUILD = process.env.NEXT_PHASE === "phase-production-build";

/**
 * Try Strapi, handle failures depending on context:
 * - No token / build phase / development → fall back to mock data
 * - Production runtime → re-throw so ISR keeps the last good cached page
 */
async function tryStrapi<T>(
  fn: () => Promise<T>,
  fallback: T,
): Promise<T> {
  if (!HAS_STRAPI) return fallback;
  try {
    return await fn();
  } catch (err) {
    console.error("[api] Strapi fetch failed:", (err as Error).message);
    if (IS_BUILD || process.env.NODE_ENV === "development") {
      console.warn("[api] Using mock data as fallback");
      return fallback;
    }
    // At runtime in production, re-throw so ISR preserves the last good page
    throw err;
  }
}

/* ------------------------------------------------------------------ */
/*  Player profiles                                                    */
/* ------------------------------------------------------------------ */

export async function getPlayers(): Promise<PlayerProfile[]> {
  return tryStrapi(async () => {
    const res = await fetchStrapi<StrapiResponse<PlayerProfile[]>>(
      "/player-profiles",
      {
        query: {
          populate: ["profileImage"],
          sort: ["name:asc"],
          pagination: { pageSize: 100 },
        },
      },
    );
    return res.data;
  }, mockPlayers);
}

export async function getPlayerBySlug(
  slug: string,
): Promise<PlayerProfile | null> {
  return tryStrapi(async () => {
    const res = await fetchStrapi<StrapiResponse<PlayerProfile[]>>(
      "/player-profiles",
      {
        query: {
          filters: { slug: { $eq: slug } },
          populate: ["profileImage"],
        },
      },
    );
    return res.data[0] ?? null;
  }, mockPlayers.find((p) => p.slug === slug) ?? null);
}

/* ------------------------------------------------------------------ */
/*  Training posts (blog)                                              */
/* ------------------------------------------------------------------ */

export async function getPosts(): Promise<TrainingPost[]> {
  return tryStrapi(async () => {
    const res = await fetchStrapi<StrapiResponse<TrainingPost[]>>(
      "/training-posts",
      {
        query: {
          populate: ["coverImage", "gallery"],
          sort: ["publishedAt:desc"],
          pagination: { pageSize: 50 },
        },
      },
    );
    return res.data;
  }, mockPosts);
}

export async function getPostBySlug(
  slug: string,
): Promise<TrainingPost | null> {
  return tryStrapi(async () => {
    const res = await fetchStrapi<StrapiResponse<TrainingPost[]>>(
      "/training-posts",
      {
        query: {
          filters: { slug: { $eq: slug } },
          populate: ["coverImage", "gallery"],
        },
      },
    );
    return res.data[0] ?? null;
  }, mockPosts.find((p) => p.slug === slug) ?? null);
}

/* ------------------------------------------------------------------ */
/*  Training events / calendar                                         */
/* ------------------------------------------------------------------ */

export async function getEvents(): Promise<TrainingEvent[]> {
  return tryStrapi(async () => {
    const res = await fetchStrapi<StrapiResponse<TrainingEvent[]>>(
      "/training-events",
      {
        query: {
          sort: ["date:asc"],
          pagination: { pageSize: 100 },
        },
      },
    );
    return res.data;
  }, mockEvents);
}

export async function getUpcomingEvents(
  limit = 5,
): Promise<TrainingEvent[]> {
  const now = new Date().toISOString().split("T")[0];
  return tryStrapi(async () => {
    const today = new Date().toISOString().split("T")[0];
    const res = await fetchStrapi<StrapiResponse<TrainingEvent[]>>(
      "/training-events",
      {
        query: {
          filters: { date: { $gte: today } },
          sort: ["date:asc"],
          pagination: { pageSize: limit },
        },
        revalidate: 300,
      },
    );
    return res.data;
  }, mockEvents
    .filter((e) => e.date >= now)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, limit));
}

/* ------------------------------------------------------------------ */
/*  Gallery                                                            */
/* ------------------------------------------------------------------ */

export async function getGalleryItems(): Promise<GalleryItem[]> {
  return tryStrapi(async () => {
    const res = await fetchStrapi<StrapiResponse<GalleryItem[]>>(
      "/gallery-items",
      {
        query: {
          populate: ["image"],
          sort: ["date:desc"],
          pagination: { pageSize: 100 },
        },
      },
    );
    return res.data;
  }, mockGallery.sort((a, b) => b.date.localeCompare(a.date)));
}

/* ------------------------------------------------------------------ */
/*  Page content (Single Types)                                        */
/* ------------------------------------------------------------------ */

/**
 * Tiefe Populate-Strategie für Single Types: lädt alle Components mit
 * ihren Sub-Components, damit Hero, CTA, etc. komplett befüllt sind.
 */
const PAGE_POPULATE_DEEP = {
  populate: "*" as const,
};

/**
 * Strapi liefert Single-Type-Inhalte mit vielen verschachtelten Components.
 * `mergePageContent` verschmilzt Strapi-Daten mit Mock-Defaults, sodass
 * leere Felder den Default zeigen statt zu crashen.
 */
function mergePageContent<T>(remote: Partial<T> | null | undefined, fallback: T): T {
  if (!remote) return fallback;
  const result = { ...fallback } as Record<string, unknown>;
  for (const [key, value] of Object.entries(remote)) {
    if (value === null || value === undefined) continue;
    if (Array.isArray(value) && value.length === 0) continue;
    if (typeof value === "object" && !Array.isArray(value)) {
      const fallbackVal = (fallback as Record<string, unknown>)[key];
      if (fallbackVal && typeof fallbackVal === "object" && !Array.isArray(fallbackVal)) {
        result[key] = mergePageContent(
          value as Partial<unknown>,
          fallbackVal as unknown,
        );
        continue;
      }
    }
    result[key] = value;
  }
  return result as T;
}

async function fetchSingleType<T>(path: string, fallback: T): Promise<T> {
  return tryStrapi(async () => {
    const res = await fetchStrapi<StrapiSingleResponse<Partial<T>>>(
      path,
      { query: PAGE_POPULATE_DEEP },
    );
    return mergePageContent(res.data, fallback);
  }, fallback);
}

export function getHomePage(): Promise<HomePageContent> {
  return fetchSingleType("/page-home", mockHomePage);
}

export function getAboutPage(): Promise<AboutPageContent> {
  return fetchSingleType("/page-about", mockAboutPage);
}

export function getSportPage(): Promise<SportPageContent> {
  return fetchSingleType("/page-sport", mockSportPage);
}

export function getTrainingPage(): Promise<TrainingPageContent> {
  return fetchSingleType("/page-training", mockTrainingPage);
}

export function getMembershipPage(): Promise<MembershipPageContent> {
  return fetchSingleType("/page-membership", mockMembershipPage);
}

export function getGalleryPage(): Promise<GalleryPageContent> {
  return fetchSingleType("/page-gallery", mockGalleryPage);
}

export function getPlayersPage(): Promise<PlayersPageContent> {
  return fetchSingleType("/page-players", mockPlayersPage);
}

export function getBlogPage(): Promise<BlogPageContent> {
  return fetchSingleType("/page-blog", mockBlogPage);
}

export function getCalendarPage(): Promise<CalendarPageContent> {
  return fetchSingleType("/page-calendar", mockCalendarPage);
}

export function getImprintPage(): Promise<ImprintPageContent> {
  return fetchSingleType("/page-imprint", mockImprintPage);
}

export function getPrivacyPage(): Promise<PrivacyPageContent> {
  return fetchSingleType("/page-privacy", mockPrivacyPage);
}

export function getGlobalContent(): Promise<GlobalContent> {
  return fetchSingleType("/global-content", mockGlobalContent);
}
