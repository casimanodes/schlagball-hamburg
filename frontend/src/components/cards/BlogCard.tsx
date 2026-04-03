import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { strapiImageUrl } from "@/lib/strapi";
import type { TrainingPost } from "@/types";

interface BlogCardProps {
  post: TrainingPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  const date = new Date(post.publishedAt).toLocaleDateString("de-DE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Link href={`/blog/${post.slug}`} className="block group">
      <Card className="h-full overflow-hidden transition-all hover:shadow-lg hover:border-accent/30">
        {/* Cover image */}
        <div className="relative aspect-[16/9] bg-muted overflow-hidden">
          {post.coverImage ? (
            <Image
              src={strapiImageUrl(post.coverImage.url)}
              alt={post.title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-primary/5">
              <span className="text-4xl font-bold text-primary/20">SH</span>
            </div>
          )}
        </div>

        <CardContent className="p-5">
          <div className="flex items-center gap-2 mb-2">
            <time className="text-xs text-muted-foreground">{date}</time>
            {post.category && (
              <Badge variant="secondary" className="text-xs">
                {post.category}
              </Badge>
            )}
          </div>
          <h3 className="font-semibold text-lg leading-tight group-hover:text-accent transition-colors">
            {post.title}
          </h3>
          <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
            {post.excerpt}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
