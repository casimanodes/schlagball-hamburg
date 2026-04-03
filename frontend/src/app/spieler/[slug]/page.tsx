import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/lib/button-variants";
import ContentSection from "@/components/sections/ContentSection";
import { getPlayerBySlug, getPlayers } from "@/lib/api";
import { strapiImageUrl } from "@/lib/strapi";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const players = await getPlayers();
  return players.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const player = await getPlayerBySlug(slug);
  if (!player) return { title: "Spieler nicht gefunden" };
  return {
    title: player.name,
    description: player.bio ?? `Spielerprofil von ${player.name} bei Schlagball Hamburg.`,
  };
}

export default async function PlayerDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const player = await getPlayerBySlug(slug);

  if (!player) notFound();

  const initials = player.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <ContentSection>
      <div className="max-w-3xl mx-auto">
        {/* Back link */}
        <Link
          href="/spieler"
          className={buttonVariants({ variant: "ghost", size: "sm", className: "mb-8" })}
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Alle Spieler
        </Link>

        {/* Profile */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
          <Avatar className="h-32 w-32 ring-4 ring-border">
            {player.profileImage ? (
              <AvatarImage
                src={strapiImageUrl(player.profileImage.url)}
                alt={player.name}
              />
            ) : null}
            <AvatarFallback className="text-3xl font-bold bg-primary text-primary-foreground">
              {initials}
            </AvatarFallback>
          </Avatar>

          <div className="text-center sm:text-left flex-1">
            <h1 className="text-3xl font-bold">{player.name}</h1>
            <p className="text-lg text-muted-foreground mt-1">
              {player.position}
            </p>
            <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-3">
              <Badge variant="secondary">{player.rank}</Badge>
              <Badge variant="outline">{player.age} Jahre</Badge>
            </div>
          </div>
        </div>

        {/* Bio */}
        {player.bio && (
          <div className="mt-10">
            <h2 className="text-xl font-semibold mb-3">Über {player.name}</h2>
            <p className="text-muted-foreground leading-relaxed">
              {player.bio}
            </p>
          </div>
        )}
      </div>
    </ContentSection>
  );
}
