"use client";

import { useState } from "react";
import { PROTOCOL } from "@/lib/data";
import { CopyButton } from "@/components/CopyButton";

export default function ProtocolPage() {
  const [openId, setOpenId] = useState<string>("leakage");

  return (
    <div className="mx-auto max-w-[680px] px-5 md:px-8 py-16 md:py-24">
      <h1 className="text-[28px] md:text-[36px] font-semibold tracking-tight mb-3">
        Protocol
      </h1>
      <p className="text-[15px] leading-[1.8] mb-4 text-muted">
        {PROTOCOL.subheading}
      </p>

      <hr className="my-8 border-theme" />

      {/* Checklist */}
      <section className="mb-12">
        <h2 className="text-[12px] font-mono tracking-widest uppercase mb-6 text-muted">
          Checklist
        </h2>
        <div className="space-y-0">
          {PROTOCOL.items.map((item, i) => {
            const isOpen = openId === item.id;
            return (
              <div key={item.id} className="border-t border-theme">
                <button
                  onClick={() => setOpenId(isOpen ? "" : item.id)}
                  className="w-full py-4 flex items-center gap-3 text-left"
                >
                  <span className="text-[12px] font-mono shrink-0 text-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[14px] font-medium flex-1">{item.title}</span>
                  <span className="text-[11px] font-mono text-muted">
                    ({item.status})
                  </span>
                  <span className="text-[14px] shrink-0 text-muted">
                    {isOpen ? "\u2212" : "+"}
                  </span>
                </button>
                {isOpen && (
                  <div className="pb-5 pl-8">
                    <p className="text-[14px] leading-relaxed mb-3 text-muted">
                      {item.description}
                    </p>
                    <div className="flex items-center gap-3">
                      <code className="text-[12px] font-mono break-all" style={{ color: "var(--accent)" }}>
                        {item.code}
                      </code>
                      <CopyButton text={item.code} label="Copy" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Reproducibility */}
      <section className="mb-10">
        <h2 className="text-[12px] font-mono tracking-widest uppercase mb-4 text-muted">
          Reproducibility
        </h2>
        <div className="space-y-3">
          {PROTOCOL.reproducibility.map((row) => (
            <div key={row.key}>
              <span className="text-[11px] font-mono tracking-widest uppercase block mb-1 text-muted">
                {row.key}
              </span>
              <span className="text-[13px] font-mono break-all">{row.value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Why this matters */}
      <section>
        <h2 className="text-[12px] font-mono tracking-widest uppercase mb-3 text-muted">
          Why this matters
        </h2>
        <p className="text-[14px] leading-[1.8] text-muted">
          {PROTOCOL.whyItMatters}
        </p>
      </section>
    </div>
  );
}
