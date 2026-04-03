import type { Metadata } from "next";
import {
  CircleDot,
  Crosshair,
  Hand,
  Zap,
  Ruler,
  Medal,
} from "lucide-react";
import Hero from "@/components/sections/Hero";
import ContentSection from "@/components/sections/ContentSection";
import SectionHeader from "@/components/sections/SectionHeader";
import CTASection from "@/components/sections/CTASection";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Der Sport: Schlagball",
  description:
    "Alles über Schlagball – Regeln, Punktearten, Ausrüstung, Spielfeld und Turniere.",
};

const pointTypes = [
  {
    name: "Laufpunkt",
    icon: Zap,
    description:
      "Schafft es ein Spieler der Schlagmannschaft, nach Erwerb des Laufrechts zu einer der Tickstangen und zurück ins Schlagmal zu laufen, ohne dass zwischenzeitlich ein Wechsel stattgefunden hat, erhält die Schlagmannschaft einen Laufpunkt.",
  },
  {
    name: "Wechselpunkt",
    icon: Crosshair,
    description:
      "Wird ein Läufer von einem Spieler der Feldmannschaft abgeworfen, erhält die Feldmannschaft einen Wechselpunkt. Wird ein Läufer durch Abdrängen aus dem Spielfeld zum Wechsel gezwungen, gibt es keinen Wechselpunkt.",
  },
  {
    name: "Fangpunkt",
    icon: Hand,
    description:
      "Wird der geschlagene Ball von einem Feldspieler direkt aus der Luft, mit einer Hand und ohne Nachgreifen gefangen, erhält die Feldmannschaft einen Fangpunkt. Dies gilt auch bei ins Aus geschlagenen, ungültigen Schlägen.",
  },
  {
    name: "Weitschlagpunkt",
    icon: Medal,
    description:
      "Schlägt ein Spieler den Ball über das Spielfeld hinaus in das dahinter liegende Weitschlagfeld – also weiter als 70 Meter – erhält die Schlagmannschaft einen Weitschlagpunkt.",
  },
];

export default function SportPage() {
  return (
    <>
      <Hero
        subtitle="Der Sport"
        title="Schlagball"
        description="Schlagball kombiniert Elemente aus Baseball, Brennball und Völkerball zu einem einzigartigen Mannschaftssport mit langer Tradition in Deutschland."
      />

      {/* Overview */}
      <ContentSection>
        <div className="max-w-3xl mx-auto">
          <SectionHeader
            overline="Spielprinzip"
            title="So funktioniert Schlagball"
          />
          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p>
              Das Schlagballspiel ist ein Mannschaftssport, bei dem sich zwei
              Parteien von je zwölf oder auch sechs Spielern gegenüberstehen. Die
              Teams kämpfen um das Schlagrecht und die höhere Punktzahl innerhalb
              einer festen Spieldauer.
            </p>
            <p>
              Die <strong>Schlagpartei</strong> verteidigt das Schlagrecht. Die
              Spieler schlagen den Ball ins Spielfeld und laufen durch das Feld zu
              einem Mal und zurück, um Punkte zu sammeln.
            </p>
            <p>
              Die <strong>Feldpartei</strong> versucht, das Schlagrecht zu
              erringen. Sie fängt geschlagene Bälle, kreist laufende Schläger ein,
              wirft sie ab, treibt sie über die Grenzen des Lauffeldes oder wirft
              den Ball zurück ins Schlagmal.
            </p>
            <p>
              Bei erfolgreichem Feldspiel erhält die Feldpartei das Schlagrecht
              und wird zur neuen Schlagpartei – so wechseln sich die Rollen
              dynamisch ab.
            </p>
          </div>
        </div>
      </ContentSection>

      {/* Rules / Points */}
      <ContentSection id="regeln" className="bg-muted/50">
        <SectionHeader
          overline="Regeln"
          title="Punktearten im Schlagball"
          description="Es gibt vier verschiedene Arten, Punkte zu erzielen – jede mit eigenen Regeln und Voraussetzungen."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {pointTypes.map((pt) => {
            const Icon = pt.icon;
            return (
              <Card key={pt.name} className="h-full">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold text-lg">{pt.name}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {pt.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </ContentSection>

      {/* Equipment */}
      <ContentSection id="ausruestung">
        <SectionHeader
          overline="Ausrüstung"
          title="Ball, Schlagholz & mehr"
          description="Die Ausrüstung im Schlagball ist traditionell und funktional."
        />
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Ball */}
          <Card>
            <CardContent className="p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sport/10 text-sport">
                  <CircleDot className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-xl">Der Schlagball</h3>
              </div>
              <div className="text-muted-foreground space-y-2">
                <p>
                  Spielgerät ist ein Lederball – der Schlagball. Das Gewicht des
                  Balles soll vor dem Spiel mindestens 70 g, höchstens 85 g
                  betragen, der Umfang 19 cm bis 21 cm.
                </p>
                <p>
                  Das Leder soll wegen der Blendung im Sonnenschein keine helle
                  Farbe haben. Der Regelball ist rot, jedoch ist mit Zustimmung
                  beider Teams jede Farbe erlaubt.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                <Badge variant="secondary">70–85 g</Badge>
                <Badge variant="secondary">19–21 cm Umfang</Badge>
                <Badge variant="secondary">Leder</Badge>
                <Badge variant="secondary">Rot (Standard)</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Bat */}
          <Card>
            <CardContent className="p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sport/10 text-sport">
                  <Ruler className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-xl">
                  Das Schlagholz (Klippe)
                </h3>
              </div>
              <div className="text-muted-foreground space-y-2">
                <p>
                  Das Schlagholz, auch Klippe genannt, darf unbegrenzt lang sein.
                  Es muss aus einheitlichem Naturholz bestehen und im Querschnitt
                  kreisrund sein. Am unteren Ende darf es bis zu 3 cm dick sein.
                </p>
                <p>
                  Das Griffende und der Schaft dürfen dünner sein und mit
                  Handschlinge oder Endknauf versehen sein. Das Schlagende darf
                  nicht künstlich beschwert werden – ein Umwickeln mit Draht,
                  Leder und dergleichen ist verboten.
                </p>
                <p>
                  Jeder Spieler darf sein eigenes Schlagholz benutzen. Alle in
                  das Spiel gebrachten Geräte gelten als Gemeingut.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                <Badge variant="secondary">Naturholz</Badge>
                <Badge variant="secondary">Kreisrund</Badge>
                <Badge variant="secondary">Max. 3 cm Durchmesser</Badge>
                <Badge variant="secondary">Unbegrenzte Länge</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </ContentSection>

      {/* Playing field */}
      <ContentSection id="spielfeld" className="bg-muted/50">
        <SectionHeader
          overline="Spielfeld"
          title="Das Schlagball-Spielfeld"
          description="Das Spielfeld hat klare Abmessungen und markierte Zonen."
        />
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardContent className="p-6 md:p-8">
              <div className="prose prose-lg max-w-none text-muted-foreground">
                <p>
                  Das rechteckige Spielfeld ist <strong>70 m × 25 m</strong> mit
                  einem sich anschließenden Weitschlagfeld, das sich aus einer
                  Verlängerung der Diagonalen durch das Spielfeld ergibt.
                </p>
                <ul>
                  <li>
                    Die <strong>Grundlinie</strong> ist das Schlagmal.
                  </li>
                  <li>
                    Die gegenüberliegende Linie ist das{" "}
                    <strong>Fangmal</strong>.
                  </li>
                  <li>
                    10 m vor dem Fangmal stehen zwei{" "}
                    <strong>Tickstangen</strong> mit einem Abstand von 4 m – sie
                    dienen als Laufmale.
                  </li>
                  <li>
                    Hinter dem Spielfeld schließt sich in Verlängerung der
                    Diagonalen das <strong>Weitschlagfeld</strong> an.
                  </li>
                </ul>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                <Badge variant="secondary">70 × 25 m</Badge>
                <Badge variant="secondary">Schlagmal (Grundlinie)</Badge>
                <Badge variant="secondary">Fangmal (Gegenüber)</Badge>
                <Badge variant="secondary">Tickstangen (4 m Abstand)</Badge>
                <Badge variant="secondary">Weitschlagfeld (70 m+)</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </ContentSection>

      {/* Tournaments */}
      <ContentSection id="turniere">
        <SectionHeader
          overline="Turniere"
          title="Wettkämpfe & Meisterschaften"
          description="Schlagball wird auf regionaler und nationaler Ebene gespielt."
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card className="text-center">
            <CardContent className="p-6">
              <p className="text-lg font-semibold text-sport mb-1">
                September
              </p>
              <h3 className="font-bold text-lg">
                Winterhuder Herbstturnier
              </h3>
              <p className="text-sm text-muted-foreground mt-2">
                Unser eigenes Turnier – jedes Jahr organisiert vom Verein.
                Ein Highlight im Schlagball-Kalender.
              </p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <p className="text-lg font-semibold text-sport mb-1">
                Himmelfahrt
              </p>
              <h3 className="font-bold text-lg">
                Spiekeroog – Deutsche Meisterschaft
              </h3>
              <p className="text-sm text-muted-foreground mt-2">
                Die Deutsche Meisterschaft im Schlagball auf der Nordseeinsel
                Spiekeroog – Tradition seit Jahrzehnten.
              </p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <p className="text-lg font-semibold text-sport mb-1">
                Juni
              </p>
              <h3 className="font-bold text-lg">Kieler Woche</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Schlagball-Turnier im Rahmen der berühmten Kieler Woche – Sport
                und Segelfest vereint.
              </p>
            </CardContent>
          </Card>
        </div>
      </ContentSection>

      {/* FAQ */}
      <ContentSection className="bg-muted/50">
        <SectionHeader
          overline="FAQ"
          title="Häufige Fragen zum Sport"
        />
        <div className="max-w-2xl mx-auto">
          <Accordion className="w-full">
            <AccordionItem value="teams">
              <AccordionTrigger>
                Wie viele Spieler hat ein Team?
              </AccordionTrigger>
              <AccordionContent>
                Ein Team besteht aus zwölf oder sechs Spielern, je nach
                Turnierformat.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="age">
              <AccordionTrigger>
                Gibt es eine Altersbeschränkung?
              </AccordionTrigger>
              <AccordionContent>
                Bei uns trainieren Spielerinnen und Spieler von 8 bis 25 Jahren.
                Das Haupttraining ist für 8–25 Jahre, das Hallentraining für
                8–17 Jahre.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="equipment">
              <AccordionTrigger>
                Muss ich eigene Ausrüstung mitbringen?
              </AccordionTrigger>
              <AccordionContent>
                Nein! Wir stellen Leihausrüstung zur Verfügung. Du brauchst nur
                Sportkleidung und Sportschuhe.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="trial">
              <AccordionTrigger>
                Kann ich erstmal nur zuschauen oder testen?
              </AccordionTrigger>
              <AccordionContent>
                Absolut! Komm einfach zu einem Freitagstraining vorbei. Ein
                Probetraining ist kostenlos und unverbindlich.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </ContentSection>

      <CTASection
        title="Lust auf Schlagball?"
        description="Probiere den Sport aus – komm einfach zum nächsten Training vorbei!"
        primaryAction={{
          label: "Trainingszeiten ansehen",
          href: "/training",
        }}
        secondaryAction={{
          label: "Mitglied werden",
          href: "/mitgliedschaft",
        }}
      />
    </>
  );
}
