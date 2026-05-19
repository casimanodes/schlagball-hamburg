import qs from "qs";

const STRAPI_URL = (process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337").trim();
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN?.trim();

/** Fetch timeout in milliseconds */
const FETCH_TIMEOUT_MS = 10_000;

/**
 * Spezielle Fehlerklasse mit HTTP-Status, damit Aufrufer 404 von
 * echten Fehlern (Timeout, 500) unterscheiden können. 404 bei einem
 * Single Type bedeutet "Datensatz noch nie gespeichert" – kein
 * echter Fehler, also kein Grund die Seite crashen zu lassen.
 */
export class StrapiFetchError extends Error {
  readonly status: number;
  readonly url: string;

  constructor(status: number, statusText: string, url: string) {
    super(`Strapi fetch error: ${status} ${statusText} – ${url}`);
    this.name = "StrapiFetchError";
    this.status = status;
    this.url = url;
  }
}

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

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const res = await fetch(url, {
      headers,
      signal: controller.signal,
      next: cache ? undefined : { revalidate },
      cache,
    });

    if (!res.ok) {
      throw new StrapiFetchError(res.status, res.statusText, url);
    }

    return res.json() as Promise<T>;
  } finally {
    clearTimeout(timeout);
  }
}

/* ------------------------------------------------------------------ */
/*  Image URL helper                                                   */
/* ------------------------------------------------------------------ */

export function strapiImageUrl(path: string | undefined | null): string {
  if (!path) return "/images/placeholder.jpg";
  if (path.startsWith("http")) return path;
  const base = STRAPI_URL.replace(/\/+$/, "");
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${cleanPath}`;
}
