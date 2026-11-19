"use client";
import Link, { type LinkProps } from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { track } from "./Analytics";
export default function TrackedLink({ href, event, eventParams, children, ...props }: LinkProps & AnchorHTMLAttributes<HTMLAnchorElement> & { event?: string; eventParams?: Record<string,string>; children: ReactNode }) { return <Link href={href} {...props} onClick={() => event && track(event, eventParams)}>{children}</Link>; }
