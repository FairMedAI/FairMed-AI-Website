"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

export function CopyButton({
  text,
  label,
  className = "",
}: {
  text: string;
  label?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <button
      onClick={handleCopy}
      className={`inline-flex items-center gap-1.5 text-[12px] font-mono transition-colors ${className}`}
    >
      {copied ? (
        <>
          <Check size={12} className="text-emerald-500" />
          <span className="text-emerald-500">Copied</span>
        </>
      ) : (
        <>
          <Copy size={12} />
          {label && <span>{label}</span>}
        </>
      )}
    </button>
  );
}
