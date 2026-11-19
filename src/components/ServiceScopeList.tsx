"use client";

import { useState } from "react";

export default function ServiceScopeList({ items }: { items: string[] }) {
  const [expanded, setExpanded] = useState(false);
  return <div className="scope-wrap mobile-scope-wrap"><>
    <div className={`scope m-scope ${expanded ? "is-expanded" : ""}`}>
      {items.map((item, index) => <div className={index >= 4 ? "scope-extra" : undefined} key={item}><span className="n">{String(index + 1).padStart(2, "0")}</span><b>{item}</b></div>)}
    </div>
    {items.length > 4 && <button className="scope-toggle m-expand only-m" aria-expanded={expanded} onClick={() => setExpanded((value) => !value)} type="button">{expanded ? "收合 ↑" : `查看全部 ${items.length} 項 ↓`}</button>}
  </></div>;
}
