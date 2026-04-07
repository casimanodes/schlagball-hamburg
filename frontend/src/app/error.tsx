"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[error boundary]", error);
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-4 text-center max-w-md px-4">
        <AlertTriangle className="h-12 w-12 text-muted-foreground" />
        <h2 className="text-xl font-semibold">
          Daten konnten nicht geladen werden
        </h2>
        <p className="text-sm text-muted-foreground">
          Die Verbindung zum Server ist vorübergehend nicht möglich. Bitte
          versuche es in wenigen Augenblicken erneut.
        </p>
        <button
          onClick={reset}
          className="mt-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground hover:bg-accent/90 transition-colors"
        >
          Erneut versuchen
        </button>
      </div>
    </div>
  );
}
