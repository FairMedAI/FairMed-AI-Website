"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function SplitMakerPage() {
  return (
    <div>
      <div className="mx-auto max-w-[680px] px-5 md:px-8 pt-16 md:pt-24 pb-8">
        <Link
          href="/tools"
          className="inline-flex items-center gap-2 text-[13px] mb-8 transition-opacity hover:opacity-70 text-muted"
        >
          <ArrowLeft size={14} /> All tools
        </Link>

        <div className="flex items-center gap-3 mb-3">
          <h1 className="text-[24px] md:text-[30px] font-semibold tracking-tight">
            Split Maker
          </h1>
          <span className="text-[11px] font-mono tracking-wider uppercase px-2 py-0.5 rounded text-green-600 dark:text-green-400 bg-green-600/10">
            LIVE
          </span>
        </div>

        <p className="text-[13px] text-muted mb-6">
          100% client-side. No upload. Works for any medical imaging.
        </p>

        <hr className="border-theme" />
      </div>

      <div className="px-3 md:px-6 pb-16">
        <iframe
          src="/tools/split-maker.html"
          className="w-full border border-theme rounded-lg"
          style={{ height: "calc(100vh - 260px)", minHeight: "500px" }}
          title="FairMed Split Maker"
        />
      </div>
    </div>
  );
}
