"use client";

import { SITE } from "@/lib/data";
import Link from "next/link";

export function Footer() {

  return (
    <footer className="border-t transition-colors duration-200 border-theme">
      <div className="mx-auto max-w-[680px] px-5 md:px-8 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[12px] text-muted">
          <span>{SITE.copyright} · {SITE.licenseCode} · {SITE.licensePaper}</span>
          <div className="flex gap-4">
            <Link href="/papers" className="hover:opacity-70 transition-opacity">Papers</Link>
            <a href={SITE.githubUrl} target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">GitHub</a>
            <a href={SITE.linkedinUrl} target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">LinkedIn</a>
            <Link href="/community" className="hover:opacity-70 transition-opacity">Community</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
