import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import ContentSection from "@/components/sections/ContentSection";
import SectionHeader from "@/components/sections/SectionHeader";
import CTASection from "@/components/sections/CTASection";
import TeamMemberCard from "@/components/cards/TeamMemberCard";
import { teamMembers } from "@/data/mock";

export const metadata: Metadata = {
  title: "Über uns",
  description:
    "Erfahre mehr über Schlagball Hamburg e.V., unsere Geschichte, Mission und das Team hinter dem Verein.",
};

export default function AboutPage() {
  return (
    <>
      <Hero
        subtitle="Über uns"
        title="Unser Verein"
        description="Schlagball Hamburg e.V. – gegründet aus Leidenschaft für einen einzigartigen Sport. Wir bringen Menschen zusammen und fördern Teamgeist, Bewegung und Freude am Spiel."
      />

      {/* Story */}
      <ContentSection>
        <div className="max-w-3xl mx-auto">
          <SectionHeader
            overline="Unsere Geschichte"
            title="Von der Schulbank auf den Sportplatz"
          />
          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p>
              Was als gemeinsames Projekt an der Winterhuder Reformschule begann,
              ist heute ein wachsender Sportverein. Seit über 5 Jahren geben
              Cassio und Mateo jeden Freitag von 14 bis 16 Uhr Training –
              mittlerweile auch mit Hallentraining am Donnerstag.
            </p>
            <p>
              Schlagball Hamburg e.V. steht für mehr als nur Sport: Wir sind eine
              Gemeinschaft, die junge Menschen von 8 bis 25 Jahren
              zusammenbringt. Unser Ziel ist es, den traditionellen Sport
              Schlagball in Hamburg lebendig zu halten und neue Generationen
              dafür zu begeistern.
            </p>
            <p>
              Mit qualifizierten Trainern, regelmäßigem Training und der
              Teilnahme an Turnieren wie der Deutschen Meisterschaft auf
              Spiekeroog und der Kieler Woche bieten wir unseren Mitgliedern ein
              vielfältiges und spannendes Vereinsleben.
            </p>
          </div>
        </div>
      </ContentSection>

      {/* Mission */}
      <ContentSection className="bg-muted/50">
        <div className="max-w-3xl mx-auto">
          <SectionHeader
            overline="Mission"
            title="Was uns antreibt"
          />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="p-6">
              <p className="text-3xl font-bold text-accent mb-2">Bewegung</p>
              <p className="text-sm text-muted-foreground">
                Sport als Grundlage für ein gesundes und aktives Leben – für jede
                Altersgruppe.
              </p>
            </div>
            <div className="p-6">
              <p className="text-3xl font-bold text-accent mb-2">Teamgeist</p>
              <p className="text-sm text-muted-foreground">
                Zusammen spielen, zusammen wachsen – Schlagball ist
                Mannschaftssport im besten Sinne.
              </p>
            </div>
            <div className="p-6">
              <p className="text-3xl font-bold text-accent mb-2">Tradition</p>
              <p className="text-sm text-muted-foreground">
                Einen historischen Sport für die Zukunft bewahren und neu
                interpretieren.
              </p>
            </div>
          </div>
        </div>
      </ContentSection>

      {/* Team */}
      <ContentSection>
        <SectionHeader
          overline="Das Team"
          title="Die Menschen hinter dem Verein"
          description="Unsere Trainer und Vorstände bringen jahrelange Erfahrung und Leidenschaft mit."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {teamMembers.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </div>
      </ContentSection>

      <CTASection
        variant="sport"
        title="Werde Teil unseres Teams"
        description="Lerne uns kennen – komm zum Probetraining oder werde direkt Mitglied."
        primaryAction={{
          label: "Mitglied werden",
          href: "/mitgliedschaft",
        }}
        secondaryAction={{
          label: "Zum Training",
          href: "/training",
        }}
      />
    </>
  );
}
