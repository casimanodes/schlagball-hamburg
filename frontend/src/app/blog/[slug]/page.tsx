import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar as CalendarIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/lib/button-variants";
import ContentSection from "@/components/sections/ContentSection";
import { getPostBySlug, getPosts } from "@/lib/api";
import { strapiImageUrl } from "@/lib/strapi";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Beitrag nicht gefunden" };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  const date = new Date(post.publishedAt).toLocaleDateString("de-DE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <ContentSection>
      <article className="max-w-3xl mx-auto">
        {/* Back link */}
        <Link
          href="/blog"
          className={buttonVariants({ variant: "ghost", size: "sm", className: "mb-8" })}
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Alle Beiträge
        </Link>

        {/* Meta */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <CalendarIcon className="h-4 w-4" />
            <time dateTime={post.publishedAt}>{date}</time>
          </div>
          {post.category && (
            <Badge variant="secondary">{post.category}</Badge>
          )}
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
          {post.title}
        </h1>

        {/* Cover image */}
        {post.coverImage && (
          <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-8">
            <Image
              src={strapiImageUrl(post.coverImage.url)}
              alt={post.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
        )}

        {/* Content */}
        <div className="prose prose-lg max-w-none text-muted-foreground">
          {post.content.split("\n").map((line, i) => {
            const trimmed = line.trim();
            if (!trimmed) return null;
            if (trimmed.startsWith("# "))
              return (
                <h1 key={i} className="text-foreground">
                  {trimmed.slice(2)}
                </h1>
              );
            if (trimmed.startsWith("## "))
              return (
                <h2 key={i} className="text-foreground">
                  {trimmed.slice(3)}
                </h2>
              );
            if (trimmed.startsWith("### "))
              return (
                <h3 key={i} className="text-foreground">
                  {trimmed.slice(4)}
                </h3>
              );
            if (trimmed.startsWith("- "))
              return <li key={i}>{trimmed.slice(2)}</li>;

            // Simple bold/paragraph handling
            const rendered = trimmed.replace(
              /\*\*(.+?)\*\*/g,
              "<strong>$1</strong>",
            );
            return (
              <p
                key={i}
                dangerouslySetInnerHTML={{ __html: rendered }}
              />
            );
          })}
        </div>

        {/* Gallery */}
        {post.gallery && post.gallery.length > 0 && (
          <div className="mt-10">
            <h2 className="text-xl font-semibold mb-4">Bilder</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {post.gallery.map((img) => (
                <div
                  key={img.id}
                  className="relative aspect-square rounded-lg overflow-hidden"
                >
                  <Image
                    src={strapiImageUrl(img.url)}
                    alt={img.alternativeText ?? post.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </article>
    </ContentSection>
  );
}
