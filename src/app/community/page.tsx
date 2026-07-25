"use client";

import { COMMUNITY, SITE } from "@/lib/data";
import { ArrowUpRight } from "lucide-react";

export default function CommunityPage() {
  return (
    <div className="mx-auto max-w-[680px] px-5 md:px-8 py-16 md:py-24">
      <h1 className="text-[28px] md:text-[36px] font-semibold tracking-tight mb-3">
        {COMMUNITY.heading}
      </h1>
      <p className="text-[15px] leading-[1.8] mb-12 text-muted">
        {COMMUNITY.description}
      </p>

      {/* Links */}
      <div className="flex flex-wrap gap-x-6 gap-y-2 text-[14px] mb-12">
        <a href={SITE.zenodoCommunityUrl} target="_blank" rel="noopener noreferrer" className="link-accent inline-flex items-center gap-1">
          Zenodo Community <ArrowUpRight size={13} />
        </a>
        <a href={SITE.githubUrl} target="_blank" rel="noopener noreferrer" className="link-accent inline-flex items-center gap-1">
          GitHub <ArrowUpRight size={13} />
        </a>
      </div>

      {/* Manifesto */}
      <section className="mb-12">
        <h2 className="text-[12px] font-mono tracking-widest uppercase mb-4 text-muted">
          Principles
        </h2>
        <ol className="space-y-4">
          {COMMUNITY.manifesto.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-[14px] leading-[1.8]">
              <span className="text-[11px] font-mono mt-1 shrink-0 text-muted">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <strong>{item.title}</strong>{" "}
                <span className="text-muted">{item.description}</span>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <hr className="my-10 border-theme" />

      {/* Contribute */}
      <section>
        <h2 className="text-[12px] font-mono tracking-widest uppercase mb-4 text-muted">
          How to Contribute
        </h2>
        <ol className="space-y-3 mb-6">
          {COMMUNITY.contributeSteps.map((step, i) => (
            <li key={i} className="flex items-start gap-3 text-[14px] leading-relaxed">
              <span className="text-[11px] font-mono mt-1 shrink-0 text-muted">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-muted">{step}</span>
            </li>
          ))}
        </ol>
        <a
          href={`${SITE.githubUrl}/fairderm-audit/issues`}
          target="_blank"
          rel="noopener noreferrer"
          className="link-accent text-[14px] font-medium inline-flex items-center gap-1"
        >
          Open an issue <ArrowUpRight size={13} />
        </a>
      </section>
    </div>
  );
}
