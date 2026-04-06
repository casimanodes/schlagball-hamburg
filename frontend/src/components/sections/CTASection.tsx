import Link from "next/link";
import { cn } from "@/lib/utils";

interface CTASectionProps {
  title: string;
  description: string;
  primaryAction: { label: string; href: string };
  secondaryAction?: { label: string; href: string };
  variant?: "accent" | "sport" | "primary";
  className?: string;
}

export default function CTASection({
  title,
  description,
  primaryAction,
  secondaryAction,
  variant = "accent",
  className,
}: CTASectionProps) {
  const bgMap = {
    accent: "bg-accent text-accent-foreground",
    sport: "bg-sport text-sport-foreground",
    primary: "bg-primary text-primary-foreground",
  };

  const baseButtonClass =
    "inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-base font-semibold tracking-tight transition-all outline-none select-none focus-visible:ring-2 focus-visible:ring-primary-foreground/25 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent active:translate-y-px";

  const primaryButtonMap: Record<NonNullable<CTASectionProps["variant"]>, string> = {
    // Green/orange CTA backgrounds: grounded navy primary button
    accent:
      "bg-primary text-primary-foreground shadow-sm hover:shadow-md hover:bg-primary/88",
    sport:
      "bg-primary text-primary-foreground shadow-sm hover:shadow-md hover:bg-primary/88",
    // Navy CTA background: warm orange primary button
    primary:
      "bg-sport text-sport-foreground shadow-sm hover:shadow-md hover:bg-sport/88",
  };

  const secondaryButtonMap: Record<NonNullable<CTASectionProps["variant"]>, string> = {
    // Secondary: solid, professional neutral button that contrasts with all CTA backgrounds.
    accent:
      "bg-background text-primary border border-primary/20 shadow-sm hover:shadow-md hover:bg-background/95",
    sport:
      "bg-background text-primary border border-primary/20 shadow-sm hover:shadow-md hover:bg-background/95",
    primary:
      "bg-background text-primary border border-primary/20 shadow-sm hover:shadow-md hover:bg-background/95",
  };

  return (
    <section className={cn("py-16 md:py-24", bgMap[variant], className)}>
      <div className="container text-center">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          {title}
        </h2>
        <p className="mt-4 text-lg max-w-2xl mx-auto opacity-90">
          {description}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href={primaryAction.href}
            className={cn(
              baseButtonClass,
              "hover:-translate-y-0.5",
              primaryButtonMap[variant],
            )}
          >
            {primaryAction.label}
          </Link>
          {secondaryAction && (
            <Link
              href={secondaryAction.href}
              className={cn(
                baseButtonClass,
                "hover:-translate-y-0.5",
                secondaryButtonMap[variant],
              )}
            >
              {secondaryAction.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
