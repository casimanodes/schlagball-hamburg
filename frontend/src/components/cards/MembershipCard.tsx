import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { buttonVariants } from "@/lib/button-variants";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { MembershipPlan } from "@/types";

interface MembershipCardProps {
  plan: MembershipPlan;
}

export default function MembershipCard({ plan }: MembershipCardProps) {
  return (
    <Card
      className={cn(
        "relative overflow-hidden transition-all",
        plan.highlighted &&
          "border-accent shadow-lg ring-1 ring-accent/20 scale-[1.02]",
      )}
    >
      {plan.highlighted && (
        <div className="absolute top-0 right-0">
          <Badge className="rounded-none rounded-bl-lg bg-accent text-accent-foreground">
            Beliebt
          </Badge>
        </div>
      )}
      <CardContent className="p-6 md:p-8">
        <h3 className="text-xl font-bold">{plan.name}</h3>
        <p className="text-sm text-muted-foreground mt-1">
          {plan.description}
        </p>
        <div className="mt-6">
          <span className="text-4xl font-bold">{plan.price}€</span>
          <span className="text-muted-foreground ml-1">/ {plan.interval}</span>
        </div>
        <ul className="mt-6 space-y-3">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-sm">
              <Check className="h-4 w-4 text-accent mt-0.5 shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <Link
          href="/mitgliedschaft#anmeldung"
          className={cn(
            buttonVariants({ size: "lg" }),
            "w-full mt-8",
            plan.highlighted
              ? "bg-accent text-accent-foreground hover:bg-accent/90"
              : "",
          )}
        >
          Jetzt beitreten
        </Link>
      </CardContent>
    </Card>
  );
}
