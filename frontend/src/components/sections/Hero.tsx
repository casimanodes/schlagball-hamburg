import Link from "next/link";
import { buttonVariants } from "@/lib/button-variants";
import { cn } from "@/lib/utils";

interface HeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  primaryAction?: { label: string; href: string };
  secondaryAction?: { label: string; href: string };
  className?: string;
  large?: boolean;
}

export default function Hero({
  title,
  subtitle,
  description,
  primaryAction,
  secondaryAction,
  className,
  large,
}: HeroProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden bg-primary text-primary-foreground",
        large ? "py-24 md:py-36 lg:py-44" : "py-16 md:py-24",
        className,
      )}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 h-[500px] w-[500px] rounded-full bg-sport/10 blur-3xl" />
      </div>

      <div className="container relative">
        <div className="max-w-3xl">
          {subtitle && (
            <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-3">
              {subtitle}
            </p>
          )}
          <h1
            className={cn(
              "font-bold tracking-tight",
              large
                ? "text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
                : "text-3xl sm:text-4xl md:text-5xl",
            )}
          >
            {title}
          </h1>
          {description && (
            <p
              className={cn(
                "mt-4 leading-relaxed text-primary-foreground/80",
                large ? "text-lg md:text-xl max-w-2xl" : "text-base md:text-lg max-w-xl",
              )}
            >
              {description}
            </p>
          )}
          {(primaryAction || secondaryAction) && (
            <div className="mt-8 flex flex-wrap gap-3">
              {primaryAction && (
                <Link
                  href={primaryAction.href}
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "bg-accent text-accent-foreground hover:bg-accent/90",
                  )}
                >
                  {primaryAction.label}
                </Link>
              )}
              {secondaryAction && (
                <Link
                  href={secondaryAction.href}
                  className={cn(
                    buttonVariants({ size: "lg", variant: "outline" }),
                    "border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10",
                  )}
                >
                  {secondaryAction.label}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
