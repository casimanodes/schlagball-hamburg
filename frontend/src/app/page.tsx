import {
  Users,
  Trophy,
  Clock,
  Volleyball,
} from "lucide-react";
import Hero from "@/components/sections/Hero";
import StatsSection from "@/components/sections/StatsSection";
import SectionHeader from "@/components/sections/SectionHeader";
import ContentSection from "@/components/sections/ContentSection";
import FeatureGrid from "@/components/sections/FeatureGrid";
import CTASection from "@/components/sections/CTASection";
import BlogCard from "@/components/cards/BlogCard";
import EventCard from "@/components/cards/EventCard";
import { getPosts, getUpcomingEvents } from "@/lib/api";
import type { FeatureItem } from "@/components/sections/FeatureGrid";

const features: FeatureItem[] = [
  {
    title: "Der Sport",
    description:
      "Schlagball kombiniert Elemente aus Baseball, Brennball und Völkerball – ein einzigartiges Spielerlebnis.",
    icon: Volleyball,
    href: "/sport",
  },
  {
    title: "Training",
    description:
      "Regelmäßiges Training für alle Altersgruppen – freitags im Freien und donnerstags in der Halle.",
    icon: Clock,
    href: "/training",
  },
  {
    title: "Gemeinschaft",
    description:
      "Ein starkes Team mit erfahrenen Trainern, das Spaß und sportliche Entwicklung verbindet.",
    icon: Users,
    href: "/ueber-uns",
  },
  {
    title: "Turniere",
    description:
      "Vom Winterhuder Herbstturnier bis zur Deutschen Meisterschaft – wir sind dabei.",
    icon: Trophy,
    href: "/sport#turniere",
  },
];

const stats = [
  { value: "5+", label: "Jahre Training" },
  { value: "8–25", label: "Altersgruppe" },
  { value: "2×", label: "Training pro Woche" },
  { value: "3+", label: "Turniere pro Jahr" },
];

export default async function HomePage() {
  const [posts, events] = await Promise.all([
    getPosts(),
    getUpcomingEvents(4),
  ]);

  const latestPosts = posts.slice(0, 3);

  return (
    <>
      {/* Hero */}
      <Hero
        large
        subtitle="Schlagball Hamburg e.V."
        title="Willkommen bei Schlagball Hamburg"
        description="Erlebe den einzigartigen Mannschaftssport – Training, Turniere und Gemeinschaft in Hamburg. Für alle von 8 bis 25 Jahren."
        primaryAction={{ label: "Probetraining vereinbaren", href: "/training" }}
        secondaryAction={{ label: "Mehr erfahren", href: "/sport" }}
      />

      {/* Stats */}
      <StatsSection stats={stats} />

      {/* Feature cards */}
      <ContentSection>
        <SectionHeader
          overline="Unser Angebot"
          title="Vielfalt in Training & Wettkampf"
          description="Von regelmäßigem Training bis zu überregionalen Turnieren – entdecke, was Schlagball Hamburg zu bieten hat."
        />
        <FeatureGrid items={features} />
      </ContentSection>

      {/* Upcoming Events */}
      {events.length > 0 && (
        <ContentSection className="bg-muted/50">
          <SectionHeader
            overline="Kalender"
            title="Nächste Termine"
            description="Trainingseinheiten, Turniere und Veranstaltungen auf einen Blick."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </ContentSection>
      )}

      {/* Latest blog posts */}
      {latestPosts.length > 0 && (
        <ContentSection>
          <SectionHeader
            overline="Aktuelles"
            title="Neuigkeiten aus dem Verein"
            description="Rückblicke, Ankündigungen und Einblicke in unseren Trainingsalltag."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </ContentSection>
      )}

      {/* CTA */}
      <CTASection
        title="Bereit für Schlagball?"
        description="Komm zum Probetraining vorbei – kostenlos und unverbindlich. Du brauchst nur Sportkleidung und gute Laune!"
        primaryAction={{
          label: "Mitglied werden",
          href: "/mitgliedschaft",
        }}
        secondaryAction={{
          label: "Training ansehen",
          href: "/training",
        }}
      />
    </>
  );
}
