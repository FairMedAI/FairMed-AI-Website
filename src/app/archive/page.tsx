"use client";

import { ARCHIVE } from "@/lib/data";
import { ArrowDown } from "lucide-react";

export default function ArchivePage() {
  return (
    <div className="mx-auto max-w-[680px] px-5 md:px-8 py-16 md:py-24">
      <h1 className="text-[28px] md:text-[36px] font-semibold tracking-tight mb-3">
        {ARCHIVE.heading}
      </h1>
      <p className="text-[15px] leading-[1.8] mb-4 text-muted">
        {ARCHIVE.subtitle}
      </p>
      <p className="text-[13px] text-muted mb-10 italic">
        {ARCHIVE.note}
      </p>

      <hr className="my-8 border-theme" />

      <section>
        <h2 className="text-[12px] font-mono tracking-widest uppercase mb-4 text-muted">
          Datasets
        </h2>
        <div className="space-y-6">
          {ARCHIVE.datasets.map((ds) => (
            <div
              key={ds.id}
              className="border border-theme rounded-lg p-5"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-[16px] font-semibold">{ds.title}</h3>
                <a
                  href={ds.downloadHref}
                  download
                  className="link-accent text-[13px] font-medium inline-flex items-center gap-1"
                >
                  Download <ArrowDown size={13} />
                </a>
              </div>
              <p className="text-[14px] leading-relaxed text-muted mb-3">
                {ds.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-3">
                {ds.useWith.map((tool) => (
                  <span
                    key={tool}
                    className="text-[11px] font-mono px-2 py-0.5 rounded text-muted bg-[color-mix(in_srgb,var(--fg)_5%,transparent)]"
                  >
                    {tool}
                  </span>
                ))}
              </div>
              <div className="text-[13px] text-muted">
                {ds.files.map((f) => (
                  <span key={f.name} className="mr-4">
                    <code className="text-[12px]">{f.name}</code>{" "}
                    <span className="text-[11px]">({f.count})</span>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
