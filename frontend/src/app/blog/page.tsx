import type { Metadata } from "next";
import { FileText } from "lucide-react";
import Hero from "@/components/sections/Hero";
import ContentSection from "@/components/sections/ContentSection";
import SectionHeader from "@/components/sections/SectionHeader";
import EmptyState from "@/components/sections/EmptyState";
import BlogCard from "@/components/cards/BlogCard";
import { getPosts } from "@/lib/api";

export const metadata: Metadata = {
  title: "Blog & Neuigkeiten",
  description:
    "Neuigkeiten, Trainingsberichte und Rückblicke von Schlagball Hamburg.",
};

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <>
      <Hero
        subtitle="Aktuelles"
        title="Blog & Neuigkeiten"
        description="Rückblicke, Ankündigungen und Einblicke aus dem Vereinsleben."
      />

      <ContentSection>
        {posts.length > 0 ? (
          <>
            <SectionHeader
              overline="Beiträge"
              title="Alle Artikel"
              description={`${posts.length} Beiträge`}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </>
        ) : (
          <EmptyState
            icon={FileText}
            title="Noch keine Beiträge"
            description="Blog-Beiträge werden über das CMS erstellt und erscheinen hier automatisch."
          />
        )}
      </ContentSection>
    </>
  );
}
