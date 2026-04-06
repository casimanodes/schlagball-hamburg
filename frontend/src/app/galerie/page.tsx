import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import ContentSection from "@/components/sections/ContentSection";
import SectionHeader from "@/components/sections/SectionHeader";
import CTASection from "@/components/sections/CTASection";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import { getGalleryItems } from "@/lib/api";

export const metadata: Metadata = {
  title: "Galerie",
  description:
    "Bilder und Eindrücke aus Training, Turnieren und dem Vereinsleben von Schlagball Hamburg.",
};

export default async function GaleriePage() {
  const items = await getGalleryItems();

  return (
    <>
      <Hero
        subtitle="Galerie"
        title="Bilder & Eindrücke"
        description="Training, Turniere und Vereinsleben – erlebe Schlagball Hamburg in Bildern."
      />

      <ContentSection>
        <SectionHeader
          overline="Fotogalerie"
          title="Unsere schönsten Momente"
          description="Durchstöbere unsere Bilder nach Kategorie oder lass dich einfach inspirieren."
        />
        <GalleryGrid items={items} />
      </ContentSection>

      <CTASection
        variant="sport"
        title="Sei beim nächsten Foto dabei!"
        description="Werde Teil des Teams und erlebe Schlagball hautnah."
        primaryAction={{
          label: "Jetzt Mitglied werden",
          href: "/mitgliedschaft",
        }}
        secondaryAction={{
          label: "Trainingszeiten ansehen",
          href: "/training",
        }}
      />
    </>
  );
}
