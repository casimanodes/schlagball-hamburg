import Hero from "@/components/sections/Hero";
import StatsSection from "@/components/sections/StatsSection";
import SectionHeader from "@/components/sections/SectionHeader";
import ContentSection from "@/components/sections/ContentSection";
import FeatureGrid from "@/components/sections/FeatureGrid";
import CTASection from "@/components/sections/CTASection";
import BlogCard from "@/components/cards/BlogCard";
import EventCard from "@/components/cards/EventCard";
import { getPosts, getUpcomingEvents, getHomePage } from "@/lib/api";
import { resolveIcon } from "@/lib/icons";
import { ctaProps, heroProps, sectionHeaderProps } from "@/lib/block-helpers";
import type { FeatureItem } from "@/components/sections/FeatureGrid";

// ISR: Strapi-Daten werden alle 60 Sekunden im Hintergrund frisch geladen.
export const revalidate = 60;

export default async function HomePage() {
  const [page, posts, events] = await Promise.all([
    getHomePage(),
    getPosts(),
    getUpcomingEvents(4),
  ]);

  const features: FeatureItem[] = page.features.map((feature) => ({
    title: feature.title,
    description: feature.description,
    icon: resolveIcon(feature.icon),
    href: feature.href ?? undefined,
  }));

  const latestPosts = posts.slice(0, 3);

  return (
    <>
      <Hero {...heroProps(page.hero)} />

      <StatsSection stats={page.stats} />

      <ContentSection>
        <SectionHeader {...sectionHeaderProps(page.featuresHeader)} />
        <FeatureGrid items={features} />
      </ContentSection>

      {events.length > 0 && (
        <ContentSection className="bg-muted/50">
          <SectionHeader {...sectionHeaderProps(page.eventsHeader)} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </ContentSection>
      )}

      {latestPosts.length > 0 && (
        <ContentSection>
          <SectionHeader {...sectionHeaderProps(page.postsHeader)} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </ContentSection>
      )}

      <CTASection {...ctaProps(page.cta)} />
    </>
  );
}
