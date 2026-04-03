import type { NavItem } from "@/types";

export const SITE_NAME = "Schlagball Hamburg";
export const SITE_DESCRIPTION =
  "Schlagball Hamburg e.V. – Der Verein für Schlagball in Hamburg. Training, Turniere und Gemeinschaft.";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const CONTACT_EMAIL = "info@schlagball-hamburg.de";
export const INSTAGRAM_HANDLE = "schlagball.winterhude";
export const INSTAGRAM_URL = `https://instagram.com/${INSTAGRAM_HANDLE}`;

export const NAV_ITEMS: NavItem[] = [
  { label: "Startseite", href: "/" },
  { label: "Über uns", href: "/ueber-uns" },
  {
    label: "Der Sport",
    href: "/sport",
    children: [
      { label: "Übersicht", href: "/sport" },
      { label: "Regeln", href: "/sport#regeln" },
      { label: "Ausrüstung", href: "/sport#ausruestung" },
      { label: "Spielfeld", href: "/sport#spielfeld" },
      { label: "Turniere", href: "/sport#turniere" },
    ],
  },
  { label: "Training", href: "/training" },
  { label: "Mitgliedschaft", href: "/mitgliedschaft" },
  { label: "Spieler", href: "/spieler" },
  { label: "Blog", href: "/blog" },
  { label: "Kalender", href: "/kalender" },
];

export const TRAINING_ADDRESS = "Meerweinstraße 26–28, Hamburg";
