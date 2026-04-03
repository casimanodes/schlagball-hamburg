import Link from "next/link";
import { buttonVariants } from "@/lib/button-variants";
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
              buttonVariants({
                size: "lg",
                variant: variant === "primary" ? "secondary" : "default",
              }),
              variant !== "primary" && "bg-white text-foreground hover:bg-white/90",
            )}
          >
            {primaryAction.label}
          </Link>
          {secondaryAction && (
            <Link
              href={secondaryAction.href}
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "border-current/30 hover:bg-white/10",
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
