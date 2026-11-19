"use client";

import { useState } from "react";

export default function MobilePackageMore({ count }: { count: number }) {
  const [expanded, setExpanded] = useState(false);
  return <button className="m-more only-m" type="button" aria-expanded={expanded} onClick={() => {
    const next = !expanded;
    setExpanded(next);
    document.getElementById("solutions")?.classList.toggle("show-all-packages", next);
  }}>{expanded ? "收合方案 ↑" : `查看全部 ${count} 個方案 →`}</button>;
}
