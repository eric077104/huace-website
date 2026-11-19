"use client";
import { track } from "./Analytics";

const socialPlatforms = [
  { key: "facebook", label: "Facebook 粉絲專頁", field: "facebookUrl" },
  { key: "instagram", label: "Instagram", field: "instagramUrl" },
  { key: "threads", label: "Threads", field: "threadsUrl" },
] as const;

type SocialUrls = Partial<Record<(typeof socialPlatforms)[number]["field"], string>>;

function SocialIcon({ platform }: { platform: (typeof socialPlatforms)[number]["key"] }) {
  if (platform === "facebook") return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.5 21v-8.2h2.8l.4-3.2h-3.2V7.5c0-.9.3-1.5 1.6-1.5h1.7V3.1c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.3H7.3v3.2h2.8V21h3.4Z" fill="currentColor"/></svg>;
  if (platform === "instagram") return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.3" y="3.3" width="17.4" height="17.4" rx="5.1" fill="none" stroke="currentColor" strokeWidth="1.9"/><circle cx="12" cy="12" r="4.1" fill="none" stroke="currentColor" strokeWidth="1.9"/><circle cx="17.7" cy="6.6" r="1.2" fill="currentColor"/></svg>;
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18.3 3.5c1.1.8 1.9 1.9 2.3 3.3-1.4-.1-2.6-.5-3.7-1.1-1.1-.6-2-1.4-2.7-2.4 1.3-.3 2.7-.2 4.1.2ZM6.1 5.4c2.7 0 4.5 1.7 5.7 3.4l.4.6c1.7 2.5 2.9 4.1 5.4 4.1 1.5 0 2.5-.8 2.5-2.1 0-1.1-.8-1.9-2-1.9-.7 0-1.3.2-1.9.5l-1.1-2.3c.9-.6 2-.9 3.1-.9 2.6 0 4.5 1.9 4.5 4.6 0 3-2.2 5-5.3 5-3.4 0-5.2-2.2-7-4.9l-.5-.7c-1.5-2.2-2.5-3.1-4.1-3.1-1.1 0-1.9.7-1.9 1.8 0 1 .7 1.7 1.7 1.7.5 0 1-.1 1.5-.4l1 2.4c-.8.5-1.8.8-2.8.8-2.5 0-4.3-1.8-4.3-4.4 0-2.8 2-4.7 5.1-4.7Z" fill="currentColor"/></svg>;
}

export default function SocialLinks({ urls, className = "" }: { urls: SocialUrls; className?: string }) {
  return <nav className={`social-links ${className}`.trim()} aria-label="社群連結">
    {socialPlatforms.map(({ key, label, field }) => {
      const href = urls[field];
      if (!href) return null;
      return <a key={key} className="social-link" href={href} target="_blank" rel="noopener noreferrer" aria-label={`HC 畫策整合行銷 ${label}`} onClick={() => track("social_click", { platform: key })}>
        <SocialIcon platform={key}/>
      </a>;
    })}
  </nav>;
}
