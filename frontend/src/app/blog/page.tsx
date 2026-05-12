import type { Metadata } from "next";
import { FileText } from "lucide-react";
import Hero from "@/components/sections/Hero";
import ContentSection from "@/components/sections/ContentSection";
import SectionHeader from "@/components/sections/SectionHeader";
import EmptyState from "@/components/sections/EmptyState";
import BlogCard from "@/components/cards/BlogCard";
import { getPosts, getBlogPage } from "@/lib/api";
import { heroProps, sectionHeaderProps } from "@/lib/block-helpers";

export const metadata: Metadata = {
  title: "Blog & Neuigkeiten",
  description:
    "Neuigkeiten, Trainingsberichte und Rückblicke von Schlagball Hamburg.",
};

export default async function BlogPage() {
  const [page, posts] = await Promise.all([getBlogPage(), getPosts()]);

  return (
    <>
      <Hero {...heroProps(page.hero)} />

      <ContentSection>
        {posts.length > 0 ? (
          <>
            <SectionHeader
              {...sectionHeaderProps(page.sectionHeader)}
              description={`${posts.length} ${page.postCountSuffix}`}
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
            title={page.emptyState.title}
            description={page.emptyState.description}
          />
        )}
      </ContentSection>
    </>
  );
}
