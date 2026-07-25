"use client";

import Link from "next/link";
import { PAPERS, SITE, BIBTEX } from "@/lib/data";
import { CopyButton } from "@/components/CopyButton";
import { ArrowUpRight } from "lucide-react";

export default function PapersPage() {
  return (
    <div className="mx-auto max-w-[680px] px-5 md:px-8 py-16 md:py-24">
      <h1 className="text-[28px] md:text-[36px] font-semibold tracking-tight mb-2">
        Papers
      </h1>
      <p className="text-[14px] mb-12 text-muted">
        2 working papers, 1 live
      </p>

      {/* WP1 */}
      <article className="mb-12">
        <div className="flex items-center gap-3 mb-3 text-[12px] font-mono text-muted">
          <span>WP1</span>
          <span>·</span>
          <span>{PAPERS.wp1.status}</span>
          <span>·</span>
          <span>{PAPERS.wp1.date}</span>
        </div>

        <h2 className="text-[20px] md:text-[24px] font-semibold leading-snug mb-4">
          {PAPERS.wp1.title}
        </h2>

        <p className="text-[14px] leading-[1.8] mb-6 text-muted">
          {PAPERS.wp1.summary}
        </p>

        <table className="w-full text-[13px] font-mono mb-6" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr className="border-theme" style={{ borderBottom: "1px solid" }}>
              <th className="text-left py-2 font-normal text-muted">Method</th>
              <th className="text-left py-2 font-normal text-muted">AUC</th>
              <th className="text-left py-2 font-normal text-muted">Gap</th>
              <th className="text-left py-2 font-normal text-muted">Delta</th>
            </tr>
          </thead>
          <tbody>
            {PAPERS.wp1.results.map((row, i) => (
              <tr key={i} className="border-theme" style={{ borderBottom: "1px solid" }}>
                <td className="py-2">{row.method}</td>
                <td className="py-2">{row.auc}</td>
                <td className="py-2">{row.gap}</td>
                <td className="py-2">{row.delta}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px]">
          <Link href={PAPERS.wp1.detailLink} className="link-accent">
            Full paper &rarr;
          </Link>
          <a href={SITE.zenodoUrl} target="_blank" rel="noopener noreferrer" className="link-accent inline-flex items-center gap-1">
            Zenodo <ArrowUpRight size={12} />
          </a>
          <a href={SITE.githubUrl} target="_blank" rel="noopener noreferrer" className="link-accent inline-flex items-center gap-1">
            Code <ArrowUpRight size={12} />
          </a>
          <CopyButton text={BIBTEX} label="Cite" />
        </div>
      </article>

      <hr className="my-12 border-theme" />

      {/* WP2 */}
      <article>
        <div className="flex items-center gap-3 mb-3 text-[12px] font-mono text-muted">
          <span>WP2</span>
          <span>·</span>
          <span>{PAPERS.wp2.status}</span>
        </div>

        <h2 className="text-[20px] md:text-[24px] font-semibold leading-snug mb-4">
          {PAPERS.wp2.title}
        </h2>

        <p className="text-[14px] leading-[1.8] mb-4 text-muted">
          {PAPERS.wp2.description}
        </p>

        <p className="text-[12px] font-mono text-muted">
          In preparation. Not yet citable.
        </p>
      </article>
    </div>
  );
}
