"use client";

import Link from "next/link";
import { TOOLS } from "@/lib/data";
import { ArrowUpRight } from "lucide-react";

export default function ToolsPage() {
  return (
    <div className="mx-auto max-w-[680px] px-5 md:px-8 py-16 md:py-24">
      <h1 className="text-[28px] md:text-[36px] font-semibold tracking-tight mb-3">
        {TOOLS.heading}
      </h1>
      <p className="text-[15px] leading-[1.8] mb-10 text-muted">
        {TOOLS.subtitle}
      </p>

      <hr className="my-8 border-theme" />

      <section>
        <h2 className="text-[12px] font-mono tracking-widest uppercase mb-4 text-muted">
          Available Tools
        </h2>
        <div className="space-y-4">
          {TOOLS.items.map((tool) => (
            <div
              key={tool.id}
              className={`border border-theme rounded-lg p-5 transition-colors ${
                tool.status === "coming-soon"
                  ? "opacity-50"
                  : "hover:bg-[color-mix(in_srgb,var(--fg)_2%,transparent)]"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-[16px] font-semibold">{tool.title}</h3>
                <span
                  className={`text-[11px] font-mono tracking-wider uppercase px-2 py-0.5 rounded ${
                    tool.status === "live"
                      ? "text-green-600 dark:text-green-400 bg-green-600/10"
                      : "text-muted bg-[color-mix(in_srgb,var(--fg)_6%,transparent)]"
                  }`}
                >
                  {tool.status === "live" ? "LIVE" : "COMING SOON"}
                </span>
              </div>
              <p className="text-[14px] leading-relaxed text-muted mb-3">
                {tool.description}
              </p>
              {"tags" in tool && tool.tags && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {tool.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-mono px-2 py-0.5 rounded text-muted bg-[color-mix(in_srgb,var(--fg)_5%,transparent)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              {"href" in tool && tool.href ? (
                <Link
                  href={tool.href}
                  className="link-accent text-[14px] font-medium inline-flex items-center gap-1"
                >
                  Launch <ArrowUpRight size={13} />
                </Link>
              ) : null}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
