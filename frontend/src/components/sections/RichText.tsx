import React from "react";

/**
 * Minimaler Markdown-Renderer für Rich-Text-Felder aus Strapi.
 *
 * Unterstützt: Absätze, **fett**, *kursiv*, `code`, ### Überschriften
 * (h3/h4), Listen mit "- " und Unterabsätze.
 */

interface RichTextProps {
  content: string;
  className?: string;
}

function parseInline(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  // Pattern reihenfolge: **bold**, *italic*, `code`
  const regex = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g;
  const tokens = text.split(regex).filter(Boolean);

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (token.startsWith("**") && token.endsWith("**")) {
      parts.push(<strong key={i}>{token.slice(2, -2)}</strong>);
    } else if (token.startsWith("*") && token.endsWith("*") && token.length > 2) {
      parts.push(<em key={i}>{token.slice(1, -1)}</em>);
    } else if (token.startsWith("`") && token.endsWith("`")) {
      parts.push(
        <code key={i} className="text-xs bg-muted px-1.5 py-0.5 rounded">
          {token.slice(1, -1)}
        </code>,
      );
    } else {
      parts.push(token);
    }
  }
  return parts;
}

export default function RichText({ content, className }: RichTextProps) {
  const blocks: React.ReactNode[] = [];
  const lines = content.split(/\r?\n/);

  let i = 0;
  let blockKey = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Empty line → skip
    if (line.trim() === "") {
      i++;
      continue;
    }

    // Heading h4 (####)
    if (line.startsWith("#### ")) {
      blocks.push(
        <h4 key={blockKey++} className="text-foreground font-semibold mt-4">
          {parseInline(line.slice(5))}
        </h4>,
      );
      i++;
      continue;
    }

    // Heading h3 (###)
    if (line.startsWith("### ")) {
      blocks.push(
        <h3 key={blockKey++} className="text-foreground font-semibold mt-6">
          {parseInline(line.slice(4))}
        </h3>,
      );
      i++;
      continue;
    }

    // Heading h2 (##)
    if (line.startsWith("## ")) {
      blocks.push(
        <h2 key={blockKey++} className="text-foreground font-bold mt-6">
          {parseInline(line.slice(3))}
        </h2>,
      );
      i++;
      continue;
    }

    // Heading h1 (#)
    if (line.startsWith("# ")) {
      blocks.push(
        <h1 key={blockKey++} className="text-foreground font-bold mt-6">
          {parseInline(line.slice(2))}
        </h1>,
      );
      i++;
      continue;
    }

    // Unordered list
    if (/^[-*] /.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^[-*] /.test(lines[i])) {
        items.push(lines[i].replace(/^[-*] /, ""));
        i++;
      }
      blocks.push(
        <ul key={blockKey++}>
          {items.map((item, idx) => (
            <li key={idx}>{parseInline(item)}</li>
          ))}
        </ul>,
      );
      continue;
    }

    // Default: paragraph (collect consecutive non-empty lines)
    const paraLines: string[] = [line];
    i++;
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !lines[i].startsWith("#") &&
      !/^[-*] /.test(lines[i])
    ) {
      paraLines.push(lines[i]);
      i++;
    }
    blocks.push(
      <p key={blockKey++}>{parseInline(paraLines.join(" "))}</p>,
    );
  }

  return <div className={className}>{blocks}</div>;
}
