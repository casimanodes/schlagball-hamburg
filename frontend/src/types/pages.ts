/**
 * Page-Inhalte aus Strapi (Single Types).
 *
 * Jeder Type entspricht einem Strapi Single Type unter
 * `strapi-cms/src/api/page-*` und enthält die redaktionellen Texte
 * der jeweiligen Seite.
 */

/* ------------------------------------------------------------------ */
/*  Wiederverwendbare Component-Types (Strapi `shared.*`)              */
/* ------------------------------------------------------------------ */

export interface HeroBlock {
  subtitle?: string | null;
  title: string;
  description?: string | null;
  primaryActionLabel?: string | null;
  primaryActionHref?: string | null;
  secondaryActionLabel?: string | null;
  secondaryActionHref?: string | null;
  large?: boolean | null;
}

export interface CtaBlock {
  title: string;
  description: string;
  variant: "accent" | "sport" | "primary";
  primaryActionLabel: string;
  primaryActionHref: string;
  secondaryActionLabel?: string | null;
  secondaryActionHref?: string | null;
}

export interface SectionHeaderBlock {
  overline?: string | null;
  title: string;
  description?: string | null;
}

export interface FeatureItemBlock {
  title: string;
  description: string;
  icon?: string | null;
  href?: string | null;
}

export interface StatItemBlock {
  value: string;
  label: string;
}

export interface FaqItemBlock {
  question: string;
  answer: string;
}

export interface NavItemBlock {
  label: string;
  href: string;
}

export interface EmptyStateBlock {
  title: string;
  description: string;
}

/* ------------------------------------------------------------------ */
/*  Page-spezifische Component-Types (Strapi `page.*`)                 */
/* ------------------------------------------------------------------ */

export interface MissionItemBlock {
  title: string;
  description: string;
}

export interface PointTypeBlock {
  name: string;
  icon: string;
  description: string;
}

export interface EquipmentCardBlock {
  title: string;
  icon: string;
  body: string;
  badges?: string[] | null;
}

export interface TournamentCardBlock {
  period: string;
  title: string;
  description: string;
}

export interface TrainingSessionBlock {
  title: string;
  icon: string;
  day: string;
  time: string;
  location: string;
  ageRange: string;
  description: string;
  features: string[];
}

export interface MembershipStepBlock {
  step: number;
  title: string;
  description: string;
  icon: string;
}

export interface BenefitItemBlock {
  title: string;
  text: string;
}

export interface MembershipPlanBlock {
  name: string;
  price: number;
  interval: string;
  description: string;
  features: string[];
  highlighted?: boolean | null;
}

export interface PageTeamMemberBlock {
  name: string;
  role: string;
  description: string;
  image?: { url: string } | null;
  order?: number | null;
}

export interface ContactPersonBlock {
  name: string;
  role: string;
  email?: string | null;
  phone?: string | null;
  phoneHref?: string | null;
}

export interface LegalSectionBlock {
  overline?: string | null;
  title: string;
  body: string;
  background?: "default" | "muted" | null;
}

/* ------------------------------------------------------------------ */
/*  Single Type: Page-Contents                                         */
/* ------------------------------------------------------------------ */

export interface HomePageContent {
  hero: HeroBlock;
  stats: StatItemBlock[];
  featuresHeader: SectionHeaderBlock;
  features: FeatureItemBlock[];
  eventsHeader: SectionHeaderBlock;
  postsHeader: SectionHeaderBlock;
  cta: CtaBlock;
}

export interface AboutPageContent {
  hero: HeroBlock;
  storyHeader: SectionHeaderBlock;
  storyContent: string;
  missionHeader: SectionHeaderBlock;
  missionItems: MissionItemBlock[];
  teamHeader: SectionHeaderBlock;
  teamMembers: PageTeamMemberBlock[];
  cta: CtaBlock;
}

export interface SportPageContent {
  hero: HeroBlock;
  overviewHeader: SectionHeaderBlock;
  overviewContent: string;
  pointsHeader: SectionHeaderBlock;
  points: PointTypeBlock[];
  equipmentHeader: SectionHeaderBlock;
  equipmentCards: EquipmentCardBlock[];
  fieldHeader: SectionHeaderBlock;
  fieldContent: string;
  fieldBadges: string[];
  tournamentsHeader: SectionHeaderBlock;
  tournaments: TournamentCardBlock[];
  faqHeader: SectionHeaderBlock;
  faqs: FaqItemBlock[];
  cta: CtaBlock;
}

export interface TrainingPageContent {
  hero: HeroBlock;
  sessionsHeader: SectionHeaderBlock;
  sessions: TrainingSessionBlock[];
  trialHeader: SectionHeaderBlock;
  trialContent: string;
  trialButtonLabel: string;
  trialButtonHref: string;
  eventsHeader: SectionHeaderBlock;
  eventsAllLinkLabel: string;
  cta: CtaBlock;
}

export interface MembershipPageContent {
  hero: HeroBlock;
  plansHeader: SectionHeaderBlock;
  plans: MembershipPlanBlock[];
  stepsHeader: SectionHeaderBlock;
  steps: MembershipStepBlock[];
  downloadCardTitle: string;
  downloadCardDescription: string;
  downloadCardButtonLabel: string;
  downloadCardButtonHref: string;
  benefitsHeader: SectionHeaderBlock;
  benefits: BenefitItemBlock[];
}

export interface GalleryPageContent {
  hero: HeroBlock;
  sectionHeader: SectionHeaderBlock;
  cta: CtaBlock;
}

export interface PlayersPageContent {
  hero: HeroBlock;
  sectionHeader: SectionHeaderBlock;
  playerCountSuffix: string;
  emptyState: EmptyStateBlock;
}

export interface BlogPageContent {
  hero: HeroBlock;
  sectionHeader: SectionHeaderBlock;
  postCountSuffix: string;
  emptyState: EmptyStateBlock;
}

export interface CalendarPageContent {
  hero: HeroBlock;
  emptyState: EmptyStateBlock;
  upcomingTabLabel: string;
  pastTabLabel: string;
  filterAllLabel: string;
}

export interface ImprintPageContent {
  hero: HeroBlock;
  vereinsangabenHeader: SectionHeaderBlock;
  vereinsangaben: string;
  kontaktHeader: SectionHeaderBlock;
  kontakte: ContactPersonBlock[];
  haftungSections: LegalSectionBlock[];
}

export interface PrivacyPageContent {
  hero: HeroBlock;
  sections: LegalSectionBlock[];
}

export interface GlobalContent {
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  instagramHandle: string;
  instagramUrl: string;
  trainingAddress: string;
  footerBrandText: string;
  footerNavigationHeading: string;
  footerMoreHeading: string;
  footerContactHeading: string;
  footerCopyrightText: string;
  footerTagline: string;
  headerCtaLabel: string;
  headerCtaHref: string;
  navItems: NavItemBlock[];
}
