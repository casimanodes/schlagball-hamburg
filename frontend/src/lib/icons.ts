/**
 * Icon-Mapping zwischen Strapi-Strings und lucide-react-Komponenten.
 *
 * Im Strapi-Admin wählen Redakteure einen Icon-Namen aus einer Enum,
 * im Frontend wird daraus die echte Komponente.
 */

import {
  Volleyball,
  Clock,
  Users,
  Trophy,
  Sun,
  Building2,
  MapPin,
  CheckCircle2,
  Download,
  Mail,
  FileText,
  Crosshair,
  Hand,
  Zap,
  Medal,
  CircleDot,
  Ruler,
  CalendarDays,
  Phone,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  Volleyball,
  Clock,
  Users,
  Trophy,
  Sun,
  Building2,
  MapPin,
  CheckCircle2,
  Download,
  Mail,
  FileText,
  Crosshair,
  Hand,
  Zap,
  Medal,
  CircleDot,
  Ruler,
  CalendarDays,
  Phone,
};

export function resolveIcon(
  name: string | null | undefined,
  fallback: LucideIcon = Volleyball,
): LucideIcon {
  if (!name) return fallback;
  return ICONS[name] ?? fallback;
}
