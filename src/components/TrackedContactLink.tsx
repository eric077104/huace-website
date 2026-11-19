"use client";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { track } from "./Analytics";

export default function TrackedContactLink({ event, children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & { event: string; children: ReactNode }) {
  return <a {...props} onClick={() => track(event)}>{children}</a>;
}
