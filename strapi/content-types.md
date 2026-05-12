# Strapi Content Types for Schlagball Hamburg

This document describes all content types used by the Schlagball Hamburg
website. The schemas live in `strapi-cms/src/api/*` and are auto-loaded
when Strapi starts. Public-read permissions are granted automatically by
`strapi-cms/src/index.ts` on first boot.

There are **three classes of content**:

1. **Collection Types** – multiple entries (e.g. blog posts, players)
2. **Single Types** – exactly one entry per page (e.g. Startseite,
   Mitgliedschaft) → all editable page texts live here
3. **Components** – reusable building blocks (Hero, CTA, etc.) used inside
   Single Types and Collection Types

---

## Single Types (Page Contents)

Each page of the website has its own Single Type in Strapi. Open the
matching Single Type in the Strapi Admin (left sidebar → "Single Types")
to edit the texts of that page.

| Strapi Display Name | API ID            | Frontend Page         |
|---------------------|-------------------|------------------------|
| Startseite          | `page-home`       | `/`                    |
| Über-Uns Seite      | `page-about`      | `/ueber-uns`           |
| Sport Seite         | `page-sport`      | `/sport`               |
| Training Seite      | `page-training`   | `/training`            |
| Mitgliedschaft Seite| `page-membership` | `/mitgliedschaft`      |
| Galerie Seite       | `page-gallery`    | `/galerie`             |
| Spieler Seite       | `page-players`    | `/spieler`             |
| Blog Seite          | `page-blog`       | `/blog`                |
| Kalender Seite      | `page-calendar`   | `/kalender`            |
| Impressum Seite     | `page-imprint`    | `/impressum`           |
| Datenschutz Seite   | `page-privacy`    | `/datenschutz`         |
| Globale Inhalte     | `global-content`  | Header & Footer (alle) |

Each Single Type bundles all editable texts of its page (Hero, Section
Headers, body texts, CTAs, etc.). See the schema files under
`strapi-cms/src/api/page-*/content-types/*/schema.json` for the exact
fields.

### Editor Workflow

1. Open the Strapi Admin
2. Click on the desired Single Type in the left sidebar
3. Edit the fields (Hero title, body texts, CTA labels, etc.)
4. Click **Save** and then **Publish**

**Fallback:** If a Single Type has not been published yet, the frontend
falls back to the default texts in `frontend/src/data/page-mocks.ts`.
This way the website never breaks during initial setup.

---

## Components

Reusable components used inside Single Types. Defined under
`strapi-cms/src/components/`.

### `shared.*`

| Component        | Purpose                                              |
|------------------|------------------------------------------------------|
| `hero`           | Hero section (subtitle, title, description, buttons) |
| `cta`            | Call-to-Action section                               |
| `section-header` | Overline + title + description                       |
| `feature-item`   | Card with icon, title, description, link             |
| `stat-item`      | Statistic value + label                              |
| `faq-item`       | Question + answer                                    |
| `nav-item`       | Navigation entry (label + href)                      |
| `rich-paragraph` | Heading + rich-text body                             |

### `page.*`

| Component         | Purpose                                                       |
|-------------------|---------------------------------------------------------------|
| `mission-item`    | Mission/value point on the About page                         |
| `point-type`      | Type of point in Schlagball (Sport page)                      |
| `equipment-card`  | Equipment description card (Sport page)                       |
| `tournament-card` | Tournament description (Sport page)                           |
| `training-session`| Training session details (Training page)                      |
| `membership-step` | One step in the registration flow (Membership page)           |
| `benefit-item`    | One benefit of membership (Membership page)                   |
| `membership-plan` | Pricing plan with features (Membership page)                  |
| `team-member`     | Team member (About page)                                      |
| `contact-person`  | Contact person with email/phone (Imprint page)                |
| `legal-section`   | Legal section with rich-text body (Imprint/Privacy pages)     |
| `empty-state`     | Empty-state message (when no items are available)             |

---

## Collection Types

These hold lists of items. Each item has its own entry.

### 1. PlayerProfile

**API ID:** `player-profile` · **Kind:** Collection Type

| Field         | Type             | Required | Notes                                  |
|---------------|------------------|----------|----------------------------------------|
| name          | Text (short)     | Yes      |                                        |
| age           | Number (int)     | Yes      |                                        |
| rank          | Text (short)     | Yes      | e.g. Kapitän, Stammspieler, Nachwuchs  |
| position      | Text (short)     | Yes      | e.g. Schläger, Fänger, Läufer          |
| profileImage  | Media (single)   | No       | Single image                           |
| bio           | Text (long)      | No       |                                        |
| slug          | UID              | Yes      | Attached to `name` field               |

### 2. TrainingPost (Blog)

**API ID:** `training-post` · **Kind:** Collection Type

| Field         | Type             | Required | Notes                                  |
|---------------|------------------|----------|----------------------------------------|
| title         | Text (short)     | Yes      |                                        |
| slug          | UID              | Yes      | Attached to `title` field              |
| excerpt       | Text (long)      | Yes      | Short summary for cards                |
| content       | Rich Text        | Yes      | Full article content (Markdown)        |
| coverImage    | Media (single)   | No       |                                        |
| gallery       | Media (multiple) | No       | Additional images                      |
| publishedAt   | DateTime         | Yes      |                                        |
| category      | Text (short)     | No       | e.g. Verein, Turnier, Training         |

### 3. TrainingEvent (Calendar)

**API ID:** `training-event` · **Kind:** Collection Type

| Field         | Type             | Required | Notes                                                     |
|---------------|------------------|----------|-----------------------------------------------------------|
| title         | Text (short)     | Yes      |                                                           |
| date          | Date             | Yes      |                                                           |
| time          | Text (short)     | Yes      | e.g. "14:00–16:00" or "ganztägig"                         |
| location      | Text (short)     | Yes      |                                                           |
| description   | Text (long)      | No       |                                                           |
| type          | Enum             | Yes      | Values: training, hallentraining, turnier, event          |

### 4. GalleryItem

**API ID:** `gallery-item` · **Kind:** Collection Type

| Field         | Type             | Required | Notes                                          |
|---------------|------------------|----------|------------------------------------------------|
| title         | Text (short)     | Yes      |                                                |
| description   | Text (long)      | No       |                                                |
| category      | Enum             | Yes      | Values: training, turnier, vereinsleben        |
| image         | Media (single)   | No       |                                                |
| date          | Date             | Yes      |                                                |

---

## API Token

1. Go to **Settings → API Tokens** in Strapi Admin
2. Create a new token with type **Read-only**
3. Copy the token and add it to the frontend `.env.local` as
   `STRAPI_API_TOKEN`

## Media / Images

- Upload images through the Strapi Media Library
- The frontend reads URLs from Strapi's API response and prepends the
  Strapi base URL via `frontend/src/lib/strapi.ts → strapiImageUrl()`
- `frontend/next.config.ts → images.remotePatterns` must include the
  Strapi domain
