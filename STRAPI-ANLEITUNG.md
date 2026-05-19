# Strapi-Anleitung: Wie du Inhalte in der Webseite änderst

## TL;DR

**Bevor ein Single Type auf der Webseite erscheint, musst du ihn EINMAL im Strapi-Admin speichern und publizieren.** Solange das nicht passiert ist, antwortet die API mit 404 und die Webseite zeigt die Default-Inhalte (Mocks).

## Status prüfen

Im `frontend/`-Verzeichnis:

```bash
npm run check-strapi
```

Das zeigt dir für jeden Endpoint, ob er HTTP 200 (= Daten vorhanden) oder 404 (= Datensatz fehlt) liefert.

Beispiel-Output:
```
✅ 200 OK   Single Type /page-home       → 2/7 Felder befüllt
⚠️  404     Single Type /page-about      → noch nicht angelegt
```

## Wie lege ich einen Single Type an?

1. Öffne **Strapi-Admin** → linke Sidebar → **Content Manager**
2. Unter **Single Types** den gewünschten Eintrag wählen (z.B. "Über-Uns Seite")
3. Felder ausfüllen – **du musst nicht alle Felder befüllen!** Leere Felder werden auf der Webseite mit den Default-Texten aufgefüllt.
4. Oben rechts auf **Save** klicken
5. Dann auf **Publish** klicken (sehr wichtig! Ohne Publish kommt die API nicht ran)

Erst nach dem ersten Publish existiert der Datensatz und die API liefert HTTP 200.

## Welche Single Types gibt es?

| URL-Endpoint | Webseiten-Seite |
|---|---|
| `global-content` | Header & Footer (überall sichtbar) |
| `page-home` | Startseite `/` |
| `page-about` | Über uns `/ueber-uns` |
| `page-sport` | Sport `/sport` |
| `page-training` | Training `/training` |
| `page-membership` | Mitgliedschaft `/mitgliedschaft` |
| `page-gallery` | Galerie `/galerie` |
| `page-players` | Spieler `/spieler` |
| `page-blog` | Blog `/blog` |
| `page-calendar` | Kalender `/kalender` |
| `page-imprint` | Impressum `/impressum` |
| `page-privacy` | Datenschutz `/datenschutz` |

## Was bedeuten die Feldnamen?

### CTA (Call-to-Action Bereich am Seitenende)

- **title** – Überschrift des CTA-Blocks (z.B. "Bereit für Schlagball?")
- **description** – Text unter der Überschrift
- **variant** – Farbschema. Wähle eines:
  - `sport` (orange/grün – passt zum Vereinsdesign)
  - `accent` (Akzentfarbe)
  - `primary` (Primärfarbe)
- **primaryActionLabel** – Text auf dem Haupt-Button (z.B. "Mitglied werden")
- **primaryActionHref** – Ziel des Haupt-Buttons (z.B. `/mitgliedschaft`)
- **secondaryActionLabel** – Text auf dem optionalen zweiten Button
- **secondaryActionHref** – Ziel des zweiten Buttons

### Hero (Großer Bereich am Seitenanfang)

- **subtitle** – Kleine Überschrift über dem Titel (z.B. "Über uns")
- **title** – Haupttitel (z.B. "Unser Verein")
- **description** – Beschreibungstext unter dem Titel
- **primaryActionLabel/Href** – Button-Text und Ziel
- **secondaryActionLabel/Href** – Optional zweiter Button
- **large** – Wenn aktiviert, wird der Hero größer dargestellt (für die Startseite)

### Section Header (Überschrift vor einem Abschnitt)

- **overline** – Kleine Überschrift (z.B. "Unser Angebot")
- **title** – Haupttitel des Abschnitts
- **description** – Optionaler Beschreibungstext

## Mitgliedsantrag-PDF hochladen

Auf der Mitgliedschafts-Seite gibt es einen "Antrag herunterladen"-Button. So lädst du die PDF hoch:

1. **Strapi-Admin** → **Content Manager** → **Single Types** → **Mitgliedschaft Seite**
2. Scrolle zum Feld **downloadFile**
3. Klick auf **+ Click to add an asset** → PDF auswählen oder hochladen
4. Den Button-Text kannst du im Feld **downloadCardButtonLabel** anpassen (z.B. "Mitgliedsantrag herunterladen (PDF)")
5. **Save** + **Publish**

Sobald die PDF hochgeladen ist, lädt der Button die Datei direkt herunter. Wenn keine PDF hochgeladen ist, wird der Button **ausgegraut** (disabled) angezeigt.

**Fallback:** Falls du statt einer PDF einen externen Link nutzen willst (z.B. zu einem Cloud-Speicher), kannst du im Feld **downloadCardButtonHref** eine URL eintragen. Wird ignoriert, sobald eine PDF in `downloadFile` hochgeladen ist.

## Wie funktioniert das Merge mit Default-Inhalten?

Wenn du z.B. nur `hero.title` befüllst und `hero.description` leer lässt:
- `hero.title` → kommt aus Strapi
- `hero.description` → wird mit dem Default-Text aus dem Code aufgefüllt

Das heißt: **Du musst nicht alles auf einmal befüllen.** Du kannst Schritt für Schritt Inhalte ergänzen.

## Häufige Probleme

### "Ich habe etwas geändert, aber die Webseite zeigt es nicht"

1. Hast du auf **Publish** geklickt? (nicht nur Save)
2. Warte 60 Sekunden – die Webseite cached für 60s (ISR-Revalidation)
3. Prüfe mit `npm run check-strapi` ob HTTP 200 zurückkommt

### "Die Webseite zeigt die alten Default-Texte"

Wahrscheinlich gibt der Endpoint 404 zurück → der Single Type wurde nie gespeichert+publiziert. Lege ihn einmal an (siehe oben).

### "404 bei einem Single Type, obwohl ich gespeichert habe"

- Hast du **Publish** geklickt oder nur Save?
- Wenn `draftAndPublish: true` aktiv ist, braucht es zwingend Publish.

## Logs lesen (Dev-Modus)

Im `frontend/`-Verzeichnis `npm run dev` starten. In der Konsole siehst du dann:
- `[api] Strapi-Daten geladen für /page-home` → OK
- `[api] Strapi 404 for /page-about – bitte einmal im Strapi-Admin speichern und publizieren` → Du musst diesen Single Type noch anlegen
