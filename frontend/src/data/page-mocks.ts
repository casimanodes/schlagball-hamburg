/**
 * Mock-Defaults für die Page-Single-Types in Strapi.
 *
 * Diese Defaults entsprechen den ursprünglichen, statischen Texten der
 * Page-Komponenten. Sie werden gerendert, solange in Strapi noch kein
 * Inhalt für die jeweilige Seite gepflegt wurde.
 */

import type {
  HomePageContent,
  AboutPageContent,
  SportPageContent,
  TrainingPageContent,
  MembershipPageContent,
  GalleryPageContent,
  PlayersPageContent,
  BlogPageContent,
  CalendarPageContent,
  ImprintPageContent,
  PrivacyPageContent,
  GlobalContent,
} from "@/types/pages";

/* ------------------------------------------------------------------ */
/*  Startseite                                                         */
/* ------------------------------------------------------------------ */

export const mockHomePage: HomePageContent = {
  hero: {
    large: true,
    subtitle: "Schlagball Hamburg e.V.",
    title: "Willkommen bei Schlagball Hamburg",
    description:
      "Erlebe den einzigartigen Mannschaftssport – Training, Turniere und Gemeinschaft in Hamburg. Für alle von 8 bis 25 Jahren.",
    primaryActionLabel: "Probetraining vereinbaren",
    primaryActionHref: "/training",
    secondaryActionLabel: "Was ist Schlagball?",
    secondaryActionHref: "/sport",
  },
  stats: [
    { value: "5+", label: "Jahre Training" },
    { value: "8–25", label: "Altersgruppe" },
    { value: "2×", label: "Training pro Woche" },
    { value: "3+", label: "Turniere pro Jahr" },
  ],
  featuresHeader: {
    overline: "Unser Angebot",
    title: "Vielfalt in Training & Wettkampf",
    description:
      "Von regelmäßigem Training bis zu überregionalen Turnieren – entdecke, was Schlagball Hamburg zu bieten hat.",
  },
  features: [
    {
      title: "Der Sport",
      description:
        "Schlagball kombiniert Elemente aus Baseball, Brennball und Völkerball – ein einzigartiges Spielerlebnis.",
      icon: "Volleyball",
      href: "/sport",
    },
    {
      title: "Training",
      description:
        "Regelmäßiges Training für alle Altersgruppen – freitags im Freien und donnerstags in der Halle.",
      icon: "Clock",
      href: "/training",
    },
    {
      title: "Gemeinschaft",
      description:
        "Ein starkes Team mit erfahrenen Trainern, das Spaß und sportliche Entwicklung verbindet.",
      icon: "Users",
      href: "/ueber-uns",
    },
    {
      title: "Turniere",
      description:
        "Vom Winterhuder Herbstturnier bis zur Deutschen Meisterschaft – wir sind dabei.",
      icon: "Trophy",
      href: "/sport#turniere",
    },
  ],
  eventsHeader: {
    overline: "Kalender",
    title: "Nächste Termine",
    description: "Trainingseinheiten, Turniere und Veranstaltungen auf einen Blick.",
  },
  postsHeader: {
    overline: "Aktuelles",
    title: "Neuigkeiten aus dem Verein",
    description:
      "Rückblicke, Ankündigungen und Einblicke in unseren Trainingsalltag.",
  },
  cta: {
    variant: "sport",
    title: "Bereit für Schlagball?",
    description:
      "Komm zum Probetraining vorbei – kostenlos und unverbindlich. Du brauchst nur Sportkleidung und gute Laune!",
    primaryActionLabel: "Mitglied werden",
    primaryActionHref: "/mitgliedschaft",
    secondaryActionLabel: "Training ansehen",
    secondaryActionHref: "/training",
  },
};

/* ------------------------------------------------------------------ */
/*  Über uns                                                           */
/* ------------------------------------------------------------------ */

export const mockAboutPage: AboutPageContent = {
  hero: {
    subtitle: "Über uns",
    title: "Unser Verein",
    description:
      "Schlagball Hamburg e.V. – gegründet aus Leidenschaft für einen einzigartigen Sport. Wir bringen Menschen zusammen und fördern Teamgeist, Bewegung und Freude am Spiel.",
  },
  storyHeader: {
    overline: "Unsere Geschichte",
    title: "Von der Schulbank auf den Sportplatz",
  },
  storyContent: `Was als gemeinsames Projekt an der Winterhuder Reformschule begann, ist heute ein wachsender Sportverein. Seit über 5 Jahren geben Cassio und Mateo jeden Freitag von 14 bis 16 Uhr Training – mittlerweile auch mit Hallentraining am Donnerstag.

Schlagball Hamburg e.V. steht für mehr als nur Sport: Wir sind eine Gemeinschaft, die junge Menschen von 8 bis 25 Jahren zusammenbringt. Unser Ziel ist es, den traditionellen Sport Schlagball in Hamburg lebendig zu halten und neue Generationen dafür zu begeistern.

Mit qualifizierten Trainern, regelmäßigem Training und der Teilnahme an Turnieren wie der Deutschen Meisterschaft auf Spiekeroog und der Kieler Woche bieten wir unseren Mitgliedern ein vielfältiges und spannendes Vereinsleben.`,
  missionHeader: {
    overline: "Mission",
    title: "Was uns antreibt",
  },
  missionItems: [
    {
      title: "Bewegung",
      description:
        "Sport als Grundlage für ein gesundes und aktives Leben – für jede Altersgruppe.",
    },
    {
      title: "Teamgeist",
      description:
        "Zusammen spielen, zusammen wachsen – Schlagball ist Mannschaftssport im besten Sinne.",
    },
    {
      title: "Tradition",
      description:
        "Einen historischen Sport für die Zukunft bewahren und neu interpretieren.",
    },
  ],
  teamHeader: {
    overline: "Das Team",
    title: "Die Menschen hinter dem Verein",
    description:
      "Unsere Trainer und Vorstände bringen jahrelange Erfahrung und Leidenschaft mit.",
  },
  teamMembers: [
    {
      name: "Cassio",
      role: "1. Vorstand & Trainer",
      description:
        "Ich bin Cassio, 23 Jahre alt, Sport-Trainer mit über 8 Jahren Erfahrung und leidenschaftlicher Schlagballer. Ich habe eine C-Trainerlizenz im Badminton und unterrichte professionell Schwimmen. Seit 3 Jahren unterrichte ich gemeinsam mit Mateo Schlagball an der Winterhuder Reformschule.",
      order: 1,
    },
    {
      name: "Mateo",
      role: "2. Vorstand & Trainer",
      description:
        "Ich bin Mateo, 19 Jahre alt, leidenschaftlicher Schlagballer seit 8 Jahren und Trainer seit einem halben Jahrzehnt. Ich besitze die JuLeiCa-Lizenz und studiere Bewegungswissenschaften (Sport) an der Universität Hamburg.",
      order: 2,
    },
  ],
  cta: {
    variant: "sport",
    title: "Werde Teil unseres Teams",
    description: "Lerne uns kennen – komm zum Probetraining oder werde direkt Mitglied.",
    primaryActionLabel: "Mitglied werden",
    primaryActionHref: "/mitgliedschaft",
    secondaryActionLabel: "Zum Training",
    secondaryActionHref: "/training",
  },
};

/* ------------------------------------------------------------------ */
/*  Sport                                                              */
/* ------------------------------------------------------------------ */

export const mockSportPage: SportPageContent = {
  hero: {
    subtitle: "Der Sport",
    title: "Schlagball",
    description:
      "Schlagball kombiniert Elemente aus Baseball, Brennball und Völkerball zu einem einzigartigen Mannschaftssport mit langer Tradition in Deutschland.",
  },
  overviewHeader: {
    overline: "Spielprinzip",
    title: "So funktioniert Schlagball",
  },
  overviewContent: `Das Schlagballspiel ist ein Mannschaftssport, bei dem sich zwei Parteien von je zwölf oder auch sechs Spielern gegenüberstehen. Die Teams kämpfen um das Schlagrecht und die höhere Punktzahl innerhalb einer festen Spieldauer.

Die **Schlagpartei** verteidigt das Schlagrecht. Die Spieler schlagen den Ball ins Spielfeld und laufen durch das Feld zu einem Mal und zurück, um Punkte zu sammeln.

Die **Feldpartei** versucht, das Schlagrecht zu erringen. Sie fängt geschlagene Bälle, kreist laufende Schläger ein, wirft sie ab, treibt sie über die Grenzen des Lauffeldes oder wirft den Ball zurück ins Schlagmal.

Bei erfolgreichem Feldspiel erhält die Feldpartei das Schlagrecht und wird zur neuen Schlagpartei – so wechseln sich die Rollen dynamisch ab.`,
  pointsHeader: {
    overline: "Regeln",
    title: "Punktearten im Schlagball",
    description:
      "Es gibt vier verschiedene Arten, Punkte zu erzielen – jede mit eigenen Regeln und Voraussetzungen.",
  },
  points: [
    {
      name: "Laufpunkt",
      icon: "Zap",
      description:
        "Schafft es ein Spieler der Schlagmannschaft, nach Erwerb des Laufrechts zu einer der Tickstangen und zurück ins Schlagmal zu laufen, ohne dass zwischenzeitlich ein Wechsel stattgefunden hat, erhält die Schlagmannschaft einen Laufpunkt.",
    },
    {
      name: "Wechselpunkt",
      icon: "Crosshair",
      description:
        "Wird ein Läufer von einem Spieler der Feldmannschaft abgeworfen, erhält die Feldmannschaft einen Wechselpunkt. Wird ein Läufer durch Abdrängen aus dem Spielfeld zum Wechsel gezwungen, gibt es keinen Wechselpunkt.",
    },
    {
      name: "Fangpunkt",
      icon: "Hand",
      description:
        "Wird der geschlagene Ball von einem Feldspieler direkt aus der Luft, mit einer Hand und ohne Nachgreifen gefangen, erhält die Feldmannschaft einen Fangpunkt. Dies gilt auch bei ins Aus geschlagenen, ungültigen Schlägen.",
    },
    {
      name: "Weitschlagpunkt",
      icon: "Medal",
      description:
        "Schlägt ein Spieler den Ball über das Spielfeld hinaus in das dahinter liegende Weitschlagfeld – also weiter als 70 Meter – erhält die Schlagmannschaft einen Weitschlagpunkt.",
    },
  ],
  equipmentHeader: {
    overline: "Ausrüstung",
    title: "Ball, Schlagholz & mehr",
    description: "Die Ausrüstung im Schlagball ist traditionell und funktional.",
  },
  equipmentCards: [
    {
      title: "Der Schlagball",
      icon: "CircleDot",
      body: `Spielgerät ist ein Lederball – der Schlagball. Das Gewicht des Balles soll vor dem Spiel mindestens 70 g, höchstens 85 g betragen, der Umfang 19 cm bis 21 cm.

Das Leder soll wegen der Blendung im Sonnenschein keine helle Farbe haben. Der Regelball ist rot, jedoch ist mit Zustimmung beider Teams jede Farbe erlaubt.`,
      badges: ["70–85 g", "19–21 cm Umfang", "Leder", "Rot (Standard)"],
    },
    {
      title: "Das Schlagholz (Klippe)",
      icon: "Ruler",
      body: `Das Schlagholz, auch Klippe genannt, darf unbegrenzt lang sein. Es muss aus einheitlichem Naturholz bestehen und im Querschnitt kreisrund sein. Am unteren Ende darf es bis zu 3 cm dick sein.

Das Griffende und der Schaft dürfen dünner sein und mit Handschlinge oder Endknauf versehen sein. Das Schlagende darf nicht künstlich beschwert werden – ein Umwickeln mit Draht, Leder und dergleichen ist verboten.

Jeder Spieler darf sein eigenes Schlagholz benutzen. Alle in das Spiel gebrachten Geräte gelten als Gemeingut.`,
      badges: ["Naturholz", "Kreisrund", "Max. 3 cm Durchmesser", "Unbegrenzte Länge"],
    },
  ],
  fieldHeader: {
    overline: "Spielfeld",
    title: "Das Schlagball-Spielfeld",
    description: "Das Spielfeld hat klare Abmessungen und markierte Zonen.",
  },
  fieldContent: `Das rechteckige Spielfeld ist **70 m × 25 m** mit einem sich anschließenden Weitschlagfeld, das sich aus einer Verlängerung der Diagonalen durch das Spielfeld ergibt.

- Die **Grundlinie** ist das Schlagmal.
- Die gegenüberliegende Linie ist das **Fangmal**.
- 10 m vor dem Fangmal stehen zwei **Tickstangen** mit einem Abstand von 4 m – sie dienen als Laufmale.
- Hinter dem Spielfeld schließt sich in Verlängerung der Diagonalen das **Weitschlagfeld** an.`,
  fieldBadges: [
    "70 × 25 m",
    "Schlagmal (Grundlinie)",
    "Fangmal (Gegenüber)",
    "Tickstangen (4 m Abstand)",
    "Weitschlagfeld (70 m+)",
  ],
  tournamentsHeader: {
    overline: "Turniere",
    title: "Wettkämpfe & Meisterschaften",
    description: "Schlagball wird auf regionaler und nationaler Ebene gespielt.",
  },
  tournaments: [
    {
      period: "September",
      title: "Winterhuder Herbstturnier",
      description:
        "Unser eigenes Turnier – jedes Jahr organisiert vom Verein. Ein Highlight im Schlagball-Kalender.",
    },
    {
      period: "Himmelfahrt",
      title: "Spiekeroog – Deutsche Meisterschaft",
      description:
        "Die Deutsche Meisterschaft im Schlagball auf der Nordseeinsel Spiekeroog – Tradition seit Jahrzehnten.",
    },
    {
      period: "Juni",
      title: "Kieler Woche",
      description:
        "Schlagball-Turnier im Rahmen der berühmten Kieler Woche – Sport und Segelfest vereint.",
    },
  ],
  faqHeader: {
    overline: "FAQ",
    title: "Häufige Fragen zum Sport",
  },
  faqs: [
    {
      question: "Wie viele Spieler hat ein Team?",
      answer:
        "Ein Team besteht aus zwölf oder sechs Spielern, je nach Turnierformat.",
    },
    {
      question: "Gibt es eine Altersbeschränkung?",
      answer:
        "Bei uns trainieren Spielerinnen und Spieler von 8 bis 25 Jahren. Das Haupttraining ist für 8–25 Jahre, das Hallentraining für 8–17 Jahre.",
    },
    {
      question: "Muss ich eigene Ausrüstung mitbringen?",
      answer:
        "Nein! Wir stellen Leihausrüstung zur Verfügung. Du brauchst nur Sportkleidung und Sportschuhe.",
    },
    {
      question: "Kann ich erstmal nur zuschauen oder testen?",
      answer:
        "Absolut! Komm einfach zu einem Freitagstraining vorbei. Ein Probetraining ist kostenlos und unverbindlich.",
    },
  ],
  cta: {
    variant: "sport",
    title: "Lust auf Schlagball?",
    description:
      "Probiere den Sport aus – komm einfach zum nächsten Training vorbei!",
    primaryActionLabel: "Trainingszeiten ansehen",
    primaryActionHref: "/training",
    secondaryActionLabel: "Mitglied werden",
    secondaryActionHref: "/mitgliedschaft",
  },
};

/* ------------------------------------------------------------------ */
/*  Training                                                           */
/* ------------------------------------------------------------------ */

export const mockTrainingPage: TrainingPageContent = {
  hero: {
    subtitle: "Training",
    title: "Trainiere mit uns",
    description:
      "Regelmäßiges Training für alle Altersgruppen – komm vorbei und werde Teil des Teams.",
    primaryActionLabel: "Probetraining anfragen",
    primaryActionHref: "/mitgliedschaft#anmeldung",
  },
  sessionsHeader: {
    overline: "Trainingszeiten",
    title: "Unsere Trainingseinheiten",
    description: "Zwei Trainingseinheiten pro Woche – drinnen und draußen.",
  },
  sessions: [
    {
      title: "Haupttraining (Freitag)",
      icon: "Sun",
      day: "Freitags",
      time: "14:00 – 16:00 Uhr",
      location: "Meerweinstraße 26–28, Hamburg",
      ageRange: "8–25 Jahre",
      description:
        "Unser reguläres Freitagstraining im Freien. Hier trainieren alle Altersgruppen gemeinsam – von Anfängern bis zu erfahrenen Spielern.",
      features: [
        "Technik & Taktik",
        "Spielpraxis",
        "Mannschaftsaufstellung",
        "Turniervorbereitungen",
      ],
    },
    {
      title: "Hallentraining (Donnerstag)",
      icon: "Building2",
      day: "Donnerstags",
      time: "17:00 – 19:00 Uhr",
      location: "Meerweinstraße 26–28, Hamburg",
      ageRange: "8–17 Jahre",
      description:
        "Indoor-Training mit Fokus auf Technik, Koordination und Taktik. Die perfekte Ergänzung zum Freilufttraining.",
      features: ["Techniktraining", "Koordination", "Kondition", "Taktische Übungen"],
    },
  ],
  trialHeader: {
    overline: "Probetraining",
    title: "Einfach vorbeikommen!",
    description:
      "Du möchtest Schlagball ausprobieren? Kein Problem – komm einfach zu einem Freitagstraining vorbei.",
  },
  trialContent: `Ein Probetraining ist **kostenlos und unverbindlich**. Du brauchst nur Sportkleidung und Sportschuhe – die Ausrüstung stellen wir.

Wir trainieren jeden Freitag von 14 bis 16 Uhr auf dem Platz an der Meerweinstraße 26–28 in Hamburg. Einfach vorbeikommen und mitmachen!`,
  trialButtonLabel: "Mitglied werden",
  trialButtonHref: "/mitgliedschaft",
  eventsHeader: {
    overline: "Termine",
    title: "Nächste Trainingstage",
    description: "Die kommenden Termine im Überblick.",
  },
  eventsAllLinkLabel: "Alle Termine ansehen",
  cta: {
    variant: "sport",
    title: "Bereit für dein erstes Training?",
    description:
      "Melde dich an oder komm einfach freitags von 14 bis 16 Uhr vorbei.",
    primaryActionLabel: "Jetzt Mitglied werden",
    primaryActionHref: "/mitgliedschaft",
  },
};

/* ------------------------------------------------------------------ */
/*  Mitgliedschaft                                                     */
/* ------------------------------------------------------------------ */

// Diese Mock-Daten entsprechen dem aktuellen Strapi-Stand (Single Type
// "page-membership", Stand 2026-05-19). Sie dienen als Fallback, falls
// Strapi nicht erreichbar ist – so zeigt die Seite trotzdem die echten
// Vereinsinhalte statt generischer Platzhalter.
export const mockMembershipPage: MembershipPageContent = {
  hero: {
    subtitle: "Mitgliedschaft",
    title: "Werde Teil von Schlagball Hamburg!",
    description:
      "Günstige und faire Mitgliedsbeiträge – für regelmäßiges Training, Turniere und eine starke Gemeinschaft.",
  },
  plansHeader: {
    overline: "Beiträge",
    title: "Mitgliedschaften",
    description: "Wähle den Plan, der zu dir passt.",
  },
  plans: [
    {
      name: "Regulär",
      price: 9,
      interval: "Monat",
      description: "Schlagballtraining von Lizensierten Trainern",
      features: [
        "1× Training pro Woche",
        "Zugang zu Vereinsturnieren",
        "Gemeinschaft & Teamgeist",
        "Leihausrüstung inklusive",
      ],
      highlighted: true,
    },
    {
      name: "Fördermitglied",
      price: 5,
      interval: "Monat",
      description:
        "Du bist Fördermitglied des Schlagball Hamburg e.V.. Die Teilnahme am Training ist nicht eingeschlossen",
      features: ["Förderung des Schlagball Hamburg e.V."],
      highlighted: false,
    },
  ],
  stepsHeader: {
    overline: "Anmeldung",
    title: "So wirst du Mitglied",
    description: "In drei einfachen Schritten zum Vereinsmitglied.",
  },
  steps: [
    {
      step: 1,
      title: "Anmeldeformular herunterladen",
      description:
        "Lade das Anmeldeformular herunter und fülle es vollständig aus.",
      icon: "Download",
    },
    {
      step: 2,
      title: "Formular einreichen",
      description: "Sende das ausgefüllte Formular per Post oder E-Mail an uns.",
      icon: "Mail",
    },
    {
      step: 3,
      title: "Willkommen im Verein!",
      description:
        "Nach Eingang deiner Anmeldung bist du offiziell Mitglied bei Schlagball Hamburg.",
      icon: "CheckCircle2",
    },
  ],
  downloadCardTitle: "Mitgliedsantrag herunterladen",
  downloadCardDescription:
    "Lade das Formular herunter, fülle es aus und sende es an uns. info@schlagball-hamburg.de.",
  downloadCardButtonLabel: "Antrag herunterladen (PDF)",
  downloadCardButtonHref: "/antragherunterladen",
  downloadFile: {
    id: 7,
    url: "https://motivated-life-96fc7c8d59.media.strapiapp.com/Aufnahmeantrag_S_H_e_V_3fa8965337.pdf",
    name: "Aufnahmeantrag_S.H.e.V..pdf",
    mime: "application/pdf",
    size: 93.9,
    ext: ".pdf",
  },
  benefitsHeader: {
    overline: "Vorteile",
    title: "Warum Mitglied werden?",
  },
  benefits: [
    {
      title: "Wöchentliches Training - Freitags 13:15-15:15 Uhr",
      text: "Bis zu 2× pro Woche professionell geleitetes Training.",
    },
    {
      title: "Turniere & Wettkämpfe",
      text: "Teilnahme an regionalen und überregionalen Turnieren.",
    },
    {
      title: "Gemeinschaft",
      text: 'Eine starke Gemeinschaft als Schlagballteam "Hamburg"',
    },
    {
      title: "Erfahrene Trainer",
      text: "Qualifizierte Trainer mit jahrelanger Erfahrung",
    },
    {
      title: "Fester Trainingsplatz",
      text: "Training auf dem Sportplatz der Winterhuder Reformschule",
    },
    {
      title: "Fairer Beitrag",
      text: "Günstiger Mitgliedsbeitrag",
    },
  ],
};

/* ------------------------------------------------------------------ */
/*  Galerie                                                            */
/* ------------------------------------------------------------------ */

export const mockGalleryPage: GalleryPageContent = {
  hero: {
    subtitle: "Galerie",
    title: "Bilder & Eindrücke",
    description:
      "Training, Turniere und Vereinsleben – erlebe Schlagball Hamburg in Bildern.",
  },
  sectionHeader: {
    overline: "Fotogalerie",
    title: "Unsere schönsten Momente",
    description:
      "Durchstöbere unsere Bilder nach Kategorie oder lass dich einfach inspirieren.",
  },
  cta: {
    variant: "sport",
    title: "Sei beim nächsten Foto dabei!",
    description: "Werde Teil des Teams und erlebe Schlagball hautnah.",
    primaryActionLabel: "Jetzt Mitglied werden",
    primaryActionHref: "/mitgliedschaft",
    secondaryActionLabel: "Trainingszeiten ansehen",
    secondaryActionHref: "/training",
  },
};

/* ------------------------------------------------------------------ */
/*  Spieler                                                            */
/* ------------------------------------------------------------------ */

export const mockPlayersPage: PlayersPageContent = {
  hero: {
    subtitle: "Unser Team",
    title: "Unsere Spieler",
    description:
      "Die Spielerinnen und Spieler, die Schlagball Hamburg ausmachen – mit Leidenschaft und Teamgeist.",
  },
  sectionHeader: {
    overline: "Mannschaft",
    title: "Alle Spieler",
  },
  playerCountSuffix: "aktive Spielerinnen und Spieler",
  emptyState: {
    title: "Noch keine Spielerprofile",
    description:
      "Spielerprofile werden über das CMS gepflegt und erscheinen hier, sobald sie angelegt wurden.",
  },
};

/* ------------------------------------------------------------------ */
/*  Blog                                                               */
/* ------------------------------------------------------------------ */

export const mockBlogPage: BlogPageContent = {
  hero: {
    subtitle: "Aktuelles",
    title: "Blog & Neuigkeiten",
    description: "Rückblicke, Ankündigungen und Einblicke aus dem Vereinsleben.",
  },
  sectionHeader: {
    overline: "Beiträge",
    title: "Alle Artikel",
  },
  postCountSuffix: "Beiträge",
  emptyState: {
    title: "Noch keine Beiträge",
    description:
      "Blog-Beiträge werden über das CMS erstellt und erscheinen hier automatisch.",
  },
};

/* ------------------------------------------------------------------ */
/*  Kalender                                                           */
/* ------------------------------------------------------------------ */

export const mockCalendarPage: CalendarPageContent = {
  hero: {
    subtitle: "Termine",
    title: "Kalender",
    description:
      "Trainingstage, Turniere und Veranstaltungen – alle Termine auf einen Blick.",
  },
  emptyState: {
    title: "Noch keine Termine",
    description:
      "Termine werden über das CMS gepflegt und erscheinen hier automatisch.",
  },
  upcomingTabLabel: "Kommende Termine",
  pastTabLabel: "Vergangene Termine",
  filterAllLabel: "Alle",
};

/* ------------------------------------------------------------------ */
/*  Impressum                                                          */
/* ------------------------------------------------------------------ */

export const mockImprintPage: ImprintPageContent = {
  hero: {
    subtitle: "Rechtliches",
    title: "Impressum",
    description: "Angaben gemäß § 5 TMG",
  },
  vereinsangabenHeader: {
    overline: "Angaben gemäß § 5 TMG",
    title: "Schlagball Hamburg e.V.",
  },
  vereinsangaben: `Loki-Schmidt-Platz 15
22297 Hamburg

### Vertretungsberechtigte Vorstände

- Cassius Kompala (1. Vorstand)
- Mateo Sanchez (2. Vorstand)

### Registereintrag

Eingetragen im Vereinsregister.
Registergericht: Amtsgericht Hamburg
Registernummer: VR 22890`,
  kontaktHeader: {
    overline: "Kontakt",
    title: "Erreichbarkeit",
  },
  kontakte: [
    {
      name: "Cassius Kompala",
      role: "1. Vorstand",
      email: "cassius.kompala@schlagball-hamburg.de",
      phone: "0176 / 219 272 02",
      phoneHref: "+4917621927202",
    },
    {
      name: "Mateo Sanchez",
      role: "2. Vorstand",
      email: "mateo.sanchez@schlagball-hamburg.de",
      phone: "0176 / 621 548 93",
      phoneHref: "+4917662154893",
    },
  ],
  haftungSections: [
    {
      overline: "Haftung",
      title: "Haftung für Inhalte",
      body: "Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.",
    },
    {
      overline: "Haftung",
      title: "Haftung für Links",
      body: "Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.",
    },
    {
      overline: "Haftung",
      title: "Urheberrecht",
      body: "Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.",
    },
  ],
};

/* ------------------------------------------------------------------ */
/*  Datenschutz                                                        */
/* ------------------------------------------------------------------ */

export const mockPrivacyPage: PrivacyPageContent = {
  hero: {
    subtitle: "Rechtliches",
    title: "Datenschutzerklärung",
    description: "Informationen zum Umgang mit Ihren Daten auf unserer Webseite.",
  },
  sections: [
    {
      overline: "Datenschutz",
      title: "Allgemeine Hinweise",
      background: "default",
      body: "Der Schutz Ihrer Daten ist uns wichtig. Diese Datenschutzerklärung informiert Sie darüber, wie wir mit Daten auf unserer Webseite umgehen.",
    },
    {
      overline: "§ 1",
      title: "Verantwortliche Stelle",
      background: "muted",
      body: `Verantwortlich für diese Webseite ist:

**Schlagball Hamburg e.V.**
Loki-Schmidt-Platz 15
22297 Hamburg

Vertreten durch:
Cassius Kompala (1. Vorstand)
Mateo Sanchez (2. Vorstand)

Kontakt: cassius.kompala@schlagball-hamburg.de`,
    },
    {
      overline: "§ 2",
      title: "Keine Erhebung personenbezogener Daten",
      background: "default",
      body: `Unsere Webseite erhebt, speichert oder verarbeitet **keine personenbezogenen Daten** der Besucher. Es gibt:

- keine Kontaktformulare
- keine Benutzerkonten oder Login-Bereiche
- keine Newsletter-Anmeldung
- keine Analyse- oder Tracking-Tools (z. B. Google Analytics)
- keine eingebundenen Social-Media-Plugins
- keine Weitergabe von Daten an Dritte`,
    },
    {
      overline: "§ 3",
      title: "Cookies",
      background: "muted",
      body: `Diese Webseite verwendet **einen einzigen technisch notwendigen Cookie**. Dieser Cookie speichert ausschließlich, ob Sie den Cookie-Hinweis auf dieser Webseite bereits bestätigt haben.

- **Name:** cookie_consent
- **Zweck:** Speicherung der Cookie-Banner-Bestätigung
- **Speicherdauer:** 30 Tage
- **Typ:** Technisch notwendig
- **Drittanbieter:** Nein

Es werden **keine Marketing-, Tracking- oder Analyse-Cookies** eingesetzt. Eine Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO ist für diesen Cookie nicht erforderlich, da er ausschließlich technisch notwendig ist (Art. 6 Abs. 1 lit. f DSGVO).`,
    },
    {
      overline: "§ 4",
      title: "SSL-/TLS-Verschlüsselung",
      background: "default",
      body: "Diese Webseite nutzt aus Sicherheitsgründen eine **SSL- bzw. TLS-Verschlüsselung** (erkennbar am Schloss-Symbol in Ihrem Browser und dem Protokoll https://). Dadurch wird die Kommunikation zwischen Ihrem Browser und unserem Server vor dem Zugriff Dritter geschützt.",
    },
    {
      overline: "§ 5",
      title: "Betroffenenrechte",
      background: "muted",
      body: `Da wir **keine personenbezogenen Daten** erheben oder verarbeiten, entfallen die üblichen Betroffenenrechte nach DSGVO (z. B. Auskunft, Löschung, Berichtigung) im Zusammenhang mit dieser Webseite.

Sollten Sie dennoch Fragen zum Datenschutz haben, können Sie uns jederzeit unter cassius.kompala@schlagball-hamburg.de kontaktieren.`,
    },
    {
      overline: "§ 6",
      title: "Aktualität und Änderungen",
      background: "default",
      body: `Diese Datenschutzerklärung ist aktuell gültig und hat den Stand April 2026.

Wir behalten uns vor, diese Datenschutzerklärung bei Bedarf anzupassen, um sie an geänderte rechtliche Anforderungen oder Änderungen unserer Webseite anzupassen.`,
    },
  ],
};

/* ------------------------------------------------------------------ */
/*  Globale Inhalte                                                    */
/* ------------------------------------------------------------------ */

export const mockGlobalContent: GlobalContent = {
  siteName: "Schlagball Hamburg",
  siteDescription:
    "Schlagball Hamburg e.V. – Der Verein für Schlagball in Hamburg. Training, Turniere und Gemeinschaft.",
  contactEmail: "info@schlagball-hamburg.de",
  instagramHandle: "schlagball.winterhude",
  instagramUrl: "https://instagram.com/schlagball.winterhude",
  trainingAddress: "Meerweinstraße 26–28, Hamburg",
  footerBrandText:
    "Schlagball Hamburg e.V. – Dein Verein für Schlagball in Hamburg. Training, Turniere und Gemeinschaft seit Jahren.",
  footerNavigationHeading: "Navigation",
  footerMoreHeading: "Mehr",
  footerContactHeading: "Kontakt",
  footerCopyrightText: "Alle Rechte vorbehalten.",
  footerTagline: "Mit Leidenschaft für den Sport.",
  headerCtaLabel: "Mitglied werden",
  headerCtaHref: "/mitgliedschaft",
  navItems: [
    { label: "Startseite", href: "/" },
    { label: "Über uns", href: "/ueber-uns" },
    { label: "Der Sport", href: "/sport" },
    { label: "Training", href: "/training" },
    { label: "Mitgliedschaft", href: "/mitgliedschaft" },
    { label: "Spieler", href: "/spieler" },
    { label: "Galerie", href: "/galerie" },
    { label: "Blog", href: "/blog" },
    { label: "Kalender", href: "/kalender" },
  ],
};
