import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import ContentSection from "@/components/sections/ContentSection";
import SectionHeader from "@/components/sections/SectionHeader";
import CTASection from "@/components/sections/CTASection";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import { getGalleryItems, getGalleryPage } from "@/lib/api";
import { ctaProps, heroProps, sectionHeaderProps } from "@/lib/block-helpers";

export const metadata: Metadata = {
  title: "Galerie",
  description:
    "Bilder und Eindrücke aus Training, Turnieren und dem Vereinsleben von Schlagball Hamburg.",
};

export default async function GaleriePage() {
  const [page, items] = await Promise.all([
    getGalleryPage(),
    getGalleryItems(),
  ]);

  return (
    <>
      <Hero {...heroProps(page.hero)} />

      <ContentSection>
        <SectionHeader {...sectionHeaderProps(page.sectionHeader)} />
        <GalleryGrid items={items} />
      </ContentSection>

      <CTASection {...ctaProps(page.cta)} />
    </>
  );
}
