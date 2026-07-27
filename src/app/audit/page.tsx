"use client";

import Link from "next/link";
import { AUDITS } from "@/lib/data";
import { ArrowUpRight } from "lucide-react";

export default function AuditPage() {
  return (
    <div className="mx-auto max-w-[680px] px-5 md:px-8 py-16 md:py-24">
      <h1 className="text-[28px] md:text-[36px] font-semibold tracking-tight mb-3">
        {AUDITS.heading}
      </h1>
      <p className="text-[15px] leading-[1.8] mb-10 text-muted">
        {AUDITS.subtitle}
      </p>

      <hr className="my-8 border-theme" />

      <section>
        <h2 className="text-[12px] font-mono tracking-widest uppercase mb-4 text-muted">
          Available Audits
        </h2>
        <div className="space-y-4">
          {AUDITS.items.map((audit) => (
            <div
              key={audit.id}
              className="border border-theme rounded-lg p-5 transition-colors hover:bg-[color-mix(in_srgb,var(--fg)_2%,transparent)]"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-[16px] font-semibold">{audit.title}</h3>
                <span className="text-[11px] font-mono tracking-wider uppercase px-2 py-0.5 rounded text-green-600 dark:text-green-400 bg-green-600/10">
                  {audit.status}
                </span>
              </div>
              <p className="text-[14px] leading-relaxed text-muted mb-3">
                {audit.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-3">
                {audit.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-mono px-2 py-0.5 rounded text-muted bg-[color-mix(in_srgb,var(--fg)_5%,transparent)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                href={audit.href}
                className="link-accent text-[14px] font-medium inline-flex items-center gap-1"
              >
                View Report <ArrowUpRight size={13} />
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
