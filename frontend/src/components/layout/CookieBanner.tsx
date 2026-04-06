"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie } from "lucide-react";
import { cn } from "@/lib/utils";

const COOKIE_NAME = "cookie_consent";
const COOKIE_DAYS = 30;

function setCookie(name: string, value: string, days: number) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${value};expires=${expires};path=/;SameSite=Lax`;
}

function getCookie(name: string): string | null {
  const match = document.cookie.match(
    new RegExp("(^| )" + name + "=([^;]+)")
  );
  return match ? match[2] : null;
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show banner if cookie_consent hasn't been set
    if (!getCookie(COOKIE_NAME)) {
      setVisible(true);
    }
  }, []);

  function handleAccept() {
    setCookie(COOKIE_NAME, "accepted", COOKIE_DAYS);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      className={cn(
        "fixed bottom-0 inset-x-0 z-[100] p-4 md:p-6",
        "animate-in slide-in-from-bottom duration-300"
      )}
    >
      <div className="container max-w-4xl">
        <div className="rounded-xl border bg-background shadow-lg p-4 md:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex items-start gap-3 flex-1">
            <Cookie className="h-5 w-5 text-accent mt-0.5 shrink-0" />
            <p className="text-sm text-muted-foreground leading-relaxed">
              Diese Webseite verwendet einen einzigen technisch notwendigen
              Cookie, der speichert, ob Sie diesen Hinweis bestätigt haben.{" "}
              <strong>Es werden keine Tracking- oder Marketing-Cookies verwendet.</strong>{" "}
              Mehr dazu in unserer{" "}
              <Link
                href="/datenschutz"
                className="text-accent hover:underline font-medium"
              >
                Datenschutzerklärung
              </Link>
              .
            </p>
          </div>
          <button
            onClick={handleAccept}
            className="shrink-0 inline-flex items-center justify-center rounded-lg bg-accent text-accent-foreground px-5 py-2.5 text-sm font-semibold shadow-sm hover:bg-accent/90 transition-all focus-visible:ring-2 focus-visible:ring-accent/30 focus-visible:ring-offset-2 active:translate-y-px"
          >
            Verstanden
          </button>
        </div>
      </div>
    </div>
  );
}
