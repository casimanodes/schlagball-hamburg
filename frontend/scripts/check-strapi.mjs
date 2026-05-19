#!/usr/bin/env node
/**
 * Strapi-Diagnose-Tool für Schlagball Hamburg
 *
 * Ruft alle Strapi-Endpunkte (Single Types + Collections) auf und zeigt
 * für jeden den HTTP-Status. So siehst du sofort, welche Inhalte du in
 * Strapi noch anlegen/publizieren musst.
 *
 * Nutzung:
 *   node scripts/check-strapi.mjs
 *
 * Voraussetzung: .env.local muss NEXT_PUBLIC_STRAPI_URL und
 * STRAPI_API_TOKEN enthalten.
 */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, "..", ".env.local");

let env = {};
try {
  const raw = readFileSync(envPath, "utf8");
  for (const line of raw.split(/\r?\n/)) {
    if (!line || line.startsWith("#")) continue;
    const idx = line.indexOf("=");
    if (idx === -1) continue;
    env[line.slice(0, idx).trim()] = line.slice(idx + 1).trim();
  }
} catch {
  console.error(`❌ .env.local nicht gefunden unter ${envPath}`);
  process.exit(1);
}

const URL_BASE = env.NEXT_PUBLIC_STRAPI_URL;
const TOKEN = env.STRAPI_API_TOKEN;

if (!URL_BASE || !TOKEN) {
  console.error("❌ NEXT_PUBLIC_STRAPI_URL oder STRAPI_API_TOKEN fehlt in .env.local");
  process.exit(1);
}

const ENDPOINTS = [
  { type: "Single Type", path: "/global-content", label: "Globale Inhalte (Header/Footer)" },
  { type: "Single Type", path: "/page-home", label: "Startseite (/)" },
  { type: "Single Type", path: "/page-about", label: "Über uns (/ueber-uns)" },
  { type: "Single Type", path: "/page-sport", label: "Sport (/sport)" },
  { type: "Single Type", path: "/page-training", label: "Training (/training)" },
  { type: "Single Type", path: "/page-membership", label: "Mitgliedschaft (/mitgliedschaft)" },
  { type: "Single Type", path: "/page-gallery", label: "Galerie-Seite (/galerie)" },
  { type: "Single Type", path: "/page-players", label: "Spieler-Seite (/spieler)" },
  { type: "Single Type", path: "/page-blog", label: "Blog-Seite (/blog)" },
  { type: "Single Type", path: "/page-calendar", label: "Kalender-Seite (/kalender)" },
  { type: "Single Type", path: "/page-imprint", label: "Impressum (/impressum)" },
  { type: "Single Type", path: "/page-privacy", label: "Datenschutz (/datenschutz)" },
  { type: "Collection", path: "/gallery-items", label: "Galerie-Einträge" },
  { type: "Collection", path: "/player-profiles", label: "Spielerprofile" },
  { type: "Collection", path: "/training-posts", label: "Blog-Beiträge" },
  { type: "Collection", path: "/training-events", label: "Termine" },
];

function fmtStatus(code) {
  if (code === 200) return `\x1b[32m✅ 200 OK\x1b[0m`;
  if (code === 404) return `\x1b[33m⚠️  404 (noch nicht angelegt)\x1b[0m`;
  if (code === 403) return `\x1b[31m🔒 403 (Token hat keine Berechtigung)\x1b[0m`;
  if (code === 401) return `\x1b[31m🔒 401 (Token ungültig)\x1b[0m`;
  return `\x1b[31m❌ ${code}\x1b[0m`;
}

console.log(`\n🔍 Strapi-Diagnose: ${URL_BASE}\n`);
console.log("=".repeat(80));

const results = { ok: 0, missing: 0, error: 0 };

for (const ep of ENDPOINTS) {
  // populate=* lädt alle 1.-Ebene-Komponenten, damit wir auch
  // ungefüllte Single-Type-Komponenten sehen
  const url = `${URL_BASE}/api${ep.path}?populate=*`;
  try {
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });
    let summary = "";
    if (res.status === 200) {
      results.ok++;
      const body = await res.json();
      if (Array.isArray(body.data)) {
        summary = ` → ${body.data.length} Einträge`;
      } else if (body.data && typeof body.data === "object") {
        const fields = Object.keys(body.data).filter(
          (k) => !["id", "documentId", "createdAt", "updatedAt", "publishedAt"].includes(k),
        );
        const filled = fields.filter((k) => {
          const v = body.data[k];
          if (v === null || v === undefined) return false;
          if (Array.isArray(v) && v.length === 0) return false;
          return true;
        });
        summary = ` → ${filled.length}/${fields.length} Felder befüllt`;
      } else if (body.data === null) {
        summary = ` → Datensatz ist leer (data: null)`;
      }
    } else if (res.status === 404) {
      results.missing++;
    } else {
      results.error++;
    }
    console.log(`${fmtStatus(res.status)} ${ep.type.padEnd(11)} ${ep.path.padEnd(20)} ${ep.label}${summary}`);
  } catch (err) {
    results.error++;
    console.log(`\x1b[31m❌ Netzwerkfehler\x1b[0m ${ep.path}: ${err.message}`);
  }
}

console.log("=".repeat(80));
console.log(`\n✅ ${results.ok} OK   ⚠️  ${results.missing} fehlen   ❌ ${results.error} Fehler\n`);

if (results.missing > 0) {
  console.log(`💡 Single Types mit 404 musst du im Strapi-Admin öffnen,`);
  console.log(`   beliebige Inhalte eintragen (oder leer lassen) und auf`);
  console.log(`   "Speichern" + "Publish" klicken. Erst dann existiert der`);
  console.log(`   Datensatz und kann von der Webseite gelesen werden.\n`);
}
