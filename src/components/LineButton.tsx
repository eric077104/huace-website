"use client";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import Image from "next/image";
import { track } from "./Analytics";

export default function LineButton({ href, children = "加入 LINE 官方帳號", className = "", ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; children?: ReactNode }) {
  return <a className={`line-button ${className}`.trim()} href={href} target="_blank" rel="noopener" onClick={() => track("line_click")} {...props}><Image className="line-button-icon" src="/brand/line-logo-source.png" width={24} height={24} alt="" aria-hidden="true"/>{children}<span aria-hidden="true">↗</span></a>;
}
