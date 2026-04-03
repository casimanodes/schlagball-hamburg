import Link from "next/link";
import { buttonVariants } from "@/lib/button-variants";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-32 px-4 text-center">
      <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-2">
        404
      </p>
      <h1 className="text-4xl font-bold mb-3">Seite nicht gefunden</h1>
      <p className="text-muted-foreground max-w-md mb-8">
        Die angeforderte Seite existiert leider nicht. Vielleicht wurde sie
        verschoben oder gelöscht.
      </p>
      <Link href="/" className={buttonVariants()}>
        Zur Startseite
      </Link>
    </div>
  );
}
