"use client";

import Link, { type LinkProps } from "next/link";
import type { MouseEvent, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { track } from "./Analytics";

type ServiceLinkProps = LinkProps & {
  className?: string;
  children: ReactNode;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
  event?: string;
  eventParams?: Record<string, string>;
};

export default function ServiceLink({ href, onClick, event, eventParams, ...props }: ServiceLinkProps) {
  const router = useRouter();

  function handleClick(clickEvent: MouseEvent<HTMLAnchorElement>) {
    if (event) track(event, eventParams);
    onClick?.(clickEvent);
    if (clickEvent.defaultPrevented || typeof href !== "string" || !href.startsWith("/services/")) return;
    if (window.matchMedia("(max-width: 1023px)").matches) {
      clickEvent.preventDefault();
      router.push(`${href.split("#")[0]}#content`);
    }
  }

  return <Link href={href} {...props} onClick={handleClick} />;
}
