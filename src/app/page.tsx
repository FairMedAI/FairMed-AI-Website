"use client";

import Link from "next/link";
import { HOME, SITE } from "@/lib/data";
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
    </div>
  );
}
