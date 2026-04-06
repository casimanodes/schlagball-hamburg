"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NAV_ITEMS, SITE_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-primary-foreground font-bold text-sm">
            SH
          </div>
          <span className="hidden font-bold text-lg sm:inline-block">
            {SITE_NAME}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "px-3 py-2 text-sm font-medium rounded-md transition-colors hover:bg-muted",
                pathname === item.href
                  ? "text-primary bg-primary/5"
                  : "text-muted-foreground",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-2">
          <Link
            href="/mitgliedschaft"
            className={cn(
              buttonVariants({ size: "lg" }),
              "bg-accent text-accent-foreground hover:bg-accent/90 font-semibold rounded-xl h-11 px-6 shadow-md hover:shadow-lg ring-1 ring-black/5 transition-all focus-visible:ring-2 focus-visible:ring-accent/30",
            )}
          >
            Mitglied werden
          </Link>
        </div>

        {/* Mobile menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            className="lg:hidden"
            render={
              <Button variant="ghost" size="icon" aria-label="Menü öffnen" />
            }
          >
            <Menu className="h-5 w-5" />
          </SheetTrigger>
          <SheetContent side="right" className="w-80">
            <SheetHeader>
              <SheetTitle className="text-left">{SITE_NAME}</SheetTitle>
            </SheetHeader>
            <nav className="mt-6 flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "px-3 py-2.5 text-sm font-medium rounded-md transition-colors hover:bg-muted",
                    pathname === item.href
                      ? "text-primary bg-primary/5"
                      : "text-muted-foreground",
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-4 pt-4 border-t">
                <Link
                  href="/mitgliedschaft"
                  onClick={() => setOpen(false)}
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold rounded-xl h-11 px-6 shadow-md hover:shadow-lg ring-1 ring-black/5 transition-all focus-visible:ring-2 focus-visible:ring-accent/30",
                  )}
                >
                  Mitglied werden
                </Link>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
