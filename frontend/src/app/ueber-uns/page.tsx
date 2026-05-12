import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import ContentSection from "@/components/sections/ContentSection";
import SectionHeader from "@/components/sections/SectionHeader";
import CTASection from "@/components/sections/CTASection";
import RichText from "@/components/sections/RichText";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { strapiImageUrl } from "@/lib/strapi";
import { getAboutPage } from "@/lib/api";
import { ctaProps, heroProps, sectionHeaderProps } from "@/lib/block-helpers";

export const metadata: Metadata = {
  title: "Über uns",
  description:
    "Erfahre mehr über Schlagball Hamburg e.V., unsere Geschichte, Mission und das Team hinter dem Verein.",
};

export default async function AboutPage() {
  const page = await getAboutPage();
  const sortedTeam = [...page.teamMembers].sort(
    (a, b) => (a.order ?? 0) - (b.order ?? 0),
  );

  return (
    <>
      <Hero {...heroProps(page.hero)} />

      <ContentSection>
        <div className="max-w-3xl mx-auto">
          <SectionHeader {...sectionHeaderProps(page.storyHeader)} />
          <RichText
            content={page.storyContent}
            className="prose prose-lg max-w-none text-muted-foreground"
          />
        </div>
      </ContentSection>

      <ContentSection className="bg-muted/50">
        <div className="max-w-3xl mx-auto">
          <SectionHeader {...sectionHeaderProps(page.missionHeader)} />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            {page.missionItems.map((item) => (
              <div key={item.title} className="p-6">
                <p className="text-3xl font-bold text-accent mb-2">
                  {item.title}
                </p>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </ContentSection>

      <ContentSection>
        <SectionHeader {...sectionHeaderProps(page.teamHeader)} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {sortedTeam.map((member) => {
            const initials = member.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()
              .slice(0, 2);
            return (
              <Card key={member.name} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row gap-5">
                    <Avatar className="h-20 w-20 ring-2 ring-border shrink-0">
                      {member.image ? (
                        <AvatarImage
                          src={strapiImageUrl(member.image.url)}
                          alt={member.name}
                        />
                      ) : null}
                      <AvatarFallback className="text-lg font-bold bg-primary text-primary-foreground">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-lg">{member.name}</h3>
                      <p className="text-sm text-accent font-medium">
                        {member.role}
                      </p>
                      <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                        {member.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </ContentSection>

      <CTASection {...ctaProps(page.cta)} />
    </>
  );
}
