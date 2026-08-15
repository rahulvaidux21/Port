import type { MetaRow } from "@/types";

export function ProseList({ items }: { items: string[] }) {
  return (
    <ul className="list-disc space-y-1 pl-5 marker:text-text-muted">
      {items.map((item, i) => (
        <li key={i} className="font-sans text-base leading-relaxed text-text-secondary">
          {item}
        </li>
      ))}
    </ul>
  );
}

/** A bold-lead-in-phrase bullet ("**Hero:** large headline with...") — the
    "Role and scope"/"Design highlights"/"Visual language" pattern in the
    Figma template. */
export function ProseLabelList({ items }: { items: MetaRow[] }) {
  return (
    <ul className="list-disc space-y-1 pl-5 marker:text-text-muted">
      {items.map((item) => (
        <li key={item.label} className="font-sans text-base leading-relaxed text-text-secondary">
          <span className="font-bold text-text-primary">{item.label}:</span> {item.value}
        </li>
      ))}
    </ul>
  );
}

export function ProseParagraph({ text }: { text: string }) {
  return <p className="font-sans text-base leading-relaxed text-text-secondary">{text}</p>;
}

export function ProseParagraphs({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="flex flex-col gap-4">
      {paragraphs.map((p, i) => (
        <ProseParagraph key={i} text={p} />
      ))}
    </div>
  );
}
