"use client";

import Link from "next/link";
import { HOME, ROADMAP, SITE } from "@/lib/data";
import { CopyButton } from "@/components/CopyButton";
import { ArrowUpRight } from "lucide-react";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-[680px] px-5 md:px-8 py-16 md:py-24">
      <h1 className="text-[32px] md:text-[40px] font-semibold tracking-tight mb-3">
        FairMed AI
      </h1>
      <p className="text-[16px] md:text-[18px] leading-relaxed mb-8 text-muted">
        {HOME.subtitle}
      </p>

      <hr className="my-8 border-theme" />

      <p className="text-[15px] leading-[1.8] mb-6">
        {HOME.intro}
      </p>

      <p className="text-[15px] leading-[1.8] mb-8">
        {HOME.finding}
      </p>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[14px]">
        <Link href={HOME.paperLink} className="link-accent font-medium">
          Read the paper <span className="ml-1">&rarr;</span>
        </Link>
        <a
          href={SITE.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="link-accent inline-flex items-center gap-1"
        >
          GitHub <ArrowUpRight size={13} />
        </a>
        <span className="inline-flex items-center gap-2 text-[13px] font-mono text-muted">
          {SITE.doi.split("/").pop()}
          <CopyButton text={SITE.doi} label="copy" />
        </span>
      </div>

      <hr className="my-8 border-theme" />

      <section>
        <h2 className="text-[12px] font-mono tracking-widest uppercase mb-4 text-muted">
          Roadmap
        </h2>
        <div className="space-y-0">
          {ROADMAP.map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between py-3 border-t border-theme"
            >
              <span className="text-[15px]">{item.domain}</span>
              <span
                className={`text-[11px] font-mono tracking-wider uppercase px-2 py-0.5 rounded ${
                  item.status === "live"
                    ? "text-green-600 dark:text-green-400 bg-green-600/10"
                    : item.status === "next"
                      ? "text-amber-600 dark:text-amber-400 bg-amber-600/10"
                      : "text-muted bg-[color-mix(in_srgb,var(--fg)_6%,transparent)]"
                }`}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
