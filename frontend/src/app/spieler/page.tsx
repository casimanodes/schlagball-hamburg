import type { Metadata } from "next";
import { Users } from "lucide-react";
import Hero from "@/components/sections/Hero";
import ContentSection from "@/components/sections/ContentSection";
import SectionHeader from "@/components/sections/SectionHeader";
import EmptyState from "@/components/sections/EmptyState";
import PlayerCard from "@/components/cards/PlayerCard";
import { getPlayers } from "@/lib/api";

export const metadata: Metadata = {
  title: "Spieler",
  description: "Lerne die Spielerinnen und Spieler von Schlagball Hamburg kennen.",
};

export default async function PlayersPage() {
  const players = await getPlayers();

  return (
    <>
      <Hero
        subtitle="Unser Team"
        title="Unsere Spieler"
        description="Die Spielerinnen und Spieler, die Schlagball Hamburg ausmachen – mit Leidenschaft und Teamgeist."
      />

      <ContentSection>
        {players.length > 0 ? (
          <>
            <SectionHeader
              overline="Mannschaft"
              title="Alle Spieler"
              description={`${players.length} aktive Spielerinnen und Spieler`}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {players.map((player) => (
                <PlayerCard key={player.id} player={player} />
              ))}
            </div>
          </>
        ) : (
          <EmptyState
            icon={Users}
            title="Noch keine Spielerprofile"
            description="Spielerprofile werden über das CMS gepflegt und erscheinen hier, sobald sie angelegt wurden."
          />
        )}
      </ContentSection>
    </>
  );
}
