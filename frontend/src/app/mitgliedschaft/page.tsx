import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import ContentSection from "@/components/sections/ContentSection";
import SectionHeader from "@/components/sections/SectionHeader";
import MembershipCard from "@/components/cards/MembershipCard";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle2, FileText, Download } from "lucide-react";
import { CONTACT_EMAIL } from "@/lib/constants";
import { getMembershipPage } from "@/lib/api";
import { resolveIcon } from "@/lib/icons";
import { heroProps, sectionHeaderProps } from "@/lib/block-helpers";
import type { MembershipPlan } from "@/types";

export const metadata: Metadata = {
  title: "Mitgliedschaft & Beiträge",
  description:
    "Werde Mitglied bei Schlagball Hamburg – Infos zu Beiträgen, Anmeldung und Vorteilen.",
};

export default async function MembershipPage() {
  const page = await getMembershipPage();

  // Map Strapi-Plan-Blocks auf das bestehende MembershipPlan-Interface
  const plans: MembershipPlan[] = page.plans.map((plan, idx) => ({
    id: idx + 1,
    documentId: `plan-${idx + 1}`,
    name: plan.name,
    price: plan.price,
    interval: plan.interval,
    description: plan.description,
    features: plan.features,
    highlighted: !!plan.highlighted,
  }));

  return (
    <>
      <Hero {...heroProps(page.hero)} />

      {/* Pricing */}
      <ContentSection>
        <SectionHeader {...sectionHeaderProps(page.plansHeader)} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto items-start">
          {plans.map((plan) => (
            <MembershipCard key={plan.id} plan={plan} />
          ))}
        </div>
      </ContentSection>

      {/* Registration process */}
      <ContentSection id="anmeldung" className="bg-muted/50">
        <SectionHeader {...sectionHeaderProps(page.stepsHeader)} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {page.steps.map((s) => {
            const Icon = resolveIcon(s.icon);
            return (
              <Card key={s.step} className="text-center">
                <CardContent className="p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent mx-auto mb-4">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                      {s.step}
                    </span>
                    <h3 className="font-semibold">{s.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {s.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Download section */}
        <div className="max-w-xl mx-auto mt-12">
          <Card>
            <CardContent className="p-6 md:p-8 text-center">
              <FileText className="h-10 w-10 text-accent mx-auto mb-4" />
              <h3 className="font-bold text-xl mb-2">{page.downloadCardTitle}</h3>
              <p className="text-sm text-muted-foreground mb-6">
                {page.downloadCardDescription}{" "}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-accent hover:underline"
                >
                  {CONTACT_EMAIL}
                </a>
                .
              </p>
              {page.downloadCardButtonHref && page.downloadCardButtonHref !== "#" ? (
                <Link
                  href={page.downloadCardButtonHref}
                  className="inline-block"
                >
                  <Button
                    size="lg"
                    className="bg-accent text-accent-foreground hover:bg-accent/90"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    {page.downloadCardButtonLabel}
                  </Button>
                </Link>
              ) : (
                <Button
                  size="lg"
                  className="bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  <Download className="h-4 w-4 mr-2" />
                  {page.downloadCardButtonLabel}
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </ContentSection>

      {/* Benefits */}
      <ContentSection>
        <SectionHeader {...sectionHeaderProps(page.benefitsHeader)} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {page.benefits.map((item) => (
            <div key={item.title} className="flex gap-3">
              <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-sm">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </ContentSection>
    </>
  );
}
