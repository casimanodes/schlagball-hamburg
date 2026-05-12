import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import ContentSection from "@/components/sections/ContentSection";
import SectionHeader from "@/components/sections/SectionHeader";
import RichText from "@/components/sections/RichText";
import { getPrivacyPage } from "@/lib/api";
import { heroProps } from "@/lib/block-helpers";

export const metadata: Metadata = {
  title: "Datenschutz",
  description:
    "Datenschutzerklärung von Schlagball Hamburg e.V. – Informationen zum Umgang mit Ihren Daten.",
};

export default async function DatenschutzPage() {
  const page = await getPrivacyPage();

  return (
    <>
      <Hero {...heroProps(page.hero)} />

      {page.sections.map((section, idx) => (
        <ContentSection
          key={`${section.title}-${idx}`}
          className={section.background === "muted" ? "bg-muted/50" : undefined}
        >
          <div className="max-w-3xl mx-auto">
            <SectionHeader
              overline={section.overline ?? undefined}
              title={section.title}
            />
            <RichText
              content={section.body}
              className="prose prose-lg max-w-none text-muted-foreground"
            />
          </div>
        </ContentSection>
      ))}
    </>
  );
}
