import type { Metadata } from "next";
import {
  Clock,
  MapPin,
  Users,
  Sun,
  Building2,
  CalendarDays,
} from "lucide-react";
import Hero from "@/components/sections/Hero";
import ContentSection from "@/components/sections/ContentSection";
import SectionHeader from "@/components/sections/SectionHeader";
import CTASection from "@/components/sections/CTASection";
import EventCard from "@/components/cards/EventCard";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/lib/button-variants";
import Link from "next/link";
import { getUpcomingEvents } from "@/lib/api";

export const metadata: Metadata = {
  title: "Training",
  description:
    "Trainingszeiten, Standorte und Informationen zum Probetraining bei Schlagball Hamburg.",
};

const trainingSessions = [
  {
    title: "Haupttraining (Freitag)",
    icon: Sun,
    day: "Freitags",
    time: "14:00 – 16:00 Uhr",
    location: "Meerweinstraße 26–28, Hamburg",
    ageRange: "8–25 Jahre",
    description:
      "Unser reguläres Freitagstraining im Freien. Hier trainieren alle Altersgruppen gemeinsam – von Anfängern bis zu erfahrenen Spielern.",
    features: [
      "Technik & Taktik",
      "Spielpraxis",
      "Mannschaftsaufstellung",
      "Turniervorbereitungen",
    ],
  },
  {
    title: "Hallentraining (Donnerstag)",
    icon: Building2,
    day: "Donnerstags",
    time: "17:00 – 19:00 Uhr",
    location: "Meerweinstraße 26–28, Hamburg",
    ageRange: "8–17 Jahre",
    description:
      "Indoor-Training mit Fokus auf Technik, Koordination und Taktik. Die perfekte Ergänzung zum Freilufttraining.",
    features: [
      "Techniktraining",
      "Koordination",
      "Kondition",
      "Taktische Übungen",
    ],
  },
];

export default async function TrainingPage() {
  const upcomingEvents = await getUpcomingEvents(6);

  return (
    <>
      <Hero
        subtitle="Training"
        title="Trainiere mit uns"
        description="Regelmäßiges Training für alle Altersgruppen – komm vorbei und werde Teil des Teams."
        primaryAction={{
          label: "Probetraining anfragen",
          href: "/mitgliedschaft#anmeldung",
        }}
      />

      {/* Training sessions */}
      <ContentSection>
        <SectionHeader
          overline="Trainingszeiten"
          title="Unsere Trainingseinheiten"
          description="Zwei Trainingseinheiten pro Woche – drinnen und draußen."
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {trainingSessions.map((session) => {
            const Icon = session.icon;
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

      {/* Trial training */}
      <ContentSection className="bg-muted/50">
        <div className="max-w-3xl mx-auto text-center">
          <SectionHeader
            overline="Probetraining"
            title="Einfach vorbeikommen!"
            description="Du möchtest Schlagball ausprobieren? Kein Problem – komm einfach zu einem Freitagstraining vorbei."
          />
          <div className="prose prose-lg mx-auto text-muted-foreground">
            <p>
              Ein Probetraining ist <strong>kostenlos und unverbindlich</strong>.
              Du brauchst nur Sportkleidung und Sportschuhe – die Ausrüstung
              stellen wir.
            </p>
            <p>
              Wir trainieren jeden Freitag von 14 bis 16 Uhr auf dem Platz an
              der Meerweinstraße 26–28 in Hamburg. Einfach vorbeikommen und
              mitmachen!
            </p>
          </div>
          <div className="mt-6">
            <Link href="/mitgliedschaft" className={buttonVariants({ size: "lg" })}>
              Mitglied werden
            </Link>
          </div>
        </div>
      </ContentSection>

      {/* Upcoming training dates */}
      {upcomingEvents.length > 0 && (
        <ContentSection>
          <SectionHeader
            overline="Termine"
            title="Nächste Trainingstage"
            description="Die kommenden Termine im Überblick."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/kalender" className={buttonVariants({ variant: "outline" })}>
              Alle Termine ansehen
            </Link>
          </div>
        </ContentSection>
      )}

      <CTASection
        variant="sport"
        title="Bereit für dein erstes Training?"
        description="Melde dich an oder komm einfach freitags von 14 bis 16 Uhr vorbei."
        primaryAction={{
          label: "Jetzt Mitglied werden",
          href: "/mitgliedschaft",
        }}
      />
    </>
  );
}
