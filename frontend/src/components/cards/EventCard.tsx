import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import type { TrainingEvent, TrainingEventType } from "@/types";

interface EventCardProps {
  event: TrainingEvent;
  compact?: boolean;
}

const typeConfig: Record<
  TrainingEventType,
  { label: string; color: string }
> = {
  training: { label: "Training", color: "bg-accent/10 text-accent" },
  hallentraining: {
    label: "Hallentraining",
    color: "bg-blue-100 text-blue-700",
  },
  turnier: { label: "Turnier", color: "bg-sport/10 text-sport" },
  event: { label: "Event", color: "bg-purple-100 text-purple-700" },
};

export default function EventCard({ event, compact }: EventCardProps) {
  const dateObj = new Date(event.date + "T00:00:00");
  const dayName = dateObj.toLocaleDateString("de-DE", { weekday: "short" });
  const day = dateObj.getDate();
  const month = dateObj.toLocaleDateString("de-DE", { month: "short" });

  const config = typeConfig[event.type];

  return (
    <Card
      className={cn(
        "overflow-hidden transition-all hover:shadow-md",
        compact && "border-0 shadow-none bg-transparent",
      )}
    >
      <CardContent className={cn("flex gap-4", compact ? "p-2" : "p-4")}>
        {/* Date badge */}
        <div className="flex flex-col items-center justify-center min-w-[56px] rounded-lg bg-primary/5 p-2">
          <span className="text-xs font-medium text-muted-foreground uppercase">
            {dayName}
          </span>
          <span className="text-2xl font-bold text-primary leading-none">
            {day}
          </span>
          <span className="text-xs text-muted-foreground">{month}</span>
        </div>

        {/* Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-sm truncate">{event.title}</h3>
            <Badge
              variant="secondary"
              className={cn("text-xs shrink-0", config.color)}
            >
              {config.label}
            </Badge>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {event.time}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {event.location}
            </span>
          </div>
          {!compact && event.description && (
            <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
              {event.description}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
