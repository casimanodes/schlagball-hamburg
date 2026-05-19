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
import { fetchStrapi, StrapiFetchError } from "./strapi";
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
// Erkennt die Build-Phase auf zwei Wegen: NEXT_PHASE wird von Next.js
// gesetzt, SKIP_STRAPI_AT_BUILD setzen wir explizit in vercel.json,
// damit die Build-Phasen-Erkennung auch in Vercel-Workern verlässlich
// funktioniert.
const IS_BUILD =
  process.env.NEXT_PHASE === "phase-production-build" ||
  process.env.SKIP_STRAPI_AT_BUILD === "1";

/**
 * Try Strapi, handle failures depending on context:
 * - No token / build phase / development → fall back to mock data
 * - 404 (record never created in Strapi) → always fall back to mocks,
 *   that's just "Single Type not saved yet" and shouldn't crash anything
 * - Production runtime + real error → re-throw so ISR keeps the last good page
 */
async function tryStrapi<T>(
  fn: () => Promise<T>,
  fallback: T,
  context?: string,
): Promise<T> {
  if (!HAS_STRAPI) return fallback;
  try {
    return await fn();
  } catch (err) {
    // 404 = Datensatz noch nie in Strapi gespeichert. Bei Single Types
    // muss man jeden Type einmal im Admin speichern+publishen, sonst
    // antwortet Strapi mit NotFoundError. Das ist kein Bug.
    if (err instanceof StrapiFetchError && err.status === 404) {
      console.warn(
        `[api] Strapi 404 for ${context ?? "endpoint"} – ` +
          `bitte einmal im Strapi-Admin speichern und publizieren. Nutze solange Mock-Daten.`,
      );
      return fallback;
    }
    console.error(
      `[api] Strapi fetch failed${context ? ` (${context})` : ""}:`,
      (err as Error).message,
    );
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
 * Strapi 5 braucht explizite Populate-Konfigurationen pro Content-Type,
 * weil `populate=*` nur die erste Ebene befüllt und Media-Felder in
 * Komponenten (z.B. teamMembers.image) auslässt.
 */
const POPULATE = {
  home: {
    hero: true,
    stats: true,
    featuresHeader: true,
    features: true,
    eventsHeader: true,
    postsHeader: true,
    cta: true,
  },
  about: {
    hero: true,
    storyHeader: true,
    missionHeader: true,
    missionItems: true,
    teamHeader: true,
    teamMembers: { populate: { image: true } },
    cta: true,
  },
  sport: {
    hero: true,
    overviewHeader: true,
    pointsHeader: true,
    points: true,
    equipmentHeader: true,
    equipmentCards: true,
    fieldHeader: true,
    tournamentsHeader: true,
    tournaments: true,
    faqHeader: true,
    faqs: true,
    cta: true,
  },
  training: {
    hero: true,
    sessionsHeader: true,
    sessions: true,
    trialHeader: true,
    eventsHeader: true,
    cta: true,
  },
  membership: {
    hero: true,
    plansHeader: true,
    plans: true,
    stepsHeader: true,
    steps: true,
    downloadFile: true,
    benefitsHeader: true,
    benefits: true,
  },
  gallery: {
    hero: true,
    sectionHeader: true,
    cta: true,
  },
  players: {
    hero: true,
    sectionHeader: true,
    emptyState: true,
  },
  blog: {
    hero: true,
    sectionHeader: true,
    emptyState: true,
  },
  calendar: {
    hero: true,
    emptyState: true,
  },
  imprint: {
    hero: true,
    vereinsangabenHeader: true,
    kontaktHeader: true,
    kontakte: true,
    haftungSections: true,
  },
  privacy: {
    hero: true,
    sections: true,
  },
  global: {
    navItems: true,
  },
} as const;

const STRAPI_META_KEYS = new Set([
  "id", "documentId", "createdAt", "updatedAt", "publishedAt", "locale",
]);

/**
 * Entfernt Strapi-Metadaten (id, documentId, etc.) aus einem Objekt,
 * damit nur die redaktionellen Felder übrig bleiben.
 */
function stripStrapiMeta(obj: Record<string, unknown>): Record<string, unknown> {
  const cleaned: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj)) {
    if (STRAPI_META_KEYS.has(key)) continue;
    if (Array.isArray(value)) {
      cleaned[key] = value.map((item) =>
        item && typeof item === "object" && !Array.isArray(item)
          ? stripStrapiMeta(item as Record<string, unknown>)
          : item,
      );
    } else if (value && typeof value === "object") {
      cleaned[key] = stripStrapiMeta(value as Record<string, unknown>);
    } else {
      cleaned[key] = value;
    }
  }
  return cleaned;
}

/**
 * Verschmilzt Strapi-Daten mit Mock-Defaults: null-Felder und leere
 * Arrays behalten den Default, damit die Seite nie leer rendert.
 */
function mergePageContent<T>(remote: Partial<T> | null | undefined, fallback: T): T {
  if (!remote) return fallback;

  const cleaned = stripStrapiMeta(remote as Record<string, unknown>);
  const result = { ...fallback } as Record<string, unknown>;
  for (const [key, value] of Object.entries(cleaned)) {
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

async function fetchSingleType<T>(
  path: string,
  fallback: T,
  populate: Record<string, unknown>,
): Promise<T> {
  if (IS_BUILD) return fallback;
  return tryStrapi(
    async () => {
      const res = await fetchStrapi<StrapiSingleResponse<Partial<T>>>(
        path,
        { query: { populate } },
      );
      if (!res.data) {
        console.warn(
          `[api] Strapi gab null zurück für ${path} – Inhalt evtl. nicht publiziert. Nutze Mock-Daten.`,
        );
        return fallback;
      }
      if (process.env.NODE_ENV === "development") {
        console.log(`[api] Strapi-Daten geladen für ${path}`);
      }
      return mergePageContent(res.data, fallback);
    },
    fallback,
    path,
  );
}

export function getHomePage(): Promise<HomePageContent> {
  return fetchSingleType("/page-home", mockHomePage, POPULATE.home);
}

export function getAboutPage(): Promise<AboutPageContent> {
  return fetchSingleType("/page-about", mockAboutPage, POPULATE.about);
}

export function getSportPage(): Promise<SportPageContent> {
  return fetchSingleType("/page-sport", mockSportPage, POPULATE.sport);
}

export function getTrainingPage(): Promise<TrainingPageContent> {
  return fetchSingleType("/page-training", mockTrainingPage, POPULATE.training);
}

export function getMembershipPage(): Promise<MembershipPageContent> {
  return fetchSingleType("/page-membership", mockMembershipPage, POPULATE.membership);
}

export function getGalleryPage(): Promise<GalleryPageContent> {
  return fetchSingleType("/page-gallery", mockGalleryPage, POPULATE.gallery);
}

export function getPlayersPage(): Promise<PlayersPageContent> {
  return fetchSingleType("/page-players", mockPlayersPage, POPULATE.players);
}

export function getBlogPage(): Promise<BlogPageContent> {
  return fetchSingleType("/page-blog", mockBlogPage, POPULATE.blog);
}

export function getCalendarPage(): Promise<CalendarPageContent> {
  return fetchSingleType("/page-calendar", mockCalendarPage, POPULATE.calendar);
}

export function getImprintPage(): Promise<ImprintPageContent> {
  return fetchSingleType("/page-imprint", mockImprintPage, POPULATE.imprint);
}

export function getPrivacyPage(): Promise<PrivacyPageContent> {
  return fetchSingleType("/page-privacy", mockPrivacyPage, POPULATE.privacy);
}

export function getGlobalContent(): Promise<GlobalContent> {
  return fetchSingleType("/global-content", mockGlobalContent, POPULATE.global);
}
