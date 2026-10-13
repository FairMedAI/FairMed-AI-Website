"use client";

import Link from "next/link";
import { WP1_DETAIL, WP1_BADGE, WP1_FINDINGS, SITE, BIBTEX, METRICS_JSON } from "@/lib/data";
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

      <div className="inline-flex items-center gap-2 mb-3">
        <span className="text-[11px] font-mono tracking-wider uppercase px-2 py-0.5 rounded text-green-600 dark:text-green-400 bg-green-600/10">
          {WP1_BADGE.label}
        </span>
        <span className="text-[11px] font-mono tracking-wider uppercase px-2 py-0.5 rounded text-amber-600 dark:text-amber-400 bg-amber-600/10">
          Rev 2 - Oct 12 2026 - 5-Seed Primary - DOI 10.5281/zenodo.23330297
        </span>
      </div>
      <p className="text-[12px] text-muted mb-6">
        {WP1_BADGE.note}
      </p>

      <div className="flex items-center gap-3 mb-4 text-[12px] font-mono text-muted">
        <span>WP1</span>
        <span>·</span>
        <span>Rev 2 · Oct 12 2026</span>
        <span>·</span>
        <a href={SITE.doiUrl} target="_blank" rel="noopener noreferrer" className="link-accent">
          DOI {SITE.doi}
        </a>
      </div>

      <h1 className="text-[24px] md:text-[30px] font-semibold leading-snug mb-8">
        {WP1_DETAIL.abstract.split(".")[0]}.
      </h1>

      {/* Update */}
      <section className="mb-10">
        <div
          className="border rounded-lg p-5"
          style={{ borderColor: "rgba(245, 158, 11, 0.5)" }}
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[11px] font-mono tracking-wider uppercase px-2 py-0.5 rounded text-amber-600 dark:text-amber-400 bg-amber-600/10">
              Update · Rev 2 · Oct 12 2026
            </span>
            <span className="text-[12px] font-mono text-muted">Clean, leakage-free run</span>
          </div>
          <p className="text-[14px] leading-[1.8] mb-4">
            FairDerm investigates skin-tone bias in melanoma detection and whether
            synthetic augmentation can close the gap. This update reflects our
            clean, leakage-free run.
          </p>
          <p className="text-[14px] leading-[1.8] mb-4">
            <strong>Leakage-proof pipeline.</strong> All 290 synthetic dark-skin
            melanoma images were generated exclusively from the 29 training-split
            dark melanomas. Byte-level SHA256 verification confirms zero overlap
            with the 132 test images.
          </p>
          <p className="text-[14px] leading-[1.8] mb-4">
            <strong>Results</strong> (DDI test, n=132; 42 Light / 48 Medium / 42
            Dark, 10 melanomas per reported subgroup). The baseline achieves Light
            AUROC 0.7188 vs. Dark AUROC 0.5875 (gap −0.1313). Fine-tuning changes
            these to 0.7563 vs. 0.5469 (gap −0.2094). Adding synthetic dark
            melanomas changes them to 0.7719 vs. 0.4813 (gap −0.2906); the paired
            Dark AUROC delta is −0.0663 (95% CI [−0.1508, 0.0080], p = 0.9620).
          </p>
          <p className="text-[14px] leading-[1.8] mb-0">
            <strong>Takeaway.</strong> Simple photometric augmentation cannot
            meaningfully close the skin-tone gap. The next step is richer
            generative models, such as GANs or diffusion models.
          </p>
        </div>
      </section>

      {/* Key Findings */}
      <section className="mb-10">
        <h2 className="text-[12px] font-mono tracking-widest uppercase mb-4 text-muted">
          Key Findings
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {WP1_FINDINGS.map((f, i) => (
            <div key={i} className="border border-theme rounded-lg p-4">
              <span className="text-[12px] font-mono tracking-widest uppercase block mb-2 text-muted">
                0{i + 1}
              </span>
              <h3 className="text-[14px] font-semibold mb-1">{f.title}</h3>
              <p className="text-[13px] leading-relaxed text-muted">{f.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Caveat */}
      <section className="mb-10">
        <div
          className="border rounded-lg p-5 text-[14px] leading-[1.8] text-muted"
          style={{ borderColor: "rgba(245, 158, 11, 0.5)" }}
        >
          <span className="block font-medium mb-1" style={{ color: "#f59e0b" }}>
            Caveat
          </span>
          The baseline checkpoint is partial (best validation epoch 5); a full
          15-epoch run is pending. Bootstrap CIs are wide — results are
          directional, not definitive.
        </div>
      </section>

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
      <section id="limitations" className="mb-10">
        <h2 className="text-[12px] font-mono tracking-widest uppercase mb-4 text-muted">
          Limitations
        </h2>
        <ol className="space-y-3">
          {WP1_DETAIL.limitations.map((lim, i) => (
            <li key={i} className="flex flex-col gap-1 border border-theme rounded-lg p-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-mono mt-0.5 shrink-0 text-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={`text-[11px] font-mono tracking-wider uppercase px-2 py-0.5 rounded ${
                    lim.severity === "High"
                      ? "text-red-600 dark:text-red-400 bg-red-600/10"
                      : "text-amber-600 dark:text-amber-400 bg-amber-600/10"
                  }`}
                >
                  {lim.severity}
                </span>
                <span className="text-[14px] font-semibold">{lim.title}</span>
              </div>
              <span className="text-[13px] leading-relaxed text-muted ml-6">
                {lim.detail}
              </span>
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
        <div className="space-y-3 text-[14px]">
          <a
            href="https://doi.org/10.5281/zenodo.23330297"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-theme font-medium link-accent hover:underline"
          >
            Download Paper Rev 2 - Zenodo DOI 10.5281/zenodo.23330297 <ArrowUpRight size={13} />
          </a>
          <br />
          <a
            href="https://raw.githubusercontent.com/FairMedAI/fairderm-audit/main/FAIRDERM_fixed.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="link-accent inline-flex items-center gap-1 hover:underline"
          >
            GitHub PDF - 22 pp <ArrowUpRight size={13} />
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
