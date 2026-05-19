import type { Metadata } from "next";
import { Mail, Phone } from "lucide-react";
import Hero from "@/components/sections/Hero";
import ContentSection from "@/components/sections/ContentSection";
import SectionHeader from "@/components/sections/SectionHeader";
import RichText from "@/components/sections/RichText";
import { getImprintPage } from "@/lib/api";
import { heroProps, sectionHeaderProps } from "@/lib/block-helpers";

// ISR: Strapi-Daten werden alle 60 Sekunden im Hintergrund frisch geladen.
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum und rechtliche Angaben von Schlagball Hamburg e.V.",
};

export default async function ImpressumPage() {
  const page = await getImprintPage();

  return (
    <>
      <Hero {...heroProps(page.hero)} />

      <ContentSection>
        <div className="max-w-3xl mx-auto">
          <SectionHeader {...sectionHeaderProps(page.vereinsangabenHeader)} />
          <RichText
            content={page.vereinsangaben}
            className="prose prose-lg max-w-none text-muted-foreground"
          />
        </div>
      </ContentSection>

      <ContentSection className="bg-muted/50">
        <div className="max-w-3xl mx-auto">
          <SectionHeader {...sectionHeaderProps(page.kontaktHeader)} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {page.kontakte.map((person) => (
              <div
                key={person.name}
                className="rounded-lg border bg-background p-6 space-y-3"
              >
                <h3 className="font-semibold text-lg">
                  {person.name}
                  <span className="block text-sm font-normal text-muted-foreground">
                    {person.role}
                  </span>
                </h3>
                {person.email && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4 text-accent" />
                    <a
                      href={`mailto:${person.email}`}
                      className="hover:text-foreground transition-colors"
                    >
                      {person.email}
                    </a>
                  </div>
                )}
                {person.phone && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4 text-accent" />
                    <a
                      href={`tel:${person.phoneHref ?? person.phone}`}
                      className="hover:text-foreground transition-colors"
                    >
                      {person.phone}
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </ContentSection>

      {page.haftungSections.length > 0 && (
        <ContentSection>
          <div className="max-w-3xl mx-auto">
            {page.haftungSections.length > 0 && (
              <SectionHeader
                overline={page.haftungSections[0].overline ?? undefined}
                title="Haftungsausschluss"
              />
            )}
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
              {page.haftungSections.map((section) => (
                <div key={section.title}>
                  <h3 className="text-foreground">{section.title}</h3>
                  <RichText content={section.body} />
                </div>
              ))}
            </div>
          </div>
        </ContentSection>
      )}
    </>
  );
}
