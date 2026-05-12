import type { Metadata } from "next";
import { CalendarDays } from "lucide-react";
import Hero from "@/components/sections/Hero";
import ContentSection from "@/components/sections/ContentSection";
import EmptyState from "@/components/sections/EmptyState";
import { getEvents, getCalendarPage } from "@/lib/api";
import { heroProps } from "@/lib/block-helpers";
import CalendarFilter from "./CalendarFilter";

export const metadata: Metadata = {
  title: "Kalender & Termine",
  description:
    "Alle Trainingstage, Turniere und Veranstaltungen von Schlagball Hamburg im Überblick.",
};

export default async function CalendarPage() {
  const [page, events] = await Promise.all([getCalendarPage(), getEvents()]);

  const now = new Date().toISOString().split("T")[0];
  const upcoming = events.filter((e) => e.date >= now);
  const past = events.filter((e) => e.date < now);

  return (
    <>
      <Hero {...heroProps(page.hero)} />

      <ContentSection>
        {events.length > 0 ? (
          <CalendarFilter
            upcoming={upcoming}
            past={past}
            labels={{
              upcomingTabLabel: page.upcomingTabLabel,
              pastTabLabel: page.pastTabLabel,
              filterAllLabel: page.filterAllLabel,
            }}
          />
        ) : (
          <EmptyState
            icon={CalendarDays}
            title={page.emptyState.title}
            description={page.emptyState.description}
          />
        )}
      </ContentSection>
    </>
  );
}
