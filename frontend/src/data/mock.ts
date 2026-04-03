import type {
  PlayerProfile,
  TrainingPost,
  TrainingEvent,
  TeamMember,
  MembershipPlan,
} from "@/types";

/* ------------------------------------------------------------------ */
/*  Team members (static, from the real website)                       */
/* ------------------------------------------------------------------ */

export const teamMembers: TeamMember[] = [
  {
    id: 1,
    documentId: "team-cassio",
    name: "Cassio",
    role: "1. Vorstand & Trainer",
    description:
      "Ich bin Cassio, 23 Jahre alt, Sport-Trainer mit über 8 Jahren Erfahrung und leidenschaftlicher Schlagballer. Ich habe eine C-Trainerlizenz im Badminton und unterrichte professionell Schwimmen. Seit 3 Jahren unterrichte ich gemeinsam mit Mateo Schlagball an der Winterhuder Reformschule.",
    image: null,
    order: 1,
  },
  {
    id: 2,
    documentId: "team-mateo",
    name: "Mateo",
    role: "2. Vorstand & Trainer",
    description:
      "Ich bin Mateo, 19 Jahre alt, leidenschaftlicher Schlagballer seit 8 Jahren und Trainer seit einem halben Jahrzehnt. Ich besitze die JuLeiCa-Lizenz und studiere Bewegungswissenschaften (Sport) an der Universität Hamburg.",
    image: null,
    order: 2,
  },
];

/* ------------------------------------------------------------------ */
/*  Membership plans (from the real website)                           */
/* ------------------------------------------------------------------ */

export const membershipPlans: MembershipPlan[] = [
  {
    id: 1,
    documentId: "plan-regular",
    name: "Regulär",
    price: 9,
    interval: "Monat",
    description: "Perfekt für den Einstieg – 1× Training pro Woche.",
    features: [
      "1× Training pro Woche",
      "Zugang zu Vereinsturnieren",
      "Gemeinschaft & Teamgeist",
      "Leihausrüstung inklusive",
    ],
    highlighted: false,
  },
  {
    id: 2,
    documentId: "plan-pro",
    name: "Pro",
    price: 14,
    interval: "Monat",
    description: "Für ambitionierte Spieler – 2× Training pro Woche.",
    features: [
      "2× Training pro Woche",
      "Freitags- und Hallentraining",
      "Zugang zu Vereinsturnieren",
      "Gemeinschaft & Teamgeist",
      "Leihausrüstung inklusive",
      "Bevorzugte Turnierplätze",
    ],
    highlighted: true,
  },
];

/* ------------------------------------------------------------------ */
/*  Mock player profiles                                               */
/* ------------------------------------------------------------------ */

export const mockPlayers: PlayerProfile[] = [
  {
    id: 1,
    documentId: "player-1",
    name: "Cassio",
    age: 23,
    rank: "Kapitän",
    position: "Schläger",
    profileImage: null,
    bio: "Gründer von Schlagball Hamburg und erfahrener Trainer mit über 8 Jahren Erfahrung im Sport. Cassio vereint technisches Können mit Leidenschaft für den Mannschaftssport.",
    slug: "cassio",
    createdAt: "2025-01-15T10:00:00.000Z",
    updatedAt: "2025-01-15T10:00:00.000Z",
  },
  {
    id: 2,
    documentId: "player-2",
    name: "Mateo",
    age: 19,
    rank: "Vize-Kapitän",
    position: "Fänger",
    profileImage: null,
    bio: "Leidenschaftlicher Schlagballer seit 8 Jahren und erfahrener Trainer. Mateo studiert Bewegungswissenschaften und bringt akademisches Wissen in das Training ein.",
    slug: "mateo",
    createdAt: "2025-01-15T10:00:00.000Z",
    updatedAt: "2025-01-15T10:00:00.000Z",
  },
  {
    id: 3,
    documentId: "player-3",
    name: "Lena Müller",
    age: 17,
    rank: "Stammspieler",
    position: "Läufer",
    profileImage: null,
    bio: "Schnell, wendig und taktisch klug – Lena ist eine der zuverlässigsten Läuferinnen im Team.",
    slug: "lena-mueller",
    createdAt: "2025-02-10T10:00:00.000Z",
    updatedAt: "2025-02-10T10:00:00.000Z",
  },
  {
    id: 4,
    documentId: "player-4",
    name: "Jonas Weber",
    age: 15,
    rank: "Stammspieler",
    position: "Schläger",
    profileImage: null,
    bio: "Jonas beeindruckt mit kraftvollen Weitschlägen und großem Einsatz auf dem Spielfeld.",
    slug: "jonas-weber",
    createdAt: "2025-03-01T10:00:00.000Z",
    updatedAt: "2025-03-01T10:00:00.000Z",
  },
  {
    id: 5,
    documentId: "player-5",
    name: "Sophie Braun",
    age: 14,
    rank: "Nachwuchs",
    position: "Fänger",
    profileImage: null,
    bio: "Seit einem Jahr dabei und schon ein fester Bestandteil des Teams. Sophie hat ein außergewöhnliches Auge für den Ball.",
    slug: "sophie-braun",
    createdAt: "2025-03-15T10:00:00.000Z",
    updatedAt: "2025-03-15T10:00:00.000Z",
  },
  {
    id: 6,
    documentId: "player-6",
    name: "Nico Fischer",
    age: 16,
    rank: "Stammspieler",
    position: "Läufer",
    profileImage: null,
    bio: "Der schnellste Läufer im Team. Nico punktet regelmäßig mit spektakulären Laufpunkten.",
    slug: "nico-fischer",
    createdAt: "2025-04-01T10:00:00.000Z",
    updatedAt: "2025-04-01T10:00:00.000Z",
  },
];

/* ------------------------------------------------------------------ */
/*  Mock blog posts                                                    */
/* ------------------------------------------------------------------ */

export const mockPosts: TrainingPost[] = [
  {
    id: 1,
    documentId: "post-1",
    title: "Saisonstart 2025 – Wir legen los!",
    slug: "saisonstart-2025",
    excerpt:
      "Die neue Saison beginnt und wir haben große Pläne. Erfahrt, was euch dieses Jahr erwartet.",
    content: `
# Saisonstart 2025

Die Winterpause ist vorbei und wir starten voller Energie in die neue Saison! Dieses Jahr haben wir einiges geplant:

## Was euch erwartet

- **Regelmäßiges Training** jeden Freitag von 14–16 Uhr
- **Hallentraining** donnerstags von 17–19 Uhr
- **Neue Trainingsmethoden** für alle Altersgruppen
- **Turniervorbereitungen** ab dem Frühjahr

## Neue Mitglieder willkommen

Wir freuen uns über jeden, der Schlagball ausprobieren möchte. Kommt einfach zu einem Probetraining vorbei – ihr braucht nur Sportkleidung und gute Laune!

Das erste Training der Saison findet am **Freitag, 10. Januar** statt. Wir sehen uns auf dem Platz!
    `.trim(),
    coverImage: null,
    gallery: [],
    publishedAt: "2025-01-08T12:00:00.000Z",
    category: "Verein",
    createdAt: "2025-01-08T12:00:00.000Z",
    updatedAt: "2025-01-08T12:00:00.000Z",
  },
  {
    id: 2,
    documentId: "post-2",
    title: "Rückblick: Winterhuder Herbstturnier 2024",
    slug: "herbstturnier-2024-rueckblick",
    excerpt:
      "Ein fantastisches Turnier liegt hinter uns. Hier kommt der ausführliche Rückblick mit allen Ergebnissen.",
    content: `
# Winterhuder Herbstturnier 2024

Was für ein Tag! Unser jährliches Herbstturnier war wieder ein voller Erfolg. Bei bestem Wetter haben sich 6 Teams auf dem Platz gemessen.

## Ergebnisse

Das Turnier war hart umkämpft und hat gezeigt, wie viel Talent in der Schlagball-Szene steckt. Wir danken allen teilnehmenden Teams für faire und spannende Spiele.

## Danke an alle Helfer

Ein besonderer Dank geht an alle Freiwilligen, die bei der Organisation geholfen haben. Ohne euch wäre dieses Turnier nicht möglich gewesen!

Wir freuen uns schon auf das Herbstturnier 2025!
    `.trim(),
    coverImage: null,
    gallery: [],
    publishedAt: "2024-10-05T14:00:00.000Z",
    category: "Turnier",
    createdAt: "2024-10-05T14:00:00.000Z",
    updatedAt: "2024-10-05T14:00:00.000Z",
  },
  {
    id: 3,
    documentId: "post-3",
    title: "Hallentraining: Was ihr wissen müsst",
    slug: "hallentraining-info",
    excerpt:
      "Alle Infos zum Hallentraining – Zeiten, Ort und was ihr mitbringen solltet.",
    content: `
# Hallentraining

In den kälteren Monaten trainieren wir zusätzlich in der Halle. Hier die wichtigsten Infos:

## Zeiten & Ort

- **Wann:** Donnerstags, 17–19 Uhr
- **Wo:** Meerweinstraße 26–28
- **Altersgruppe:** 8–17 Jahre

## Was mitbringen?

- Hallenschuhe (keine Straßenschuhe!)
- Sportkleidung
- Trinkflasche

## Besonderheiten

Das Hallentraining fokussiert sich stärker auf Technik, Koordination und Taktik. Es ist die perfekte Ergänzung zum Freilufttraining und hilft, auch im Winter fit und in Form zu bleiben.
    `.trim(),
    coverImage: null,
    gallery: [],
    publishedAt: "2024-11-15T10:00:00.000Z",
    category: "Training",
    createdAt: "2024-11-15T10:00:00.000Z",
    updatedAt: "2024-11-15T10:00:00.000Z",
  },
];

/* ------------------------------------------------------------------ */
/*  Mock calendar events                                               */
/* ------------------------------------------------------------------ */

export const mockEvents: TrainingEvent[] = [
  {
    id: 1,
    documentId: "event-1",
    title: "Freitagstraining",
    date: "2025-04-04",
    time: "14:00–16:00",
    location: "Meerweinstraße 26–28",
    description: "Reguläres Freitagstraining für alle Altersgruppen (8–25 Jahre).",
    type: "training",
    createdAt: "2025-01-01T00:00:00.000Z",
    updatedAt: "2025-01-01T00:00:00.000Z",
  },
  {
    id: 2,
    documentId: "event-2",
    title: "Hallentraining",
    date: "2025-04-03",
    time: "17:00–19:00",
    location: "Meerweinstraße 26–28",
    description: "Indoor-Training mit Fokus auf Technik und Koordination (8–17 Jahre).",
    type: "hallentraining",
    createdAt: "2025-01-01T00:00:00.000Z",
    updatedAt: "2025-01-01T00:00:00.000Z",
  },
  {
    id: 3,
    documentId: "event-3",
    title: "Freitagstraining",
    date: "2025-04-11",
    time: "14:00–16:00",
    location: "Meerweinstraße 26–28",
    description: null,
    type: "training",
    createdAt: "2025-01-01T00:00:00.000Z",
    updatedAt: "2025-01-01T00:00:00.000Z",
  },
  {
    id: 4,
    documentId: "event-4",
    title: "Hallentraining",
    date: "2025-04-10",
    time: "17:00–19:00",
    location: "Meerweinstraße 26–28",
    description: null,
    type: "hallentraining",
    createdAt: "2025-01-01T00:00:00.000Z",
    updatedAt: "2025-01-01T00:00:00.000Z",
  },
  {
    id: 5,
    documentId: "event-5",
    title: "Winterhuder Herbstturnier 2025",
    date: "2025-09-20",
    time: "10:00–18:00",
    location: "Meerweinstraße 26–28",
    description:
      "Unser jährliches Herbstturnier – ein Highlight im Schlagball-Kalender!",
    type: "turnier",
    createdAt: "2025-01-01T00:00:00.000Z",
    updatedAt: "2025-01-01T00:00:00.000Z",
  },
  {
    id: 6,
    documentId: "event-6",
    title: "Himmelfahrt Spiekeroog – Deutsche Meisterschaft",
    date: "2025-05-29",
    time: "ganztägig",
    location: "Spiekeroog",
    description:
      "Die Deutsche Meisterschaft im Schlagball auf Spiekeroog – Tradition seit Jahrzehnten.",
    type: "turnier",
    createdAt: "2025-01-01T00:00:00.000Z",
    updatedAt: "2025-01-01T00:00:00.000Z",
  },
  {
    id: 7,
    documentId: "event-7",
    title: "Kieler Woche – Schlagball-Turnier",
    date: "2025-06-21",
    time: "ganztägig",
    location: "Kiel",
    description: "Schlagball-Turnier im Rahmen der Kieler Woche.",
    type: "turnier",
    createdAt: "2025-01-01T00:00:00.000Z",
    updatedAt: "2025-01-01T00:00:00.000Z",
  },
  {
    id: 8,
    documentId: "event-8",
    title: "Saisoneröffnung & Tag der offenen Tür",
    date: "2025-04-25",
    time: "14:00–18:00",
    location: "Meerweinstraße 26–28",
    description:
      "Kommt vorbei und lernt unseren Verein kennen! Schnuppertraining für alle Altersgruppen.",
    type: "event",
    createdAt: "2025-01-01T00:00:00.000Z",
    updatedAt: "2025-01-01T00:00:00.000Z",
  },
];
