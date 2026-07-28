import Link from "next/link";
import { ArrowLeft, ArrowDown, ArrowUpRight } from "lucide-react";
import { SITE } from "@/lib/data";

const VERIFY_CODE = `import json

with open("splits/ddi_split_seed42.json") as f:
    splits = json.load(f)

overlap = set(splits["train"]) & set(splits["test"])
print(f"Overlap: {len(overlap)}")  # must be 0`;

export default function DDIAuditPage() {
  return (
    <div className="mx-auto max-w-[680px] px-5 md:px-8 py-16 md:py-24">
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[13px] transition-opacity hover:opacity-70 text-muted"
        >
          <ArrowLeft size={14} /> Home
        </Link>
        <span className="text-muted">·</span>
        <a
          href="https://github.com/FairMedAI/fairderm-audit"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-[13px] transition-opacity hover:opacity-70 text-muted"
        >
          GitHub <ArrowUpRight size={12} />
        </a>
      </div>

      {/* ── 1. Header ────────────────────────────────────── */}
      <h1 className="text-[28px] md:text-[36px] font-semibold tracking-tight mb-3">
        DDI Audit Report
      </h1>
      <p className="text-[15px] leading-[1.8] text-muted mb-5">
        Diverse Dermatology Images — Daneshjou et al. 2022 (Stanford)
      </p>

      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="text-[11px] font-mono tracking-wider uppercase px-2 py-0.5 rounded text-green-600 dark:text-green-400 bg-green-600/10">
          Verified
        </span>
        <span className="text-[11px] font-mono tracking-wider uppercase px-2 py-0.5 rounded text-green-600 dark:text-green-400 bg-green-600/10">
          656 images
        </span>
        <span className="text-[11px] font-mono tracking-wider uppercase px-2 py-0.5 rounded text-green-600 dark:text-green-400 bg-green-600/10">
          0 leakage
        </span>
        <span className="text-[11px] font-mono tracking-wider uppercase px-2 py-0.5 rounded text-green-600 dark:text-green-400 bg-green-600/10">
          Last: July 2026
        </span>
      </div>

      <div className="flex flex-wrap gap-3 text-[13px] mb-8">
        <a
          href="https://doi.org/10.1126/sciadv.abq6147"
          target="_blank"
          rel="noopener noreferrer"
          className="link-accent inline-flex items-center gap-1"
        >
          DDI Paper <ArrowUpRight size={12} />
        </a>
        <span className="text-muted">·</span>
        <a
          href="https://stanfordaimi.stanford.edu/ddi-diverse-dermatology-images/"
          target="_blank"
          rel="noopener noreferrer"
          className="link-accent inline-flex items-center gap-1"
        >
          DDI Dataset <ArrowUpRight size={12} />
        </a>
      </div>

      <hr className="my-8 border-theme" />

      {/* ── 2. Summary Grid ──────────────────────────────── */}
      <section className="mb-12">
        <h2 className="text-[12px] font-mono tracking-widest uppercase mb-4 text-muted">
          Summary
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="border border-theme rounded-lg p-4 text-center">
            <p className="text-[28px] font-semibold">656</p>
            <p className="text-[11px] font-mono text-muted uppercase">Total images</p>
          </div>
          <div className="border border-theme rounded-lg p-4 text-center">
            <p className="text-[28px] font-semibold">0</p>
            <p className="text-[11px] font-mono text-muted uppercase">Duplicates (SHA256)</p>
          </div>
          <div className="border border-theme rounded-lg p-4 text-center">
            <p className="text-[28px] font-semibold">0</p>
            <p className="text-[11px] font-mono text-muted uppercase">Leakage</p>
          </div>
          <div className="border border-theme rounded-lg p-4 text-center">
            <p className="text-[28px] font-semibold">60/20/20</p>
            <p className="text-[11px] font-mono text-muted uppercase">Split · seed 42</p>
          </div>
        </div>
      </section>

      {/* ── 3. Split Table ───────────────────────────────── */}
      <section className="mb-12">
        <h2 className="text-[12px] font-mono tracking-widest uppercase mb-4 text-muted">
          Split
        </h2>
        <div className="flex items-center gap-3 mb-4">
          <span className="text-[11px] font-mono tracking-wider uppercase px-2 py-0.5 rounded text-green-600 dark:text-green-400 bg-green-600/10">
            Verified — Zero Leakage
          </span>
        </div>

        <table
          className="w-full text-[13px] font-mono mb-4"
          style={{ borderCollapse: "collapse" }}
        >
          <thead>
            <tr className="border-theme" style={{ borderBottom: "1px solid" }}>
              <th className="text-left py-2 font-normal text-muted">Split</th>
              <th className="text-left py-2 font-normal text-muted">Count</th>
              <th className="text-left py-2 font-normal text-muted">%</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-theme" style={{ borderBottom: "1px solid" }}>
              <td className="py-2">Train</td>
              <td className="py-2">393</td>
              <td className="py-2">59.9%</td>
            </tr>
            <tr className="border-theme" style={{ borderBottom: "1px solid" }}>
              <td className="py-2">Val</td>
              <td className="py-2">131</td>
              <td className="py-2">20.0%</td>
            </tr>
            <tr className="border-theme" style={{ borderBottom: "1px solid" }}>
              <td className="py-2">Test</td>
              <td className="py-2">132</td>
              <td className="py-2">20.1%</td>
            </tr>
            <tr className="border-theme" style={{ borderBottom: "1px solid" }}>
              <td className="py-2 font-medium">Total</td>
              <td className="py-2 font-medium">656</td>
              <td className="py-2 font-medium">100%</td>
            </tr>
          </tbody>
        </table>

        <p className="text-[14px] text-muted">
          Stratified by skin_tone × malignant, seed 42. Train dark melanoma: 29
          (source for synthetic augmentation).
        </p>
      </section>

      {/* ── 4. Representation ────────────────────────────── */}
      <section className="mb-12">
        <h2 className="text-[12px] font-mono tracking-widest uppercase mb-4 text-muted">
          Representation
        </h2>

        <div className="border border-theme rounded-lg p-4 mb-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-[24px] font-semibold">~60%</p>
              <p className="text-[12px] font-mono text-muted">Dark (V–VI)</p>
            </div>
            <div>
              <p className="text-[24px] font-semibold">~25%</p>
              <p className="text-[12px] font-mono text-muted">Medium (III–IV)</p>
            </div>
            <div>
              <p className="text-[24px] font-semibold">~15%</p>
              <p className="text-[12px] font-mono text-muted">Light (I–II)</p>
            </div>
          </div>
        </div>

        <p className="text-[14px] text-muted">
          DDI is intentionally enriched for dark skin tones — the inverse of
          typical dermatology datasets. Test set balanced: 42 light / 42 dark (10
          melanoma each) for fair evaluation.
        </p>
      </section>

      {/* ── 5. Fairness Gap ──────────────────────────────── */}
      <section className="mb-12">
        <h2 className="text-[12px] font-mono tracking-widest uppercase mb-4 text-muted">
          Fairness Gap
        </h2>

        <h3 className="text-[14px] font-semibold mb-3">Core Result</h3>

        <table
          className="w-full text-[13px] font-mono mb-4"
          style={{ borderCollapse: "collapse" }}
        >
          <thead>
            <tr className="border-theme" style={{ borderBottom: "1px solid" }}>
              <th className="text-left py-2 font-normal text-muted">Model</th>
              <th className="text-left py-2 font-normal text-muted">Light AUROC</th>
              <th className="text-left py-2 font-normal text-muted">Dark AUROC</th>
              <th className="text-left py-2 font-normal text-muted">Gap</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-theme" style={{ borderBottom: "1px solid" }}>
              <td className="py-2">Finetuned</td>
              <td className="py-2">0.8000</td>
              <td className="py-2">0.4719</td>
              <td className="py-2 text-red-600 dark:text-red-400 font-medium">
                0.3281
              </td>
            </tr>
            <tr className="border-theme" style={{ borderBottom: "1px solid" }}>
              <td className="py-2">Baseline</td>
              <td className="py-2">0.6281</td>
              <td className="py-2">0.5781</td>
              <td className="py-2">0.0500</td>
            </tr>
          </tbody>
        </table>

        <p className="text-[13px] text-muted mb-4">
          Bootstrap CI (1000× BCa): Light AUROC [0.63, 0.94] · Dark AUROC [0.26,
          0.70]
        </p>

        {/* Gap headline */}
        <div className="border border-theme rounded-lg p-5 mb-4">
          <div className="text-center">
            <p className="text-[14px] text-muted mb-1">
              Finetuned Fairness Gap (Light − Dark)
            </p>
            <p className="text-[28px] font-semibold text-red-600 dark:text-red-400">
              0.33
            </p>
            <p className="text-[12px] font-mono text-muted">
              exact: 0.3281 · gap persists after finetuning — dark skin performance drops
            </p>
          </div>
        </div>

        <p className="text-[14px] text-muted">
          Finetuning boosts light AUROC from 0.63 to 0.80 but drops dark AUROC
          from 0.58 to 0.47. The gap widens from 0.05 to 0.33 — amplifying the
          imbalance rather than closing it.
        </p>
      </section>

      {/* ── 6. Files ─────────────────────────────────────── */}
      <section className="mb-12">
        <h2 className="text-[12px] font-mono tracking-widest uppercase mb-4 text-muted">
          Files
        </h2>
        <div className="space-y-3 text-[14px]">
          <a
            href="/archive/ddi_split_seed42.json"
            download
            className="link-accent inline-flex items-center gap-1"
          >
            ddi_split_seed42.json <ArrowDown size={13} />
          </a>
          <p className="text-[12px] text-muted -mt-1 ml-5">
            SHA-256 hashes included. All filenames per partition.
          </p>

          <a
            href="/archive/dermatology-sample.zip"
            download
            className="link-accent inline-flex items-center gap-1"
          >
            dermatology-sample.zip <ArrowDown size={13} />
          </a>
          <p className="text-[12px] text-muted -mt-1 ml-5">
            10 real DDI images for demo and tool testing.
          </p>

          <div className="pt-2 flex flex-wrap gap-3 text-[13px]">
            <Link href="/methods" className="link-accent inline-flex items-center gap-1">
              Protocol → /methods
            </Link>
            <span className="text-muted">·</span>
            <Link href="/tools/scanner" className="link-accent inline-flex items-center gap-1">
              Verify → /tools/scanner
            </Link>
          </div>
        </div>
      </section>

      {/* ── 7. How to Verify ─────────────────────────────── */}
      <section className="mb-12">
        <h2 className="text-[12px] font-mono tracking-widest uppercase mb-4 text-muted">
          How to Verify
        </h2>
        <pre
          className="text-[11px] font-mono leading-relaxed whitespace-pre-wrap p-4 rounded-lg mb-4 text-muted overflow-x-auto"
          style={{ backgroundColor: "color-mix(in srgb, var(--fg) 3%, transparent)" }}
        >
          {VERIFY_CODE}
        </pre>
        <p className="text-[14px] text-muted">
          Expected output: <code className="font-mono text-[13px]">Overlap: 0</code>.
          Any non-zero result indicates leakage.
        </p>
      </section>

      {/* ── 8. Limitations ──────────────────────────────── */}
      <section className="mb-12">
        <h2 className="text-[12px] font-mono tracking-widest uppercase mb-4 text-muted">
          Limitations
        </h2>
        <p className="text-[15px] leading-[1.8]">
          Not clinical. Checks file hashes only. Gap metrics from single seed.
        </p>
      </section>

      <hr className="my-10 border-theme" />

      {/* ── 9. Footer ────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 text-[12px] font-mono text-muted">
        <span>Audited with FairMed Scanner v1 · 656 images · July 2026 · DOI: Zenodo pending</span>
      </div>

      <div className="mt-6">
        <p className="text-[13px] leading-[1.8] text-muted">
          Daneshjou, R., Vodrahalli, K., Novoa, R. A., Jenkins, M., Liang, W.,
          Rotemberg, V., Ko, J., &amp; Chiou, A. S. (2022). Disparities in
          dermatology AI performance on a diverse, curated clinical image set.{" "}
          <em>Science Advances</em>, <em>8</em>(32), eabq6147.{" "}
          <a
            href="https://doi.org/10.1126/sciadv.abq6147"
            target="_blank"
            rel="noopener noreferrer"
            className="link-accent"
          >
            https://doi.org/10.1126/sciadv.abq6147
          </a>
        </p>
      </div>
    </div>
  );
}
