"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EventCard from "@/components/cards/EventCard";
import SectionHeader from "@/components/sections/SectionHeader";
import type { TrainingEvent, TrainingEventType } from "@/types";

const filterTypes: { value: TrainingEventType | "all"; label: string }[] = [
  { value: "all", label: "Alle" },
  { value: "training", label: "Training" },
  { value: "hallentraining", label: "Hallentraining" },
  { value: "turnier", label: "Turnier" },
  { value: "event", label: "Event" },
];

interface CalendarFilterProps {
  upcoming: TrainingEvent[];
  past: TrainingEvent[];
}

export default function CalendarFilter({
  upcoming,
  past,
}: CalendarFilterProps) {
  const [filter, setFilter] = useState<TrainingEventType | "all">("all");

  const filteredUpcoming =
    filter === "all"
      ? upcoming
      : upcoming.filter((e) => e.type === filter);

  const filteredPast =
    filter === "all"
      ? past
      : past.filter((e) => e.type === filter);

  return (
    <>
      {/* Filter */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {filterTypes.map((ft) => (
          <Badge
            key={ft.value}
            variant={filter === ft.value ? "default" : "outline"}
            className="cursor-pointer text-sm px-4 py-1.5 transition-colors"
            onClick={() => setFilter(ft.value)}
          >
            {ft.label}
          </Badge>
        ))}
      </div>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="w-full max-w-xs mx-auto grid grid-cols-2 mb-8">
          <TabsTrigger value="upcoming">
            Kommende ({filteredUpcoming.length})
          </TabsTrigger>
          <TabsTrigger value="past">
            Vergangene ({filteredPast.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming">
          {filteredUpcoming.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {filteredUpcoming.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-8">
              Keine kommenden Termine in dieser Kategorie.
            </p>
          )}
        </TabsContent>

        <TabsContent value="past">
          {filteredPast.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {filteredPast.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-8">
              Keine vergangenen Termine in dieser Kategorie.
            </p>
          )}
        </TabsContent>
      </Tabs>
    </>
  );
}
