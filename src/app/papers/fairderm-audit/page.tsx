"use client";

import Link from "next/link";
import { WP1_DETAIL, SITE, BIBTEX, METRICS_JSON } from "@/lib/data";
import { CopyButton } from "@/components/CopyButton";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

export default function WP1DetailPage() {
  return (
    <div className="mx-auto max-w-[680px] px-5 md:px-8 py-16 md:py-24">
      <Link
        href="/papers"
        className="inline-flex items-center gap-2 text-[13px] mb-8 transition-opacity hover:opacity-70 text-muted"
      >
        <ArrowLeft size={14} /> All papers
      </Link>

      <div className="flex items-center gap-3 mb-4 text-[12px] font-mono text-muted">
        <span>WP1</span>
        <span>·</span>
        <span>July 25 2026</span>
        <span>·</span>
        <a href={SITE.doiUrl} target="_blank" rel="noopener noreferrer" className="link-accent">
          DOI {SITE.doi}
        </a>
      </div>

      <h1 className="text-[24px] md:text-[30px] font-semibold leading-snug mb-8">
        {WP1_DETAIL.abstract.split(".")[0]}.
      </h1>

      {/* Abstract */}
      <section className="mb-10">
        <h2 className="text-[12px] font-mono tracking-widest uppercase mb-3 text-muted">
          Abstract
        </h2>
        <p className="text-[15px] leading-[1.8]">
          {WP1_DETAIL.abstract}
        </p>
      </section>

      {/* Methods */}
      <section className="mb-10">
        <h2 className="text-[12px] font-mono tracking-widest uppercase mb-4 text-muted">
          Methods
        </h2>
        <div className="space-y-0">
          {WP1_DETAIL.methods.map((row, i) => (
            <div
              key={i}
              className="py-3 border-t border-theme"
            >
              <span className="text-[12px] font-mono tracking-widest uppercase block mb-1 text-muted">
                {row.aspect}
              </span>
              <span className="text-[14px] leading-relaxed">{row.detail}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Tables Summary */}
      <section className="mb-10">
        <h2 className="text-[12px] font-mono tracking-widest uppercase mb-4 text-muted">
          Tables 1-9 Summary
        </h2>
        <div className="space-y-0">
          {WP1_DETAIL.tables.map((table, i) => (
            <div
              key={i}
              className="py-3 border-t border-theme"
            >
              <span className="text-[12px] font-mono mr-2 text-muted">
                {table.id}
              </span>
              <span className="text-[13px] font-medium">{table.title}</span>
              <span className="text-[13px] ml-2 text-muted">{table.summary}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Limitations */}
      <section className="mb-10">
        <h2 className="text-[12px] font-mono tracking-widest uppercase mb-4 text-muted">
          Limitations
        </h2>
        <ol className="space-y-2">
          {WP1_DETAIL.limitations.map((lim, i) => (
            <li key={i} className="flex items-start gap-3 text-[14px] leading-relaxed">
              <span className="text-[11px] font-mono mt-1 shrink-0 text-muted">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-muted">{lim}</span>
            </li>
          ))}
        </ol>
      </section>

      <hr className="my-10 border-theme" />

      {/* Citation */}
      <section className="mb-8">
        <h2 className="text-[12px] font-mono tracking-widest uppercase mb-3 text-muted">
          Citation
        </h2>
        <pre className="text-[11px] font-mono leading-relaxed whitespace-pre-wrap p-4 rounded-lg mb-3 text-muted" style={{ backgroundColor: "color-mix(in srgb, var(--fg) 3%, transparent)" }}>
          {BIBTEX}
        </pre>
        <div className="flex gap-4 text-[13px]">
          <CopyButton text={BIBTEX} label="Copy BibTeX" />
          <CopyButton text={SITE.doi} label="Copy DOI" />
        </div>
      </section>

      {/* Metrics */}
      <section className="mb-8">
        <h2 className="text-[12px] font-mono tracking-widest uppercase mb-3 text-muted">
          metrics_seed42.json
        </h2>
        <pre className="text-[11px] font-mono leading-relaxed whitespace-pre-wrap p-4 rounded-lg mb-3 text-muted" style={{ backgroundColor: "color-mix(in srgb, var(--fg) 3%, transparent)" }}>
          {JSON.stringify(METRICS_JSON, null, 2)}
        </pre>
        <CopyButton text={JSON.stringify(METRICS_JSON, null, 2)} label="Copy" />
      </section>

      {/* Downloads */}
      <section>
        <h2 className="text-[12px] font-mono tracking-widest uppercase mb-3 text-muted">
          Downloads
        </h2>
        <div className="space-y-2 text-[14px]">
          <a href={SITE.zenodoUrl} target="_blank" rel="noopener noreferrer" className="link-accent inline-flex items-center gap-1 hover:underline">
            Paper PDF (Zenodo) <ArrowUpRight size={13} />
          </a>
          <br />
          <a href={SITE.githubUrl} target="_blank" rel="noopener noreferrer" className="link-accent inline-flex items-center gap-1 hover:underline">
            Code + splits + hashes <ArrowUpRight size={13} />
          </a>
        </div>
      </section>
    </div>
  );
}
