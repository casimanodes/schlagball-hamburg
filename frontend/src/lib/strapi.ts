import qs from "qs";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

/* ------------------------------------------------------------------ */
/*  Generic fetch helper for the Strapi REST API                       */
/* ------------------------------------------------------------------ */

interface FetchOptions {
  /** Strapi query parameters (filters, populate, sort, pagination, etc.) */
  query?: Record<string, unknown>;
  /** Next.js revalidation in seconds. Defaults to 60. */
  revalidate?: number;
  /** Override cache behavior. */
  cache?: RequestCache;
}

export async function fetchStrapi<T>(
  path: string,
  options: FetchOptions = {},
): Promise<T> {
  const { query = {}, revalidate = 60, cache } = options;

  const queryString = qs.stringify(query, { encodeValuesOnly: true });
  const url = `${STRAPI_URL}/api${path}${queryString ? `?${queryString}` : ""}`;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (STRAPI_TOKEN) {
    headers.Authorization = `Bearer ${STRAPI_TOKEN}`;
  }

  const res = await fetch(url, {
    headers,
    next: cache ? undefined : { revalidate },
    cache,
  });

  if (!res.ok) {
    throw new Error(`Strapi fetch error: ${res.status} ${res.statusText} – ${url}`);
  }

  return res.json() as Promise<T>;
}

/* ------------------------------------------------------------------ */
/*  Image URL helper                                                   */
/* ------------------------------------------------------------------ */

export function strapiImageUrl(path: string | undefined | null): string {
  if (!path) return "/images/placeholder.jpg";
  if (path.startsWith("http")) return path;
  return `${STRAPI_URL}${path}`;
}
