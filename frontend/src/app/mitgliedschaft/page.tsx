import type { Metadata } from "next";
import {
  Download,
  Mail,
  FileText,
  CheckCircle2,
} from "lucide-react";
import Hero from "@/components/sections/Hero";
import ContentSection from "@/components/sections/ContentSection";
import SectionHeader from "@/components/sections/SectionHeader";
import MembershipCard from "@/components/cards/MembershipCard";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { membershipPlans } from "@/data/mock";
import { CONTACT_EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Mitgliedschaft & Beiträge",
  description:
    "Werde Mitglied bei Schlagball Hamburg – Infos zu Beiträgen, Anmeldung und Vorteilen.",
};

const steps = [
  {
    step: 1,
    title: "Anmeldeformular herunterladen",
    description:
      "Lade das Anmeldeformular herunter und fülle es vollständig aus.",
    icon: Download,
  },
  {
    step: 2,
    title: "Formular einreichen",
    description:
      "Sende das ausgefüllte Formular per Post oder E-Mail an uns.",
    icon: Mail,
  },
  {
    step: 3,
    title: "Willkommen im Verein!",
    description:
      "Nach Eingang deiner Anmeldung bist du offiziell Mitglied bei Schlagball Hamburg.",
    icon: CheckCircle2,
  },
];

export default function MembershipPage() {
  return (
    <>
      <Hero
        subtitle="Mitgliedschaft"
        title="Werde Teil von Schlagball Hamburg"
        description="Einfache und faire Mitgliedsbeiträge – für regelmäßiges Training, Turniere und eine starke Gemeinschaft."
      />

      {/* Pricing */}
      <ContentSection>
        <SectionHeader
          overline="Beiträge"
          title="Unsere Mitgliedschaftspläne"
          description="Wähle den Plan, der zu dir passt."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto items-start">
          {membershipPlans.map((plan) => (
            <MembershipCard key={plan.id} plan={plan} />
          ))}
        </div>
      </ContentSection>

      {/* Registration process */}
      <ContentSection id="anmeldung" className="bg-muted/50">
        <SectionHeader
          overline="Anmeldung"
          title="So wirst du Mitglied"
          description="In drei einfachen Schritten zum Vereinsmitglied."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {steps.map((s) => {
            const Icon = s.icon;
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
              <h3 className="font-bold text-xl mb-2">
                Mitgliedsantrag herunterladen
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                Lade das Formular herunter, fülle es aus und sende es an{" "}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-accent hover:underline"
                >
                  {CONTACT_EMAIL}
                </a>
                .
              </p>
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Download className="h-4 w-4 mr-2" />
                Antrag herunterladen (PDF)
              </Button>
            </CardContent>
          </Card>
        </div>
      </ContentSection>

      {/* Benefits */}
      <ContentSection>
        <SectionHeader
          overline="Vorteile"
          title="Warum Mitglied werden?"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            {
              title: "Regelmäßiges Training",
              text: "Bis zu 2× pro Woche professionell geleitetes Training.",
            },
            {
              title: "Turniere & Wettkämpfe",
              text: "Teilnahme an regionalen und überregionalen Turnieren.",
            },
            {
              title: "Gemeinschaft",
              text: "Ein starkes Team und neue Freundschaften.",
            },
            {
              title: "Erfahrene Trainer",
              text: "Qualifizierte Trainer mit jahrelanger Erfahrung.",
            },
            {
              title: "Leihausrüstung",
              text: "Du brauchst nichts mitbringen – wir stellen alles bereit.",
            },
            {
              title: "Faire Beiträge",
              text: "Transparente und günstige Mitgliedsbeiträge ab 9 € im Monat.",
            },
          ].map((item) => (
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
