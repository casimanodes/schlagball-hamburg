import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { strapiImageUrl } from "@/lib/strapi";
import type { PlayerProfile } from "@/types";

interface PlayerCardProps {
  player: PlayerProfile;
}

export default function PlayerCard({ player }: PlayerCardProps) {
  const initials = player.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <Link href={`/spieler/${player.slug}`} className="block group">
      <Card className="h-full overflow-hidden transition-all hover:shadow-lg hover:border-accent/30">
        <CardContent className="p-6 flex flex-col items-center text-center">
          <Avatar className="h-24 w-24 mb-4 ring-2 ring-border group-hover:ring-accent transition-all">
            {player.profileImage ? (
              <AvatarImage
                src={strapiImageUrl(player.profileImage.url)}
                alt={player.name}
              />
            ) : null}
            <AvatarFallback className="text-xl font-bold bg-primary text-primary-foreground">
              {initials}
            </AvatarFallback>
          </Avatar>
          <h3 className="font-semibold text-lg">{player.name}</h3>
          <p className="text-sm text-muted-foreground mt-0.5">
            {player.position}
          </p>
          <div className="flex gap-2 mt-3">
            <Badge variant="secondary" className="text-xs">
              {player.rank}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {player.age} Jahre
            </Badge>
          </div>
          {player.bio && (
            <p className="text-sm text-muted-foreground mt-3 line-clamp-2">
              {player.bio}
            </p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
