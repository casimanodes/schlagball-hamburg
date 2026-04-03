import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface FeatureItem {
  title: string;
  description: string;
  icon: LucideIcon;
  href?: string;
}

interface FeatureGridProps {
  items: FeatureItem[];
  columns?: 2 | 3 | 4;
  className?: string;
}

export default function FeatureGrid({
  items,
  columns = 4,
  className,
}: FeatureGridProps) {
  const colsClass = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-6",
        colsClass[columns],
        className,
      )}
    >
      {items.map((item) => {
        const Icon = item.icon;
        const content = (
          <Card className="group h-full border-border/50 transition-all hover:border-accent/30 hover:shadow-lg">
            <CardContent className="p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </CardContent>
          </Card>
        );

        if (item.href) {
          return (
            <Link key={item.title} href={item.href} className="block">
              {content}
            </Link>
          );
        }
        return <div key={item.title}>{content}</div>;
      })}
    </div>
  );
}
