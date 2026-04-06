import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import ContentSection from "@/components/sections/ContentSection";
import SectionHeader from "@/components/sections/SectionHeader";

export const metadata: Metadata = {
  title: "Datenschutz",
  description:
    "Datenschutzerklärung von Schlagball Hamburg e.V. – Informationen zum Umgang mit Ihren Daten.",
};

export default function DatenschutzPage() {
  return (
    <>
      <Hero
        subtitle="Rechtliches"
        title="Datenschutzerklärung"
        description="Informationen zum Umgang mit Ihren Daten auf unserer Webseite."
      />

      {/* Einleitung */}
      <ContentSection>
        <div className="max-w-3xl mx-auto">
          <SectionHeader
            overline="Datenschutz"
            title="Allgemeine Hinweise"
          />
          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p>
              Der Schutz Ihrer Daten ist uns wichtig. Diese Datenschutzerklärung
              informiert Sie darüber, wie wir mit Daten auf unserer Webseite
              umgehen.
            </p>
          </div>
        </div>
      </ContentSection>

      {/* Verantwortlicher */}
      <ContentSection className="bg-muted/50">
        <div className="max-w-3xl mx-auto">
          <SectionHeader
            overline="§ 1"
            title="Verantwortliche Stelle"
          />
          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p>Verantwortlich für diese Webseite ist:</p>
            <p>
              <strong>Schlagball Hamburg e.V.</strong>
              <br />
              Loki-Schmidt-Platz 15
              <br />
              22297 Hamburg
            </p>
            <p>
              Vertreten durch:
              <br />
              Cassius Kompala (1. Vorstand)
              <br />
              Mateo Sanchez (2. Vorstand)
            </p>
            <p>
              Kontakt:{" "}
              <a
                href="mailto:cassius.kompala@schlagball-hamburg.de"
                className="text-accent hover:underline"
              >
                cassius.kompala@schlagball-hamburg.de
              </a>
            </p>
          </div>
        </div>
      </ContentSection>

      {/* Keine Datenerhebung */}
      <ContentSection>
        <div className="max-w-3xl mx-auto">
          <SectionHeader
            overline="§ 2"
            title="Keine Erhebung personenbezogener Daten"
          />
          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p>
              Unsere Webseite erhebt, speichert oder verarbeitet{" "}
              <strong>keine personenbezogenen Daten</strong> der Besucher. Es
              gibt:
            </p>
            <ul>
              <li>keine Kontaktformulare</li>
              <li>keine Benutzerkonten oder Login-Bereiche</li>
              <li>keine Newsletter-Anmeldung</li>
              <li>keine Analyse- oder Tracking-Tools (z.&thinsp;B. Google Analytics)</li>
              <li>keine eingebundenen Social-Media-Plugins</li>
              <li>keine Weitergabe von Daten an Dritte</li>
            </ul>
          </div>
        </div>
      </ContentSection>

      {/* Cookies */}
      <ContentSection className="bg-muted/50">
        <div className="max-w-3xl mx-auto">
          <SectionHeader
            overline="§ 3"
            title="Cookies"
          />
          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p>
              Diese Webseite verwendet{" "}
              <strong>einen einzigen technisch notwendigen Cookie</strong>. Dieser
              Cookie speichert ausschließlich, ob Sie den Cookie-Hinweis auf
              dieser Webseite bereits bestätigt haben.
            </p>
            <div className="not-prose overflow-x-auto my-6">
              <table className="w-full text-sm border">
                <thead>
                  <tr className="bg-muted">
                    <th className="text-left p-3 font-semibold border-b">Eigenschaft</th>
                    <th className="text-left p-3 font-semibold border-b">Details</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 border-b text-muted-foreground">Name</td>
                    <td className="p-3 border-b font-mono text-xs">cookie_consent</td>
                  </tr>
                  <tr>
                    <td className="p-3 border-b text-muted-foreground">Zweck</td>
                    <td className="p-3 border-b">Speicherung der Cookie-Banner-Bestätigung</td>
                  </tr>
                  <tr>
                    <td className="p-3 border-b text-muted-foreground">Speicherdauer</td>
                    <td className="p-3 border-b">30 Tage</td>
                  </tr>
                  <tr>
                    <td className="p-3 border-b text-muted-foreground">Typ</td>
                    <td className="p-3 border-b">Technisch notwendig</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-muted-foreground">Drittanbieter</td>
                    <td className="p-3">Nein</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              Es werden <strong>keine Marketing-, Tracking- oder Analyse-Cookies</strong>{" "}
              eingesetzt. Eine Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO ist
              für diesen Cookie nicht erforderlich, da er ausschließlich technisch
              notwendig ist (Art. 6 Abs. 1 lit. f DSGVO).
            </p>
          </div>
        </div>
      </ContentSection>

      {/* Verschlüsselung */}
      <ContentSection>
        <div className="max-w-3xl mx-auto">
          <SectionHeader
            overline="§ 4"
            title="SSL-/TLS-Verschlüsselung"
          />
          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p>
              Diese Webseite nutzt aus Sicherheitsgründen eine{" "}
              <strong>SSL- bzw. TLS-Verschlüsselung</strong> (erkennbar am
              Schloss-Symbol in Ihrem Browser und dem Protokoll{" "}
              <code className="text-xs bg-muted px-1.5 py-0.5 rounded">https://</code>).
              Dadurch wird die Kommunikation zwischen Ihrem Browser und unserem
              Server vor dem Zugriff Dritter geschützt.
            </p>
          </div>
        </div>
      </ContentSection>

      {/* Betroffenenrechte */}
      <ContentSection className="bg-muted/50">
        <div className="max-w-3xl mx-auto">
          <SectionHeader
            overline="§ 5"
            title="Betroffenenrechte"
          />
          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p>
              Da wir <strong>keine personenbezogenen Daten</strong> erheben oder
              verarbeiten, entfallen die üblichen Betroffenenrechte nach DSGVO
              (z.&thinsp;B. Auskunft, Löschung, Berichtigung) im Zusammenhang mit
              dieser Webseite.
            </p>
            <p>
              Sollten Sie dennoch Fragen zum Datenschutz haben, können Sie uns
              jederzeit unter{" "}
              <a
                href="mailto:cassius.kompala@schlagball-hamburg.de"
                className="text-accent hover:underline"
              >
                cassius.kompala@schlagball-hamburg.de
              </a>{" "}
              kontaktieren.
            </p>
          </div>
        </div>
      </ContentSection>

      {/* Aktualität */}
      <ContentSection>
        <div className="max-w-3xl mx-auto">
          <SectionHeader
            overline="§ 6"
            title="Aktualität und Änderungen"
          />
          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p>
              Diese Datenschutzerklärung ist aktuell gültig und hat den Stand
              April 2026.
            </p>
            <p>
              Wir behalten uns vor, diese Datenschutzerklärung bei Bedarf
              anzupassen, um sie an geänderte rechtliche Anforderungen oder
              Änderungen unserer Webseite anzupassen.
            </p>
          </div>
        </div>
      </ContentSection>
    </>
  );
}
