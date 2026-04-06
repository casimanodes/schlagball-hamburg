"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Calendar, Images } from "lucide-react";
import { cn } from "@/lib/utils";
import { strapiImageUrl } from "@/lib/strapi";
import { Badge } from "@/components/ui/badge";
import type { GalleryItem, GalleryCategory } from "@/types";
import GalleryLightbox, { GalleryPlaceholder } from "./GalleryLightbox";

const CATEGORIES: { value: "all" | GalleryCategory; label: string }[] = [
  { value: "all", label: "Alle" },
  { value: "training", label: "Training" },
  { value: "turnier", label: "Turniere" },
  { value: "vereinsleben", label: "Vereinsleben" },
];

interface GalleryGridProps {
  items: GalleryItem[];
}

export default function GalleryGrid({ items }: GalleryGridProps) {
  const [activeCategory, setActiveCategory] = useState<
    "all" | GalleryCategory
  >("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = useMemo(() => {
    if (activeCategory === "all") return items;
    return items.filter((item) => item.category === activeCategory);
  }, [items, activeCategory]);

  // Counts per category
  const counts = useMemo(() => {
    const map: Record<string, number> = { all: items.length };
    for (const item of items) {
      map[item.category] = (map[item.category] ?? 0) + 1;
    }
    return map;
  }, [items]);

  return (
    <>
      {/* Filter tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActiveCategory(cat.value)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all",
              activeCategory === cat.value
                ? "bg-accent text-accent-foreground shadow-sm"
                : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground",
            )}
          >
            {cat.label}
            <span
              className={cn(
                "text-xs rounded-full px-1.5 py-0.5 min-w-[1.25rem] text-center",
                activeCategory === cat.value
                  ? "bg-accent-foreground/20"
                  : "bg-foreground/10",
              )}
            >
              {counts[cat.value] ?? 0}
            </span>
          </button>
        ))}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <Images className="h-12 w-12 mx-auto mb-4 opacity-40" />
          <p className="text-lg font-medium">Keine Bilder in dieser Kategorie</p>
          <p className="text-sm mt-1">
            Wähle eine andere Kategorie oder schau später wieder vorbei.
          </p>
        </div>
      )}

      {/* Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        {filtered.map((item, idx) => {
          const hasImage = !!item.image;
          // Vary aspect ratios for visual interest in masonry
          const aspectClasses = [
            "aspect-[4/3]",
            "aspect-[3/4]",
            "aspect-[4/3]",
            "aspect-square",
            "aspect-[4/3]",
            "aspect-[3/2]",
          ];
          const aspect = aspectClasses[idx % aspectClasses.length];

          const formattedDate = new Date(item.date).toLocaleDateString(
            "de-DE",
            { day: "numeric", month: "short", year: "numeric" },
          );

          return (
            <button
              key={item.documentId}
              onClick={() => setLightboxIndex(idx)}
              className={cn(
                "group relative w-full break-inside-avoid overflow-hidden rounded-xl bg-muted border border-transparent hover:border-accent/30 transition-all hover:shadow-lg focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 outline-none cursor-pointer",
                aspect,
              )}
            >
              {/* Image or placeholder */}
              {hasImage ? (
                <Image
                  src={strapiImageUrl(item.image!.url)}
                  alt={item.image!.alternativeText || item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <GalleryPlaceholder
                  title={item.title}
                  category={item.category}
                />
              )}

              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Info overlay */}
              <div className="absolute bottom-0 inset-x-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <h3 className="text-white font-semibold text-sm leading-tight line-clamp-2">
                  {item.title}
                </h3>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-white/70 text-xs flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {formattedDate}
                  </span>
                  <Badge
                    variant="secondary"
                    className="text-[10px] bg-white/20 text-white border-none px-1.5 py-0"
                  >
                    {
                      CATEGORIES.find((c) => c.value === item.category)
                        ?.label
                    }
                  </Badge>
                </div>
              </div>

              {/* Top-right category dot (always visible) */}
              <div className="absolute top-3 right-3">
                <Badge
                  variant="secondary"
                  className="text-[10px] bg-black/40 text-white border-none backdrop-blur-sm px-2 py-0.5 group-hover:opacity-0 transition-opacity"
                >
                  {
                    CATEGORIES.find((c) => c.value === item.category)
                      ?.label
                  }
                </Badge>
              </div>
            </button>
          );
        })}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <GalleryLightbox
          items={filtered}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </>
  );
}
