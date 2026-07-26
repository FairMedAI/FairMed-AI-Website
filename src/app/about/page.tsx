"use client";

import { ABOUT, SITE } from "@/lib/data";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/GithubIcon";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-[680px] px-5 md:px-8 py-16 md:py-24">
      <h1 className="text-[28px] md:text-[36px] font-semibold tracking-tight mb-8">
        {ABOUT.heading}
      </h1>

      {/* Profile */}
      <section className="mb-10 flex items-start gap-5">
        <img
          src="/images/shanmuka.jpeg"
          alt="Shanmuka G."
          className="w-[80px] h-[80px] rounded-full object-cover shrink-0"
        />
        <div>
          <p className="text-[18px] font-medium mb-1">{ABOUT.profile.name}</p>
          <p className="text-[13px] font-mono mb-4 text-muted">
            {ABOUT.profile.subtitle}
          </p>
          {ABOUT.profile.bio.map((paragraph, i) => (
            <p key={i} className="text-[15px] leading-[1.8] text-muted mb-4 last:mb-0">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <hr className="my-10 border-theme" />

      {/* Mission */}
      <section className="mb-10">
        <h2 className="text-[12px] font-mono tracking-widest uppercase mb-3 text-muted">
          Mission
        </h2>
        <p className="text-[16px] leading-[1.8]">
          {ABOUT.mission}
        </p>
      </section>

      {/* Values */}
      <section className="mb-10">
        <h2 className="text-[12px] font-mono tracking-widest uppercase mb-3 text-muted">
          Values
        </h2>
        <ul className="space-y-2">
          {ABOUT.values.map((val) => (
            <li key={val.title} className="text-[14px]">
              <strong>{val.title}</strong> — <span className="text-muted">{val.description}</span>
            </li>
          ))}
        </ul>
      </section>

      <hr className="my-10 border-theme" />

      {/* Timeline */}
      <section className="mb-10">
        <h2 className="text-[12px] font-mono tracking-widest uppercase mb-4 text-muted">
          Timeline
        </h2>
        <div className="space-y-0">
          {ABOUT.timeline.map((event, i) => (
            <div
              key={i}
              className="py-3 border-t border-theme"
            >
              <div className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-3">
                <span className="text-[12px] font-mono shrink-0 text-muted">
                  {event.date}
                </span>
                <span className="text-[13px] font-medium">{event.event}</span>
                <span className="text-[13px] text-muted">{event.detail}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* License */}
      <section className="mb-10">
        <h2 className="text-[12px] font-mono tracking-widest uppercase mb-2 text-muted">
          License
        </h2>
        <p className="text-[13px] font-mono text-muted">
          {ABOUT.license}
        </p>
      </section>

      {/* Contact */}
      <section>
        <h2 className="text-[12px] font-mono tracking-widest uppercase mb-3 text-muted">
          Contact
        </h2>
        <div className="space-y-2 text-[14px]">
          <a href={SITE.githubUrl} target="_blank" rel="noopener noreferrer" className="link-accent inline-flex items-center gap-2 hover:underline">
            <GithubIcon size={14} /> {ABOUT.contact.github} <ArrowUpRight size={12} />
          </a>
          <br />
          <a href={SITE.linkedinUrl} target="_blank" rel="noopener noreferrer" className="link-accent inline-flex items-center gap-2 hover:underline">
            LinkedIn: FairMed AI <ArrowUpRight size={12} />
          </a>
          <br />
          <a href={SITE.zenodoCommunityUrl} target="_blank" rel="noopener noreferrer" className="link-accent inline-flex items-center gap-2 hover:underline">
            Zenodo: {ABOUT.contact.zenodo} <ArrowUpRight size={12} />
          </a>
          <br />
          <a href={`${SITE.githubUrl}/fairderm-audit/issues`} target="_blank" rel="noopener noreferrer" className="link-accent inline-flex items-center gap-2 hover:underline">
            {ABOUT.contact.issues} <ArrowUpRight size={12} />
          </a>
        </div>
      </section>
    </div>
  );
}
