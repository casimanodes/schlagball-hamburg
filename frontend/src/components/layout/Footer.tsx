import Link from "next/link";
import { ExternalLink, Mail, MapPin } from "lucide-react";
import type { GlobalContent } from "@/types/pages";

interface FooterProps {
  global: GlobalContent;
}

export default function Footer({ global }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const navItems = global.navItems;

  return (
    <footer className="border-t bg-primary text-primary-foreground">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground font-bold text-sm">
                SH
              </div>
              <span className="font-bold text-lg">{global.siteName}</span>
            </div>
            <p className="text-sm text-primary-foreground/70 leading-relaxed">
              {global.footerBrandText}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 text-primary-foreground/50">
              {global.footerNavigationHeading}
            </h3>
            <ul className="space-y-2">
              {navItems.slice(0, 6).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More links */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 text-primary-foreground/50">
              {global.footerMoreHeading}
            </h3>
            <ul className="space-y-2">
              {navItems.slice(6).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/impressum"
                  className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  Impressum
                </Link>
              </li>
              <li>
                <Link
                  href="/datenschutz"
                  className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  Datenschutz
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 text-primary-foreground/50">
              {global.footerContactHeading}
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${global.contactEmail}`}
                  className="flex items-center gap-2 text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  <Mail className="h-4 w-4 shrink-0" />
                  {global.contactEmail}
                </a>
              </li>
              <li>
                <a
                  href={global.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  <ExternalLink className="h-4 w-4 shrink-0" />
                  Instagram: @{global.instagramHandle}
                </a>
              </li>
              <li>
                <span className="flex items-start gap-2 text-sm text-primary-foreground/70">
                  <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                  {global.trainingAddress}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-primary-foreground/10 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-primary-foreground/50">
            &copy; {currentYear} {global.siteName} e.V. {global.footerCopyrightText}
          </p>
          <p className="text-xs text-primary-foreground/40">
            {global.footerTagline}
          </p>
        </div>
      </div>
    </footer>
  );
}
