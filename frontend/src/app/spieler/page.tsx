import type { Metadata } from "next";
import { Users } from "lucide-react";
import Hero from "@/components/sections/Hero";
import ContentSection from "@/components/sections/ContentSection";
import SectionHeader from "@/components/sections/SectionHeader";
import EmptyState from "@/components/sections/EmptyState";
import PlayerCard from "@/components/cards/PlayerCard";
import { getPlayers, getPlayersPage } from "@/lib/api";
import { heroProps, sectionHeaderProps } from "@/lib/block-helpers";

// ISR: Strapi-Daten werden alle 60 Sekunden im Hintergrund frisch geladen.
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Spieler",
  description: "Lerne die Spielerinnen und Spieler von Schlagball Hamburg kennen.",
};

export default async function PlayersPage() {
  const [page, players] = await Promise.all([getPlayersPage(), getPlayers()]);

  return (
    <>
      <Hero {...heroProps(page.hero)} />

      <ContentSection>
        {players.length > 0 ? (
          <>
            <SectionHeader
              {...sectionHeaderProps(page.sectionHeader)}
              description={`${players.length} ${page.playerCountSuffix}`}
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
            title={page.emptyState.title}
            description={page.emptyState.description}
          />
        )}
      </ContentSection>
    </>
  );
}
