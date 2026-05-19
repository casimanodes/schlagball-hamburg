import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import ContentSection from "@/components/sections/ContentSection";
import SectionHeader from "@/components/sections/SectionHeader";
import CTASection from "@/components/sections/CTASection";
import RichText from "@/components/sections/RichText";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { getSportPage } from "@/lib/api";
import { resolveIcon } from "@/lib/icons";
import { ctaProps, heroProps, sectionHeaderProps } from "@/lib/block-helpers";

// ISR: Strapi-Daten werden alle 60 Sekunden im Hintergrund frisch geladen.
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Der Sport: Schlagball",
  description:
    "Alles über Schlagball – Regeln, Punktearten, Ausrüstung, Spielfeld und Turniere.",
};

export default async function SportPage() {
  const page = await getSportPage();

  return (
    <>
      <Hero {...heroProps(page.hero)} />

      {/* Overview */}
      <ContentSection>
        <div className="max-w-3xl mx-auto">
          <SectionHeader {...sectionHeaderProps(page.overviewHeader)} />
          <RichText
            content={page.overviewContent}
            className="prose prose-lg max-w-none text-muted-foreground"
          />
        </div>
      </ContentSection>

      {/* Rules / Points */}
      <ContentSection id="regeln" className="bg-muted/50">
        <SectionHeader {...sectionHeaderProps(page.pointsHeader)} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {page.points.map((pt) => {
            const Icon = resolveIcon(pt.icon);
            return (
              <Card key={pt.name} className="h-full">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold text-lg">{pt.name}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {pt.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </ContentSection>

      {/* Equipment */}
      <ContentSection id="ausruestung">
        <SectionHeader {...sectionHeaderProps(page.equipmentHeader)} />
        <div className="max-w-4xl mx-auto space-y-8">
          {page.equipmentCards.map((card) => {
            const Icon = resolveIcon(card.icon);
            return (
              <Card key={card.title}>
                <CardContent className="p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sport/10 text-sport">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold text-xl">{card.title}</h3>
                  </div>
                  <RichText
                    content={card.body}
                    className="text-muted-foreground space-y-2"
                  />
                  {card.badges && card.badges.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {card.badges.map((badge) => (
                        <Badge key={badge} variant="secondary">
                          {badge}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </ContentSection>

      {/* Playing field */}
      <ContentSection id="spielfeld" className="bg-muted/50">
        <SectionHeader {...sectionHeaderProps(page.fieldHeader)} />
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardContent className="p-6 md:p-8">
              <RichText
                content={page.fieldContent}
                className="prose prose-lg max-w-none text-muted-foreground"
              />
              {page.fieldBadges && page.fieldBadges.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {page.fieldBadges.map((badge) => (
                    <Badge key={badge} variant="secondary">
                      {badge}
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </ContentSection>

      {/* Tournaments */}
      <ContentSection id="turniere">
        <SectionHeader {...sectionHeaderProps(page.tournamentsHeader)} />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {page.tournaments.map((tournament) => (
            <Card key={tournament.title} className="text-center">
              <CardContent className="p-6">
                <p className="text-lg font-semibold text-sport mb-1">
                  {tournament.period}
                </p>
                <h3 className="font-bold text-lg">{tournament.title}</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  {tournament.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </ContentSection>

      {/* FAQ */}
      <ContentSection className="bg-muted/50">
        <SectionHeader {...sectionHeaderProps(page.faqHeader)} />
        <div className="max-w-2xl mx-auto">
          <Accordion className="w-full">
            {page.faqs.map((faq, idx) => (
              <AccordionItem key={faq.question} value={`faq-${idx}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </ContentSection>

      <CTASection {...ctaProps(page.cta)} />
    </>
  );
}
