# Schlagball Hamburg - Vereinswebseite

Moderne, responsive Vereinswebseite fuer Schlagball Hamburg e.V., gebaut mit Next.js, TypeScript, Tailwind CSS und shadcn/ui.

## Architektur

```
Frontend (Next.js 16, App Router)
    |
    |-- Statische Inhalte (Seiten wie Sport, Training, Mitgliedschaft)
    |-- Dynamische Inhalte via Strapi CMS API
    |       |-- Spielerprofile
    |       |-- Blog-Beitraege
    |       |-- Kalender/Events
    |
    +-- Mock-Daten als Fallback (wenn Strapi nicht laeuft)
```

### Warum kein Supabase?

Strapi deckt alle Anforderungen ab: Content-Management, Media-Uploads, REST-API, Benutzerrollen und Authentifizierung. Supabase waere nur noetig, wenn eigene Datenbank-Logik, Echtzeit-Features oder Auth benoetigt werden. Die Architektur ist so aufgebaut, dass Supabase spaeter ergaenzt werden kann, falls noetig.

## Tech Stack

| Bereich       | Technologie                     |
|---------------|--------------------------------|
| Framework     | Next.js 16 (App Router)        |
| Sprache       | TypeScript (strict)            |
| UI-Bibliothek | React 19                       |
| Styling       | Tailwind CSS v4                |
| Komponenten   | shadcn/ui (base-ui)            |
| Icons         | Lucide React                   |
| CMS           | Strapi v4/v5 (separate Instanz) |
| Daten         | Strapi REST API + Mock-Fallback |

## Projektstruktur

```
frontend/
├── src/
│   ├── app/                    # Next.js App Router Seiten
│   │   ├── page.tsx            # Homepage
│   │   ├── layout.tsx          # Root-Layout (Header + Footer)
│   │   ├── not-found.tsx       # 404-Seite
│   │   ├── ueber-uns/          # Ueber den Verein
│   │   ├── sport/              # Der Sport Schlagball
│   │   ├── training/           # Trainingszeiten & Infos
│   │   ├── mitgliedschaft/     # Beitraege & Anmeldung
│   │   ├── spieler/            # Spielerprofile (Liste)
│   │   │   └── [slug]/         # Spieler-Detailseite
│   │   ├── blog/               # Blog-Uebersicht
│   │   │   └── [slug]/         # Blog-Detailseite
│   │   └── kalender/           # Kalender mit Filter
│   ├── components/
│   │   ├── ui/                 # shadcn/ui Basiskomponenten
│   │   ├── layout/             # Header, Footer
│   │   ├── sections/           # Hero, CTA, FeatureGrid, Stats, etc.
│   │   └── cards/              # PlayerCard, BlogCard, EventCard, etc.
│   ├── lib/
│   │   ├── api.ts              # Daten-Zugriff (Strapi + Mock-Fallback)
│   │   ├── strapi.ts           # Strapi REST-API Client
│   │   ├── constants.ts        # Navigation, Kontakt, etc.
│   │   ├── button-variants.ts  # Button-Styles fuer Server Components
│   │   └── utils.ts            # Utility-Funktionen (cn)
│   ├── types/
│   │   └── index.ts            # TypeScript-Interfaces
│   └── data/
│       └── mock.ts             # Mock-Daten fuer Entwicklung
├── public/
│   └── images/                 # Statische Bilder
├── .env.example                # Umgebungsvariablen-Vorlage
├── .env.local                  # Lokale Umgebungsvariablen
├── next.config.ts              # Next.js Konfiguration
├── tsconfig.json               # TypeScript Konfiguration
└── package.json
```

## Installation

### Voraussetzungen

- Node.js >= 20.9
- npm >= 9

### 1. Repository klonen und Dependencies installieren

```bash
cd vereinswebseite/frontend
npm install
```

### 2. Umgebungsvariablen einrichten

```bash
cp .env.example .env.local
```

Datei `.env.local` bearbeiten:

```env
# Strapi CMS (optional fuer Entwicklung - ohne Token werden Mock-Daten verwendet)
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=dein-strapi-api-token

# Seite
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Entwicklungsserver starten

```bash
npm run dev
```

Oeffne http://localhost:3000 im Browser.

### 4. Produktion Build

```bash
npm run build
npm start
```

## Seiten

| Pfad              | Beschreibung                        |
|-------------------|-------------------------------------|
| `/`               | Homepage mit Hero, Features, Events, Blog |
| `/ueber-uns`      | Vereinsvorstellung, Team, Mission   |
| `/sport`          | Schlagball erklaert: Regeln, Ausruestung, Spielfeld, Turniere |
| `/training`       | Trainingszeiten, Standorte, Probetraining |
| `/mitgliedschaft` | Beitraege, Anmeldeprozess, Vorteile |
| `/spieler`        | Spielerprofile (dynamisch via CMS)  |
| `/spieler/[slug]` | Spieler-Detailseite                 |
| `/blog`           | Blog/Neuigkeiten (dynamisch via CMS) |
| `/blog/[slug]`    | Blog-Beitrag Detailseite            |
| `/kalender`       | Termine mit Typ-Filter und Tabs     |

## CMS-Integration (Strapi)

### Ohne Strapi (Entwicklung)

Wenn kein `STRAPI_API_TOKEN` gesetzt ist, verwendet die App automatisch Mock-Daten aus `src/data/mock.ts`. Alle Seiten sind sofort funktionsfaehig.

### Mit Strapi

1. Strapi-Projekt erstellen (separates Verzeichnis):

```bash
npx create-strapi@latest strapi-backend
cd strapi-backend
npm run develop
```

2. Content Types im Strapi Admin erstellen (siehe `strapi/content-types.md`):
   - **PlayerProfile**: name, age, rank, position, profileImage, bio, slug
   - **TrainingPost**: title, slug, excerpt, content, coverImage, gallery, publishedAt, category
   - **TrainingEvent**: title, date, time, location, description, type (enum)

3. API-Berechtigungen setzen:
   - Settings > Roles > Public
   - `find` und `findOne` fuer PlayerProfile und TrainingPost aktivieren
   - `find` fuer TrainingEvent aktivieren

4. API-Token erstellen:
   - Settings > API Tokens > Create new API Token
   - Typ: Read-only
   - Token in `.env.local` als `STRAPI_API_TOKEN` eintragen

### Content-Type Details

Die vollstaendige Dokumentation aller Content Types mit Felddefinitionen und Datentypen befindet sich in:

```
strapi/content-types.md
```

## Anpassung

### Farben

Das Farbschema ist in `src/app/globals.css` definiert:
- **Primary**: Dunkles Navy-Blau (professionell)
- **Accent**: Gruene Akzentfarbe (sportlich, Energie)
- **Sport**: Warmes Orange (Highlights, CTAs)

### Komponenten

Alle wiederverwendbaren Komponenten befinden sich in `src/components/`:
- `sections/Hero.tsx` - Hero-Bereich fuer Seitenkoepfe
- `sections/CTASection.tsx` - Call-to-Action Bereiche
- `sections/FeatureGrid.tsx` - Feature-Karten Raster
- `sections/StatsSection.tsx` - Statistik-Zahlen
- `cards/PlayerCard.tsx` - Spieler-Karte
- `cards/BlogCard.tsx` - Blog-Beitragskarte
- `cards/EventCard.tsx` - Termin-Karte
- `cards/MembershipCard.tsx` - Mitgliedschaftsplan-Karte
- `cards/TeamMemberCard.tsx` - Team-Mitglieder-Karte

### Neue Seiten hinzufuegen

1. Ordner in `src/app/` erstellen
2. `page.tsx` anlegen
3. Navigation in `src/lib/constants.ts` (`NAV_ITEMS`) ergaenzen

## Deployment

### Vercel (empfohlen)

1. Repository auf GitHub pushen
2. Projekt auf vercel.com importieren
3. Umgebungsvariablen in Vercel Dashboard setzen
4. Automatisches Deployment bei jedem Push

### Andere Plattformen

Die App kann ueberall deployed werden, wo Node.js laeuft:
- Netlify
- Railway
- Docker
- Eigener Server mit `npm run build && npm start`

## Lizenz

Schlagball Hamburg e.V. - Alle Rechte vorbehalten.
