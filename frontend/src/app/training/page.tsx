import type { Metadata } from "next";
import { Clock, MapPin, Users, CalendarDays } from "lucide-react";
import Hero from "@/components/sections/Hero";
import ContentSection from "@/components/sections/ContentSection";
import SectionHeader from "@/components/sections/SectionHeader";
import CTASection from "@/components/sections/CTASection";
import RichText from "@/components/sections/RichText";
import EventCard from "@/components/cards/EventCard";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/lib/button-variants";
import Link from "next/link";
import { getUpcomingEvents, getTrainingPage } from "@/lib/api";
import { resolveIcon } from "@/lib/icons";
import { ctaProps, heroProps, sectionHeaderProps } from "@/lib/block-helpers";

// ISR: Strapi-Daten werden alle 60 Sekunden im Hintergrund frisch geladen.
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Training",
  description:
    "Trainingszeiten, Standorte und Informationen zum Probetraining bei Schlagball Hamburg.",
};

export default async function TrainingPage() {
  const [page, upcomingEvents] = await Promise.all([
    getTrainingPage(),
    getUpcomingEvents(6),
  ]);

  return (
    <>
      <Hero {...heroProps(page.hero)} />

      <ContentSection>
        <SectionHeader {...sectionHeaderProps(page.sessionsHeader)} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {page.sessions.map((session) => {
            const Icon = resolveIcon(session.icon);
            return (
              <Card key={session.title} className="overflow-hidden">
                <div className="h-2 bg-accent" />
                <CardContent className="p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl">{session.title}</h3>
                      <Badge variant="secondary">{session.ageRange}</Badge>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-4">
                    {session.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <CalendarDays className="h-4 w-4 text-accent" />
                      <span className="font-medium">{session.day}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-accent" />
                      <span>{session.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-accent" />
                      <span>{session.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4 text-accent" />
                      <span>{session.ageRange}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {session.features.map((f) => (
                      <Badge key={f} variant="outline" className="text-xs">
                        {f}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </ContentSection>

      <ContentSection className="bg-muted/50">
        <div className="max-w-3xl mx-auto text-center">
          <SectionHeader {...sectionHeaderProps(page.trialHeader)} />
          <RichText
            content={page.trialContent}
            className="prose prose-lg mx-auto text-muted-foreground"
          />
          {page.trialButtonLabel && page.trialButtonHref && (
            <div className="mt-6">
              <Link
                href={page.trialButtonHref}
                className={buttonVariants({ size: "lg" })}
              >
                {page.trialButtonLabel}
              </Link>
            </div>
          )}
        </div>
      </ContentSection>

      {upcomingEvents.length > 0 && (
        <ContentSection>
          <SectionHeader {...sectionHeaderProps(page.eventsHeader)} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
          {page.eventsAllLinkLabel && (
            <div className="text-center mt-8">
              <Link
                href="/kalender"
                className={buttonVariants({ variant: "outline" })}
              >
                {page.eventsAllLinkLabel}
              </Link>
            </div>
          )}
        </ContentSection>
      )}

      <CTASection {...ctaProps(page.cta)} />
    </>
  );
}
