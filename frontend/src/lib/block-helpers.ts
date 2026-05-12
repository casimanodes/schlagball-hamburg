/**
 * Hilfsfunktionen, die Strapi-Components in Props der bestehenden
 * UI-Komponenten umwandeln. Optionale Felder werden in `undefined`
 * konvertiert, statt `null`-Werte ungeprüft weiterzureichen.
 */

import type { HeroBlock, CtaBlock, SectionHeaderBlock } from "@/types/pages";

interface ActionPair {
  primaryAction?: { label: string; href: string };
  secondaryAction?: { label: string; href: string };
}

function buildActionPair(
  primaryLabel: string | null | undefined,
  primaryHref: string | null | undefined,
  secondaryLabel: string | null | undefined,
  secondaryHref: string | null | undefined,
): ActionPair {
  const out: ActionPair = {};
  if (primaryLabel && primaryHref) {
    out.primaryAction = { label: primaryLabel, href: primaryHref };
  }
  if (secondaryLabel && secondaryHref) {
    out.secondaryAction = { label: secondaryLabel, href: secondaryHref };
  }
  return out;
}

export function heroProps(block: HeroBlock) {
  return {
    title: block.title,
    subtitle: block.subtitle ?? undefined,
    description: block.description ?? undefined,
    large: block.large ?? false,
    ...buildActionPair(
      block.primaryActionLabel,
      block.primaryActionHref,
      block.secondaryActionLabel,
      block.secondaryActionHref,
    ),
  };
}

export function ctaProps(block: CtaBlock) {
  const actions = buildActionPair(
    block.primaryActionLabel,
    block.primaryActionHref,
    block.secondaryActionLabel,
    block.secondaryActionHref,
  );
  return {
    title: block.title,
    description: block.description,
    variant: block.variant,
    primaryAction: actions.primaryAction ?? {
      label: block.primaryActionLabel,
      href: block.primaryActionHref,
    },
    secondaryAction: actions.secondaryAction,
  };
}

export function sectionHeaderProps(block: SectionHeaderBlock) {
  return {
    title: block.title,
    overline: block.overline ?? undefined,
    description: block.description ?? undefined,
  };
}
