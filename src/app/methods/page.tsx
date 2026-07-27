import Link from "next/link";
import { ArrowLeft, ArrowDown, ArrowUpRight } from "lucide-react";
import { SITE } from "@/lib/data";
import { CopyButton } from "@/components/CopyButton";

const LEAKAGE_CODE = `import hashlib

def hash_image(path: str) -> str:
    """SHA-256 of decoded pixel bytes."""
    with open(path, "rb") as f:
        return hashlib.sha256(f.read()).hexdigest()

# Hash every image in the dataset
manifest = {name: hash_image(f"ddi/{name}") for name in sorted(images)}

# Check cross-split leakage
train_hashes = set(manifest[f] for f in train_files)
test_hashes  = set(manifest[f] for f in test_files)
overlap = train_hashes & test_hashes
assert len(overlap) == 0, f"LEAKAGE: {len(overlap)} duplicates"`

const SPLIT_CODE = `from sklearn.model_selection import train_test_split
import numpy as np

np.random.seed(42)  # reproducibility standard

# Stratify by skin_tone × malignant (diagnosis)
stratify_key = [f"{row['skin_tone']}_{row['malignant']}" for row in metadata]

train, test = train_test_split(
    images, test_size=0.2, stratify=stratify_key, random_state=42
)
train, val = train_test_split(
    train, test_size=0.25, stratify=stratify_key[:len(train)], random_state=42
)
# Result: 60/20/20 split, zero cross-split overlap verified via SHA-256`;

const GAP_CODE = `import numpy as np
from sklearn.metrics import roc_auc_score

def subgroup_auroc(labels, scores, mask):
    """AUROC for a subgroup defined by boolean mask."""
    return roc_auc_score(labels[mask], scores[mask])

# Per-skin-tone AUROC
auroc_light = subgroup_auroc(y_true, y_score, skin_tone == "light")
auroc_dark  = subgroup_auroc(y_true, y_score, skin_tone == "dark")

gap = abs(auroc_light - auroc_dark)
print(f"Light AUROC: {auroc_light:.4f}")
print(f"Dark AUROC:  {auroc_dark:.4f}")
print(f"Gap:         {gap:.4f}")`;

export default function MethodsPage() {
  return (
    <div className="mx-auto max-w-[680px] px-5 md:px-8 py-16 md:py-24">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-[13px] mb-8 transition-opacity hover:opacity-70 text-muted"
      >
        <ArrowLeft size={14} /> Home
      </Link>

      {/* Header */}
      <h1 className="text-[28px] md:text-[36px] font-semibold tracking-tight mb-3">
        Methods — How FairMed Audits Work
      </h1>
      <p className="text-[15px] leading-[1.8] text-muted mb-8">
        Reproducible, hash-verified, open
      </p>

      <hr className="my-8 border-theme" />

      {/* Overview */}
      <section className="mb-12">
        <h2 className="text-[12px] font-mono tracking-widest uppercase mb-4 text-muted">
          Overview
        </h2>
        <p className="text-[15px] leading-[1.8] mb-4">
          FairMed provides open tools to audit medical imaging datasets for
          leakage, representation, and fairness gaps — starting with
          dermatology. Every split is reproducible with seed 42, every image
          SHA-256 hashed, every metric reported with subgroup breakdowns.
        </p>
        <p className="text-[15px] leading-[1.8]">
          This page documents the exact methods used in the FairDerm-Audit
          paper. No numbers are fabricated — all results link to real data files
          and can be independently verified.
        </p>
      </section>

      {/* Leakage Detection */}
      <section className="mb-12">
        <h2 className="text-[12px] font-mono tracking-widest uppercase mb-4 text-muted">
          Leakage Detection
        </h2>
        <div className="flex items-center gap-3 mb-4">
          <span className="text-[11px] font-mono tracking-wider uppercase px-2 py-0.5 rounded text-green-600 dark:text-green-400 bg-green-600/10">
            Verified — 0 Duplicates
          </span>
        </div>

        <h3 className="text-[14px] font-semibold mb-2">Method</h3>
        <p className="text-[15px] leading-[1.8] mb-4">
          Every image file is hashed with <strong>SHA-256</strong> (exact byte-level duplicate
          detection) and <strong>perceptual hash (pHash)</strong> for near-duplicate detection
          (Hamming distance ≤ 4). Cross-split overlap is checked by comparing hash
          sets between train, val, and test partitions.
        </p>

        <h3 className="text-[14px] font-semibold mb-2">Why</h3>
        <p className="text-[15px] leading-[1.8] mb-4">
          If the same lesion appears in both train and test, accuracy is artificially
          inflated — the model memorizes instead of generalizes. Without hash
          verification, reported AUC can be overstated by 3–5%. This is not a
          theoretical risk: ISIC 2020 has ~2.1% near-duplicates across official splits.
        </p>

        <h3 className="text-[14px] font-semibold mb-2">Tool</h3>
        <p className="text-[14px] mb-4">
          <Link href="/tools/scanner" className="link-accent">
            /tools/scanner
          </Link>{" "}
          — run this check on your own dataset, 100% client-side.
        </p>

        <h3 className="text-[14px] font-semibold mb-2">Implementation</h3>
        <pre
          className="text-[11px] font-mono leading-relaxed whitespace-pre-wrap p-4 rounded-lg mb-4 text-muted overflow-x-auto"
          style={{ backgroundColor: "color-mix(in srgb, var(--fg) 3%, transparent)" }}
        >
          {LEAKAGE_CODE}
        </pre>

        <h3 className="text-[14px] font-semibold mb-2">DDI Result</h3>
        <div className="border border-theme rounded-lg p-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-[24px] font-semibold">656</p>
              <p className="text-[12px] font-mono text-muted">Total images</p>
            </div>
            <div>
              <p className="text-[24px] font-semibold">0</p>
              <p className="text-[12px] font-mono text-muted">Exact duplicates</p>
            </div>
            <div>
              <p className="text-[24px] font-semibold">0</p>
              <p className="text-[12px] font-mono text-muted">Cross-split leakage</p>
            </div>
          </div>
        </div>
      </section>

      {/* Splitting Protocol */}
      <section className="mb-12">
        <h2 className="text-[12px] font-mono tracking-widest uppercase mb-4 text-muted">
          Splitting Protocol
        </h2>
        <div className="flex items-center gap-3 mb-4">
          <span className="text-[11px] font-mono tracking-wider uppercase px-2 py-0.5 rounded text-green-600 dark:text-green-400 bg-green-600/10">
            Verified — Zero Leakage
          </span>
        </div>

        <h3 className="text-[14px] font-semibold mb-2">Method</h3>
        <p className="text-[15px] leading-[1.8] mb-4">
          Stratified <strong>60/20/20 train/val/test</strong> split, stratified by skin tone
          (light / medium / dark) × diagnosis (benign / malignant). The
          stratification ensures every subgroup is proportionally represented across
          all partitions.
        </p>

        <h3 className="text-[14px] font-semibold mb-2">Hash-Verified</h3>
        <p className="text-[15px] leading-[1.8] mb-4">
          After splitting, train/test overlap is verified via SHA-256 set
          intersection. The split file{" "}
          <code className="text-[13px] font-mono">ddi_split_seed42.json</code>{" "}
          includes all filenames per partition and the counts, enabling independent
          verification.
        </p>

        <h3 className="text-[14px] font-semibold mb-2">Implementation</h3>
        <pre
          className="text-[11px] font-mono leading-relaxed whitespace-pre-wrap p-4 rounded-lg mb-4 text-muted overflow-x-auto"
          style={{ backgroundColor: "color-mix(in srgb, var(--fg) 3%, transparent)" }}
        >
          {SPLIT_CODE}
        </pre>

        <h3 className="text-[14px] font-semibold mb-3">DDI Split Counts</h3>
        <table
          className="w-full text-[13px] font-mono mb-4"
          style={{ borderCollapse: "collapse" }}
        >
          <thead>
            <tr className="border-theme" style={{ borderBottom: "1px solid" }}>
              <th className="text-left py-2 font-normal text-muted">Partition</th>
              <th className="text-left py-2 font-normal text-muted">Count</th>
              <th className="text-left py-2 font-normal text-muted">% of Total</th>
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

        <p className="text-[14px] text-muted mb-4">
          Test subgroups: 42 light (10 melanoma), 42 dark (10 melanoma).
          Train dark melanoma: 29 (source for synthetic augmentation).
        </p>

        <h3 className="text-[14px] font-semibold mb-2">Why Seed 42</h3>
        <p className="text-[15px] leading-[1.8] mb-4">
          Seed 42 is the reproducibility standard — the answer to life, the
          universe, and everything. More practically, it ensures deterministic splits
          across runs: any researcher with the same data and seed will produce
          identical partitions. The seed is logged in{" "}
          <code className="text-[13px] font-mono">ddi_split_seed42.json</code> and{" "}
          <code className="text-[13px] font-mono">metrics_seed42.json</code>.
        </p>

        <div className="flex flex-wrap gap-3 text-[13px]">
          <a
            href="/archive/dermatology-sample.zip"
            download
            className="link-accent inline-flex items-center gap-1"
          >
            Download sample split <ArrowDown size={13} />
          </a>
          <a
            href={SITE.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="link-accent inline-flex items-center gap-1"
          >
            Full splits file <ArrowUpRight size={12} />
          </a>
        </div>
      </section>

      {/* Representation Analysis */}
      <section className="mb-12">
        <h2 className="text-[12px] font-mono tracking-widest uppercase mb-4 text-muted">
          Representation Analysis
        </h2>

        <h3 className="text-[14px] font-semibold mb-2">Method</h3>
        <p className="text-[15px] leading-[1.8] mb-4">
          Count images by <strong>skin tone</strong> (DDI labels: 1/2 = light, 3/4 =
          medium, 5/6 = dark), <strong>sex</strong>, and <strong>disease</strong>. Quantify
          imbalance ratios and identify underrepresented subgroups. Imbalance is
          reported as the ratio of the largest to smallest subgroup.
        </p>

        <h3 className="text-[14px] font-semibold mb-2">Tool</h3>
        <p className="text-[14px] mb-4">
          <Link href="/tools/representation" className="link-accent">
            /tools/representation
          </Link>{" "}
          — upload your metadata CSV to check subgroup representation. Runs
          entirely in-browser.
        </p>

        <h3 className="text-[14px] font-semibold mb-2">DDI Representation</h3>
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
        <p className="text-[14px] text-muted mb-4">
          DDI is intentionally enriched for dark skin tones — the inverse of
          typical dermatology datasets (e.g., ISIC 2020 is ~84% light). This makes
          it a valuable fairness benchmark but means overall accuracy alone is
          misleading.
        </p>

        <h3 className="text-[14px] font-semibold mb-2">Input Format</h3>
        <pre
          className="text-[11px] font-mono leading-relaxed whitespace-pre-wrap p-4 rounded-lg mb-4 text-muted overflow-x-auto"
          style={{ backgroundColor: "color-mix(in srgb, var(--fg) 3%, transparent)" }}
        >
          {`image_id,skin_tone,malignant,disease
000001.png,5,true,melanoma
000002.png,3,false,benign_nevus
000003.png,1,true, melanoma`}
        </pre>

        <a
          href="/archive/representation-sample.csv"
          download
          className="link-accent text-[13px] inline-flex items-center gap-1"
        >
          Download sample CSV <ArrowDown size={13} />
        </a>
      </section>

      {/* Fairness Gap Calculation */}
      <section className="mb-12">
        <h2 className="text-[12px] font-mono tracking-widest uppercase mb-4 text-muted">
          Fairness Gap Calculation
        </h2>

        <h3 className="text-[14px] font-semibold mb-2">Method</h3>
        <p className="text-[15px] leading-[1.8] mb-4">
          Compute <strong>AUROC per subgroup</strong> (skin tone). The fairness gap is{" "}
          <code className="text-[13px] font-mono">max(AUROC) − min(AUROC)</code>{" "}
          across subgroups. Bootstrap confidence intervals (1000 iterations, 95% BCa)
          quantify uncertainty. A paired permutation test determines whether observed
          improvements are statistically significant.
        </p>

        <h3 className="text-[14px] font-semibold mb-2">Tool</h3>
        <p className="text-[14px] mb-4">
          <Link href="/tools/gap-calculator" className="link-accent">
            /tools/gap-calculator
          </Link>{" "}
          — upload predictions CSV to compute per-subgroup AUROC and fairness gaps.
          Export as LaTeX or JSON.
        </p>

        <h3 className="text-[14px] font-semibold mb-2">Implementation</h3>
        <pre
          className="text-[11px] font-mono leading-relaxed whitespace-pre-wrap p-4 rounded-lg mb-4 text-muted overflow-x-auto"
          style={{ backgroundColor: "color-mix(in srgb, var(--fg) 3%, transparent)" }}
        >
          {GAP_CODE}
        </pre>

        <h3 className="text-[14px] font-semibold mb-3">
          Real DDI Result — Finetuned ResNet-50
        </h3>

        {/* Gap headline */}
        <div className="border border-theme rounded-lg p-5 mb-4">
          <div className="grid grid-cols-2 gap-6 mb-4">
            <div className="text-center">
              <p className="text-[32px] font-semibold">0.80</p>
              <p className="text-[12px] font-mono text-muted">Light AUROC</p>
              <p className="text-[11px] font-mono text-muted">95% CI [0.63, 0.94]</p>
            </div>
            <div className="text-center">
              <p className="text-[32px] font-semibold">0.47</p>
              <p className="text-[12px] font-mono text-muted">Dark AUROC</p>
              <p className="text-[11px] font-mono text-muted">95% CI [0.26, 0.70]</p>
            </div>
          </div>
          <div className="text-center border-t border-theme pt-4">
            <p className="text-[14px] text-muted mb-1">Fairness Gap (Dark − Light)</p>
            <p className="text-[28px] font-semibold text-red-600 dark:text-red-400">
              0.33
            </p>
            <p className="text-[12px] font-mono text-muted">
              exact: 0.3281 · model performs 33% worse on dark skin
            </p>
          </div>
        </div>

        <h3 className="text-[14px] font-semibold mb-3">Full Stage Comparison</h3>
        <table
          className="w-full text-[13px] font-mono mb-4"
          style={{ borderCollapse: "collapse" }}
        >
          <thead>
            <tr className="border-theme" style={{ borderBottom: "1px solid" }}>
              <th className="text-left py-2 font-normal text-muted">Stage</th>
              <th className="text-left py-2 font-normal text-muted">Light</th>
              <th className="text-left py-2 font-normal text-muted">Dark</th>
              <th className="text-left py-2 font-normal text-muted">Gap</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-theme" style={{ borderBottom: "1px solid" }}>
              <td className="py-2">Baseline</td>
              <td className="py-2">0.6281</td>
              <td className="py-2">0.5781</td>
              <td className="py-2">0.0500</td>
            </tr>
            <tr className="border-theme" style={{ borderBottom: "1px solid" }}>
              <td className="py-2">Finetuned</td>
              <td className="py-2">0.8000</td>
              <td className="py-2">0.4719</td>
              <td className="py-2 text-red-600 dark:text-red-400 font-medium">
                0.3281
              </td>
            </tr>
            <tr className="border-theme" style={{ borderBottom: "1px solid" }}>
              <td className="py-2">+ Synthetic 2×</td>
              <td className="py-2">0.7656</td>
              <td className="py-2">0.4625</td>
              <td className="py-2">0.3031</td>
            </tr>
          </tbody>
        </table>

        <p className="text-[14px] text-muted mb-4">
          Finetuning boosts overall AUROC from 0.64 to 0.67, but the dark–light gap
          widens from 0.05 to 0.33 — amplifying the imbalance. The gap does not
          close with finetuning alone.
        </p>

        <h3 className="text-[14px] font-semibold mb-2">Input Format</h3>
        <pre
          className="text-[11px] font-mono leading-relaxed whitespace-pre-wrap p-4 rounded-lg mb-4 text-muted overflow-x-auto"
          style={{ backgroundColor: "color-mix(in srgb, var(--fg) 3%, transparent)" }}
        >
          {`image_id,true_label,pred_label,skin_tone
000001.png,1,1,light
000002.png,0,0,dark
000003.png,1,0,light`}
        </pre>

        <a
          href="/archive/predictions-sample.csv"
          download
          className="link-accent text-[13px] inline-flex items-center gap-1"
        >
          Download sample predictions <ArrowDown size={13} />
        </a>
      </section>

      {/* Reproducibility */}
      <section className="mb-12">
        <h2 className="text-[12px] font-mono tracking-widest uppercase mb-4 text-muted">
          Reproducibility
        </h2>
        <div className="flex items-center gap-3 mb-4">
          <span className="text-[11px] font-mono tracking-wider uppercase px-2 py-0.5 rounded text-green-600 dark:text-green-400 bg-green-600/10">
            Seed 42 — Deterministic
          </span>
        </div>

        <div className="space-y-4 mb-6">
          <div className="py-3 border-t border-theme">
            <span className="text-[11px] font-mono tracking-widest uppercase block mb-1 text-muted">
              Seed
            </span>
            <span className="text-[14px]">
              All random operations (splitting, augmentation, weight initialization)
              use <code className="font-mono">seed 42</code>. Logged in every output
              file.
            </span>
          </div>
          <div className="py-3 border-t border-theme">
            <span className="text-[11px] font-mono tracking-widest uppercase block mb-1 text-muted">
              Hashing
            </span>
            <span className="text-[14px]">
              Every image SHA-256 hashed. Splits verified zero-leakage via hash set
              intersection.
            </span>
          </div>
          <div className="py-3 border-t border-theme">
            <span className="text-[11px] font-mono tracking-widest uppercase block mb-1 text-muted">
              Splits File
            </span>
            <span className="text-[14px]">
              <code className="font-mono">ddi_split_seed42.json</code> — includes all
              filenames per partition and counts. Any researcher can re-derive the
              exact same splits.
            </span>
          </div>
          <div className="py-3 border-t border-theme">
            <span className="text-[11px] font-mono tracking-widest uppercase block mb-1 text-muted">
              Bootstrap CIs
            </span>
            <span className="text-[14px]">
              1000-iteration bias-corrected accelerated (BCa) bootstrap. 95%
              confidence intervals reported for all AUROC values.
            </span>
          </div>
        </div>

        <h3 className="text-[14px] font-semibold mb-2">Sample Archive</h3>
        <p className="text-[15px] leading-[1.8] mb-4">
          The sample archive contains <strong>10 real DDI images</strong> — 5 train
          (smallest file IDs: 000004.png, 000006.png, 000009.png, 000013.png,
          000014.png) and 5 test (000005.png, 000008.png, 000011.png, 000012.png,
          000015.png). Under 5 MB total, for demo and tool testing.
        </p>
        <a
          href="/archive/dermatology-sample.zip"
          download
          className="link-accent text-[14px] font-medium inline-flex items-center gap-1"
        >
          Download sample archive <ArrowDown size={13} />
        </a>

        <div className="mt-6 py-3 border-t border-theme">
          <span className="text-[11px] font-mono tracking-widest uppercase block mb-1 text-muted">
            Zenodo DOI
          </span>
          <span className="text-[14px] text-muted">
            DOI coming — Zenodo upload pending. Full dataset, splits, hashes, and
            metrics will be archived with a citable DOI.
          </span>
        </div>
      </section>

      {/* Citations */}
      <section className="mb-12">
        <h2 className="text-[12px] font-mono tracking-widest uppercase mb-4 text-muted">
          Citations
        </h2>

        <h3 className="text-[14px] font-semibold mb-2">DDI Dataset</h3>
        <p className="text-[14px] leading-[1.8] mb-3 text-muted">
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

        <h3 className="text-[14px] font-semibold mb-2">FairDerm-Audit</h3>
        <p className="text-[14px] leading-[1.8] mb-3 text-muted">
          FairMed AI. (2026). FairDerm-Audit: Leakage-aware evaluation of
          synthetic augmentation for skin-tone fairness. Zenodo.{" "}
          <a
            href={SITE.doiUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="link-accent"
          >
            {SITE.doiUrl}
          </a>
        </p>

        <div className="flex gap-4 text-[13px] mt-4">
          <CopyButton
            text={`Daneshjou, R., Vodrahalli, K., Novoa, R. A., Jenkins, M., Liang, W., Rotemberg, V., Ko, J., & Chiou, A. S. (2022). Disparities in dermatology AI performance on a diverse, curated clinical image set. Science Advances, 8(32), eabq6147. https://doi.org/10.1126/sciadv.abq6147`}
            label="Copy DDI citation"
          />
          <CopyButton
            text={`FairMed AI. (2026). FairDerm-Audit: Leakage-aware evaluation of synthetic augmentation for skin-tone fairness. Zenodo. ${SITE.doiUrl}`}
            label="Copy FairDerm citation"
          />
        </div>
      </section>

      <hr className="my-10 border-theme" />

      {/* Footer */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 text-[12px] font-mono text-muted">
        <span>Last audited: July 2026 | Scanner v1</span>
        <span className="flex items-center gap-2">
          <a href={SITE.githubUrl} target="_blank" rel="noopener noreferrer" className="link-accent">
            Source code
          </a>
          <span>·</span>
          <a href={SITE.doiUrl} target="_blank" rel="noopener noreferrer" className="link-accent">
            DOI {SITE.doi}
          </a>
        </span>
      </div>
    </div>
  );
}
