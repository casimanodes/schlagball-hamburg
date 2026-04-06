"use client";

import { useCallback, useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Calendar, Tag } from "lucide-react";
import { cn } from "@/lib/utils";
import { strapiImageUrl } from "@/lib/strapi";
import type { GalleryItem, GalleryCategory } from "@/types";

const CATEGORY_LABELS: Record<GalleryCategory, string> = {
  training: "Training",
  turnier: "Turnier",
  vereinsleben: "Vereinsleben",
};

interface GalleryLightboxProps {
  items: GalleryItem[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function GalleryLightbox({
  items,
  currentIndex,
  onClose,
  onNavigate,
}: GalleryLightboxProps) {
  const item = items[currentIndex];
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < items.length - 1;

  const goPrev = useCallback(() => {
    if (hasPrev) onNavigate(currentIndex - 1);
  }, [hasPrev, currentIndex, onNavigate]);

  const goNext = useCallback(() => {
    if (hasNext) onNavigate(currentIndex + 1);
  }, [hasNext, currentIndex, onNavigate]);

  // Keyboard navigation
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose, goPrev, goNext]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  if (!item) return null;

  const formattedDate = new Date(item.date).toLocaleDateString("de-DE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const hasImage = !!item.image;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
        aria-label="Schließen"
      >
        <X className="h-5 w-5" />
      </button>

      {/* Counter */}
      <div className="absolute top-4 left-4 z-10 text-white/70 text-sm font-medium bg-black/30 px-3 py-1.5 rounded-full">
        {currentIndex + 1} / {items.length}
      </div>

      {/* Previous button */}
      {hasPrev && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            goPrev();
          }}
          className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          aria-label="Vorheriges Bild"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
      )}

      {/* Next button */}
      {hasNext && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            goNext();
          }}
          className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          aria-label="Nächstes Bild"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      )}

      {/* Content */}
      <div
        className="relative max-w-5xl w-full mx-4 md:mx-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image area */}
        <div className="relative aspect-[4/3] md:aspect-[16/10] w-full rounded-t-xl overflow-hidden bg-muted/20">
          {hasImage ? (
            <Image
              src={strapiImageUrl(item.image!.url)}
              alt={item.image!.alternativeText || item.title}
              fill
              sizes="(max-width: 768px) 100vw, 80vw"
              className="object-contain"
              priority
            />
          ) : (
            <GalleryPlaceholder
              title={item.title}
              category={item.category}
              large
            />
          )}
        </div>

        {/* Info bar */}
        <div className="bg-background rounded-b-xl p-4 md:p-6">
          <h3 className="font-bold text-lg md:text-xl">{item.title}</h3>
          {item.description && (
            <p className="text-muted-foreground mt-1 text-sm md:text-base">
              {item.description}
            </p>
          )}
          <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              {formattedDate}
            </span>
            <span className="flex items-center gap-1.5">
              <Tag className="h-3.5 w-3.5" />
              {CATEGORY_LABELS[item.category]}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Gradient placeholder for items without images */
export function GalleryPlaceholder({
  title,
  category,
  large,
}: {
  title: string;
  category: GalleryCategory;
  large?: boolean;
}) {
  const gradients: Record<GalleryCategory, string> = {
    training:
      "from-accent/30 via-accent/10 to-primary/20",
    turnier:
      "from-sport/30 via-sport/10 to-primary/20",
    vereinsleben:
      "from-primary/30 via-accent/10 to-sport/20",
  };

  const icons: Record<GalleryCategory, string> = {
    training: "🏏",
    turnier: "🏆",
    vereinsleben: "🤝",
  };

  return (
    <div
      className={cn(
        "absolute inset-0 bg-gradient-to-br flex flex-col items-center justify-center",
        gradients[category],
      )}
    >
      <span className={cn("mb-2", large ? "text-6xl" : "text-4xl")}>
        {icons[category]}
      </span>
      <span
        className={cn(
          "text-foreground/40 font-medium text-center px-4 leading-snug",
          large ? "text-base" : "text-xs",
        )}
      >
        {title}
      </span>
    </div>
  );
}
