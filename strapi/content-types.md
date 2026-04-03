# Strapi Content Types for Schlagball Hamburg

This document defines all content types to be created in Strapi.
Use the Strapi Admin UI (Content-Type Builder) to create these.

---

## 1. PlayerProfile

**API ID:** `player-profile`
**Kind:** Collection Type

| Field         | Type         | Required | Notes                              |
|---------------|-------------|----------|------------------------------------|
| name          | Text (short) | Yes      |                                    |
| age           | Number (int) | Yes      |                                    |
| rank          | Text (short) | Yes      | e.g. Kapitän, Stammspieler, Nachwuchs |
| position      | Text (short) | Yes      | e.g. Schläger, Fänger, Läufer      |
| profileImage  | Media (single) | No     | Single image                       |
| bio           | Text (long)  | No       |                                    |
| slug          | UID          | Yes      | Attached to `name` field           |

**Permissions:** Public `find` and `findOne` via API.

---

## 2. TrainingPost

**API ID:** `training-post`
**Kind:** Collection Type

| Field         | Type         | Required | Notes                              |
|---------------|-------------|----------|------------------------------------|
| title         | Text (short) | Yes      |                                    |
| slug          | UID          | Yes      | Attached to `title` field          |
| excerpt       | Text (long)  | Yes      | Short summary for cards            |
| content       | Rich Text    | Yes      | Full article content (Markdown)    |
| coverImage    | Media (single) | No     |                                    |
| gallery       | Media (multiple) | No   | Additional images                  |
| publishedAt   | DateTime     | Yes      |                                    |
| category      | Text (short) | No       | e.g. Verein, Turnier, Training     |

**Permissions:** Public `find` and `findOne` via API.

---

## 3. TrainingEvent

**API ID:** `training-event`
**Kind:** Collection Type

| Field         | Type         | Required | Notes                              |
|---------------|-------------|----------|------------------------------------|
| title         | Text (short) | Yes      |                                    |
| date          | Date         | Yes      |                                    |
| time          | Text (short) | Yes      | e.g. "14:00–16:00" or "ganztägig" |
| location      | Text (short) | Yes      |                                    |
| description   | Text (long)  | No       |                                    |
| type          | Enum         | Yes      | Values: training, hallentraining, turnier, event |

**Permissions:** Public `find` via API.

---

## 4. TeamMember (optional)

**API ID:** `team-member`
**Kind:** Collection Type

| Field         | Type         | Required | Notes                              |
|---------------|-------------|----------|------------------------------------|
| name          | Text (short) | Yes      |                                    |
| role          | Text (short) | Yes      |                                    |
| description   | Text (long)  | Yes      |                                    |
| image         | Media (single) | No     |                                    |
| order         | Number (int) | Yes      | Sort order                         |

---

## 5. MembershipPlan (optional)

**API ID:** `membership-plan`
**Kind:** Collection Type

| Field         | Type         | Required | Notes                              |
|---------------|-------------|----------|------------------------------------|
| name          | Text (short) | Yes      |                                    |
| price         | Number (dec) | Yes      |                                    |
| interval      | Text (short) | Yes      | e.g. "Monat"                       |
| description   | Text (long)  | Yes      |                                    |
| features      | JSON         | Yes      | Array of strings                   |
| highlighted   | Boolean      | Yes      | Mark the recommended plan          |

---

## API Token

1. Go to **Settings → API Tokens** in Strapi Admin.
2. Create a new token with type **Read-only**.
3. Copy the token and add it to the frontend `.env.local` file as `STRAPI_API_TOKEN`.

## Media / Images

- Upload images through the Strapi Media Library.
- The frontend reads image URLs from Strapi's API response and prepends the Strapi base URL if needed.
- Configure `next.config.ts` `images.remotePatterns` to include the Strapi domain.
