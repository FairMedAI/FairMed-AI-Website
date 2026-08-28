"use client";

import { useEffect, useState } from "react";
import { TEAM } from "@/lib/data";
import { ArrowUpRight, X } from "lucide-react";

type Person = {
  name: string;
  role: string;
  initials: string;
  photo?: string | null;
  bio: readonly string[];
  linkedin: string;
};

function Avatar({ person, size = "md" }: { person: Person; size?: "md" | "lg" }) {
  const cls =
    size === "lg"
      ? "w-20 h-20 text-[24px]"
      : "w-12 h-12 text-[16px]";
  if (person.photo) {
    return (
      <img
        src={person.photo}
        alt={person.name}
        className={`${cls} rounded-full object-cover shrink-0`}
      />
    );
  }
  return (
    <div
      className={`${cls} rounded-full flex items-center justify-center font-mono font-medium shrink-0 bg-[color-mix(in_srgb,var(--fg)_8%,transparent)]`}
    >
      {person.initials}
    </div>
  );
}

function PersonCard({ person, onOpen }: { person: Person; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="w-full text-left cursor-pointer border border-theme rounded-lg p-5 transition-colors hover:bg-[color-mix(in_srgb,var(--fg)_2%,transparent)]"
    >
      <div className="flex items-center gap-4 mb-3">
        <Avatar person={person} />
        <div>
          <h3 className="text-[16px] font-semibold">{person.name}</h3>
          <p className="text-[13px] font-mono text-muted">{person.role}</p>
        </div>
      </div>
      <p className="text-[14px] leading-relaxed text-muted mb-3">{person.bio[0]}</p>
      <div className="link-accent text-[14px] font-medium inline-flex items-center gap-1">
        View profile <ArrowUpRight size={13} />
      </div>
    </button>
  );
}

function Section({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="text-[12px] font-mono tracking-widest uppercase mb-4 text-muted">
        {label}
      </h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function PersonModal({
  person,
  onClose,
}: {
  person: Person | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!person) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [person, onClose]);

  if (!person) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label={person.name}
    >
      <div
        className="fixed inset-0 bg-black/60"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className="relative mt-16 w-full max-w-[640px] rounded-lg p-8 border border-theme"
        style={{ backgroundColor: "var(--bg)" }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 w-[28px] h-[28px] flex items-center justify-center rounded-md"
          style={{ color: "var(--muted)" }}
        >
          <X size={16} />
        </button>

        <div className="flex items-center gap-5 mb-5 pr-8">
          <Avatar person={person} size="lg" />
          <div>
            <h3 className="text-[24px] font-semibold">{person.name}</h3>
            <p className="text-[14px] font-mono text-muted">{person.role}</p>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          {person.bio.map((paragraph, i) => (
            <p key={i} className="text-[16px] leading-[1.8] text-muted">
              {paragraph}
            </p>
          ))}
        </div>

        <a
          href={person.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="link-accent text-[13px] font-mono inline-flex items-center gap-1.5 hover:underline"
        >
          LinkedIn <ArrowUpRight size={11} />
        </a>
      </div>
    </div>
  );
}

export default function TeamPage() {
  const [selected, setSelected] = useState<Person | null>(null);

  return (
    <div className="mx-auto max-w-[680px] px-5 md:px-8 py-16 md:py-24">
      <h1 className="text-[28px] md:text-[36px] font-semibold tracking-tight mb-3">
        {TEAM.heading}
      </h1>
      <p className="text-[15px] leading-[1.8] mb-10 text-muted">
        The people behind FairMed AI.
      </p>

      <hr className="my-8 border-theme" />

      <div className="space-y-12">
        <Section label="Founder">
          <PersonCard person={TEAM.founder} onOpen={() => setSelected(TEAM.founder)} />
        </Section>

        <hr className="my-8 border-theme" />

        <Section label="Board of Advisors">
          {TEAM.advisors.map((advisor) => (
            <PersonCard
              key={advisor.name}
              person={advisor}
              onOpen={() => setSelected(advisor)}
            />
          ))}
        </Section>
      </div>

      <PersonModal person={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
