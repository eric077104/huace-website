"use client";

import Link, { type LinkProps } from "next/link";
import type { MouseEvent, ReactNode } from "react";
import { useRouter } from "next/navigation";

type ServiceLinkProps = LinkProps & {
  className?: string;
  children: ReactNode;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
};

export default function ServiceLink({ href, onClick, ...props }: ServiceLinkProps) {
  const router = useRouter();

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);
    if (event.defaultPrevented || typeof href !== "string" || !href.startsWith("/services/")) return;
    if (window.matchMedia("(max-width: 1023px)").matches) {
      event.preventDefault();
      router.push(`${href.split("#")[0]}#content`);
    }
  }

  return <Link href={href} {...props} onClick={handleClick} />;
}
