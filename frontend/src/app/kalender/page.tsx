import type { Metadata } from "next";
import { CalendarDays } from "lucide-react";
import Hero from "@/components/sections/Hero";
import ContentSection from "@/components/sections/ContentSection";
import SectionHeader from "@/components/sections/SectionHeader";
import EmptyState from "@/components/sections/EmptyState";
import EventCard from "@/components/cards/EventCard";
import { Badge } from "@/components/ui/badge";
import { getEvents } from "@/lib/api";
import type { TrainingEventType } from "@/types";
import CalendarFilter from "./CalendarFilter";

export const metadata: Metadata = {
  title: "Kalender & Termine",
  description:
    "Alle Trainingstage, Turniere und Veranstaltungen von Schlagball Hamburg im Überblick.",
};

export default async function CalendarPage() {
  const events = await getEvents();

  const now = new Date().toISOString().split("T")[0];
  const upcoming = events.filter((e) => e.date >= now);
  const past = events.filter((e) => e.date < now);

  return (
    <>
      <Hero
        subtitle="Termine"
        title="Kalender"
        description="Trainingstage, Turniere und Veranstaltungen – alle Termine auf einen Blick."
      />

      <ContentSection>
        {events.length > 0 ? (
          <CalendarFilter upcoming={upcoming} past={past} />
        ) : (
          <EmptyState
            icon={CalendarDays}
            title="Noch keine Termine"
            description="Termine werden über das CMS gepflegt und erscheinen hier automatisch."
          />
        )}
      </ContentSection>
    </>
  );
}
