import type { ReactNode } from "react";

const segmenter = new Intl.Segmenter("zh-Hant", { granularity: "word" });
const cjk = /[\u2e80-\u2fff\u3000-\u30ff\u3100-\u312f\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff]/;

/** Keep browser line breaking aligned with server rendering; CSS activates this only on phones. */
export function CjkWords({ text, preferredUnits = [] }: { text: string; preferredUnits?: string[] }) {
  const units = [...preferredUnits].filter(Boolean).sort((a, b) => b.length - a.length);
  const chunks = units.length ? text.split(new RegExp(`(${units.map(escapeRegExp).join("|")})`, "g")) : [text];
  let key = 0;
  const output: ReactNode[] = [];
  for (const chunk of chunks) {
    if (!chunk) continue;
    if (units.includes(chunk)) {
      output.push(<span className="cjk-w" key={key++}>{chunk}</span>);
      continue;
    }
    for (const part of segmenter.segment(chunk)) {
      output.push(part.isWordLike && part.segment.length > 1 && cjk.test(part.segment)
        ? <span className="cjk-w" key={key++}>{part.segment}</span>
        : part.segment);
    }
  }
  return <>{output}</>;
}

function escapeRegExp(value: string) { return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }
