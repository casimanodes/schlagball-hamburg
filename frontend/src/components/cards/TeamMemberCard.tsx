import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { strapiImageUrl } from "@/lib/strapi";
import type { TeamMember } from "@/types";

interface TeamMemberCardProps {
  member: TeamMember;
}

export default function TeamMemberCard({ member }: TeamMemberCardProps) {
  const initials = member.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row gap-5">
          <Avatar className="h-20 w-20 ring-2 ring-border shrink-0">
            {member.image ? (
              <AvatarImage
                src={strapiImageUrl(member.image.url)}
                alt={member.name}
              />
            ) : null}
            <AvatarFallback className="text-lg font-bold bg-primary text-primary-foreground">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-lg">{member.name}</h3>
            <p className="text-sm text-accent font-medium">{member.role}</p>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
              {member.description}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
