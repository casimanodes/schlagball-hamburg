import type { Metadata } from "next";
import { Mail, Phone } from "lucide-react";
import Hero from "@/components/sections/Hero";
import ContentSection from "@/components/sections/ContentSection";
import SectionHeader from "@/components/sections/SectionHeader";

export const metadata: Metadata = {
  title: "Impressum",
  description:
    "Impressum und rechtliche Angaben von Schlagball Hamburg e.V.",
};

export default function ImpressumPage() {
  return (
    <>
      <Hero
        subtitle="Rechtliches"
        title="Impressum"
        description="Angaben gemäß § 5 TMG"
      />

      {/* Vereinsangaben */}
      <ContentSection>
        <div className="max-w-3xl mx-auto">
          <SectionHeader
            overline="Angaben gemäß § 5 TMG"
            title="Schlagball Hamburg e.V."
          />
          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p>
              Loki-Schmidt-Platz 15
              <br />
              22297 Hamburg
            </p>

            <h3 className="text-foreground">Vertretungsberechtigte Vorstände</h3>
            <ul>
              <li>Cassius Kompala (1. Vorstand)</li>
              <li>Mateo Sanchez (2. Vorstand)</li>
            </ul>

            <h3 className="text-foreground">Registereintrag</h3>
            <p>
              Eingetragen im Vereinsregister.
              <br />
              Registergericht: Amtsgericht Hamburg
              <br />
              Registernummer: VR 22890
            </p>
          </div>
        </div>
      </ContentSection>

      {/* Kontakt */}
      <ContentSection className="bg-muted/50">
        <div className="max-w-3xl mx-auto">
          <SectionHeader overline="Kontakt" title="Erreichbarkeit" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Cassius */}
            <div className="rounded-lg border bg-background p-6 space-y-3">
              <h3 className="font-semibold text-lg">
                Cassius Kompala
                <span className="block text-sm font-normal text-muted-foreground">
                  1. Vorstand
                </span>
              </h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-accent" />
                <a
                  href="mailto:cassius.kompala@schlagball-hamburg.de"
                  className="hover:text-foreground transition-colors"
                >
                  cassius.kompala@schlagball-hamburg.de
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-accent" />
                <a
                  href="tel:+4917621927202"
                  className="hover:text-foreground transition-colors"
                >
                  0176 / 219 272 02
                </a>
              </div>
            </div>

            {/* Mateo */}
            <div className="rounded-lg border bg-background p-6 space-y-3">
              <h3 className="font-semibold text-lg">
                Mateo Sanchez
                <span className="block text-sm font-normal text-muted-foreground">
                  2. Vorstand
                </span>
              </h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-accent" />
                <a
                  href="mailto:mateo.sanchez@schlagball-hamburg.de"
                  className="hover:text-foreground transition-colors"
                >
                  mateo.sanchez@schlagball-hamburg.de
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-accent" />
                <a
                  href="tel:+4917662154893"
                  className="hover:text-foreground transition-colors"
                >
                  0176 / 621 548 93
                </a>
              </div>
            </div>
          </div>
        </div>
      </ContentSection>

      {/* Haftungsausschluss */}
      <ContentSection>
        <div className="max-w-3xl mx-auto">
          <SectionHeader
            overline="Haftung"
            title="Haftungsausschluss"
          />
          <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
            <div>
              <h3 className="text-foreground">Haftung für Inhalte</h3>
              <p>
                Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt.
                Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte
                können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter
                sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen
                Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8
                bis 10 TMG sind wir als Diensteanbieter jedoch nicht
                verpflichtet, übermittelte oder gespeicherte fremde
                Informationen zu überwachen oder nach Umständen zu forschen, die
                auf eine rechtswidrige Tätigkeit hinweisen.
              </p>
            </div>

            <div>
              <h3 className="text-foreground">Haftung für Links</h3>
              <p>
                Unser Angebot enthält Links zu externen Webseiten Dritter, auf
                deren Inhalte wir keinen Einfluss haben. Deshalb können wir für
                diese fremden Inhalte auch keine Gewähr übernehmen. Für die
                Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter
                oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten
                wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße
                überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der
                Verlinkung nicht erkennbar.
              </p>
            </div>

            <div>
              <h3 className="text-foreground">Urheberrecht</h3>
              <p>
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf
                diesen Seiten unterliegen dem deutschen Urheberrecht. Die
                Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
                Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der
                schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
              </p>
            </div>
          </div>
        </div>
      </ContentSection>
    </>
  );
}
