export const SITE = {
  title: "FairMed AI",
  tagline: "Research Lab · est. 2026",
  copyright: "FairMed AI (c) 2026",
  doi: "10.5281/zenodo.21543770",
  doiUrl: "https://doi.org/10.5281/zenodo.21543770",
  zenodoUrl: "https://zenodo.org/records/21543770",
  githubUrl: "https://github.com/FairMedAI",
  linkedinUrl: "https://www.linkedin.com/company/fairmedai",
  zenodoCommunityUrl: "https://zenodo.org/communities/fairmedai",
  personalGithubUrl: "https://github.com/ShanmukaGottimukkala",
  personalLinkedinUrl: "https://www.linkedin.com/in/shanmuka-gottimukkala/",
  licenseCode: "MIT",
  licensePaper: "CC-BY-4.0",
} as const;

export const NAV = [
  { id: "home", label: "Home", href: "/" },
  { id: "papers", label: "Papers", href: "/papers" },
  { id: "protocol", label: "Protocol", href: "/protocol" },
  { id: "methods", label: "Methods", href: "/methods" },
  { id: "audit", label: "Audits", href: "/audit" },
  { id: "tools", label: "Tools", href: "/tools" },
  { id: "archive", label: "Archive", href: "/archive" },
  { id: "community", label: "Community", href: "/community" },
  { id: "about", label: "About", href: "/about" },
] as const;

export const BIBTEX = `@misc{fairmed2026fairderm,
  title        = {FairDerm-Audit: Leakage-Aware Evaluation of Synthetic Augmentation for Skin-Tone Fairness},
  author       = {FairMed AI},
  year         = {2026},
  publisher    = {Zenodo},
  doi          = {10.5281/zenodo.21543770},
  url          = {https://doi.org/10.5281/zenodo.21543770},
  howpublished = {\\url{https://zenodo.org/records/21543770}}
}`;

export const METRICS_JSON = {
  seed: 42,
  split: "60/20/20 stratified dx x fitz x source",
  n_total: 16123,
  leakage_check: "SHA256 cross-split dupes=0",
  results: [
    { method: "baseline_imagenet", auc_overall: 0.611, auc_dark: 0.572, auc_light: 0.644, gap: -0.0719 },
    { method: "finetuned_derm", auc_overall: 0.733, auc_dark: 0.612, auc_light: 0.831, gap: -0.2187 },
    { method: "finetuned+synthetic_2x_dark", auc_overall: 0.774, auc_dark: 0.738, auc_light: 0.804, gap: -0.0656, delta_auc: 0.041 },
  ],
  photometric_control: { p_value: 0.524, significant: false },
  bootstrap: { n: 1000, ci: "95% BCa" },
  n_dark_melanoma: 10,
} as const;

export const HOME = {
  subtitle: "Leakage-aware, stratified evaluation of medical imaging AI. Starting with dermatology.",
  intro: "Medical imaging AI models degrade across subgroups. Most evaluations hide this by conflating algorithmic bias with dataset leakage. We audit openly: every image SHA256-hashed, every split published [60/20/20 seed 42], every metric reported with subgroup breakdowns. Starting with dermatology [skin-tone], expanding to radiology, ophthalmology, pathology.",
  finding: "Finetuning a ResNet-50 on dermatology data boosts overall AUC from 0.611 to 0.733, but the dark-light fairness gap widens from -7.19% to -21.87%. Photometric augmentation (brightness/contrast) fails to close it (p=0.524). Controlled synthetic augmentation at 2x restores AUC to 0.774 and narrows the gap to -6.56%.",
  paperLink: "/papers/fairderm-audit",
  paperTitle: "FairDerm-Audit: Leakage-Aware Evaluation of Synthetic Augmentation for Skin-Tone Fairness",
} as const;

export const ROADMAP = [
  { domain: "Dermatology", status: "live" as const, label: "First Audit \u2014 LIVE" },
  { domain: "Radiology", status: "next" as const, label: "Next" },
  { domain: "Ophthalmology", status: "planned" as const, label: "Planned" },
  { domain: "Pathology", status: "planned" as const, label: "Planned" },
] as const;

export const WP1_BADGE = {
  label: "First Audit: Dermatology",
  note: "Methodology generalizes to radiology, ophthalmology, pathology",
} as const;

export const PAPERS = {
  wp1: {
    status: "Live",
    date: "July 25 2026",
    title: "FairDerm-Audit: Leakage-Aware Evaluation of Synthetic Augmentation for Skin-Tone Fairness",
    summary:
      "We audit three training regimes on ISIC + Fitzpatrick17k + DDI. Finetuning boosts AUC 0.611 to 0.733 but widens the skin-tone gap from -7.19% to -21.87%. Photometric augmentation fails (p=0.524). Controlled synthetic 2x augmentation restores AUC to 0.774 and closes the gap to -6.56%, with zero leakage verified via SHA256.",
    results: [
      { method: "Baseline", auc: "0.611", gap: "-7.19%", delta: "--" },
      { method: "Finetuned", auc: "0.733", gap: "-21.87%", delta: "+12.2%" },
      { method: "+ Synthetic 2x", auc: "0.774", gap: "-6.56%", delta: "+4.1%" },
    ],
    detailLink: "/papers/fairderm-audit",
  },
  wp2: {
    status: "Coming Soon",
    date: "Q1 2026",
    title: "FairDerm-Gen: Controlled Diffusion for Fitzpatrick-Conditioned Synthetic Dermatology",
    description:
      "Diffusion vs Photometric: why brightness/contrast fails on melanin, how to condition on Fitzpatrick + disease label without memorization. Fixing train-only leakage in diffusion sampler. FID stratified, dermatologist review protocol in design.",
  },
} as const;

export const WP1_DETAIL = {
  abstract: `Dermatology AI shows degraded performance on dark skin, yet evaluation often conflates algorithmic bias with dataset leakage. We present FairDerm-Audit, a leakage-aware protocol auditing three regimes on ISIC 2020 + Fitzpatrick17k + DDI (n=16,123). Baseline ImageNet ResNet-50: AUC 0.611, gap dark-light -7.19%. Finetuned on dermatology: AUC 0.733 but gap widens to -21.87%, suggesting amplification of imbalance. Photometric augmentation (brightness/contrast/hue) fails to close gap (paired permutation p=0.524 NS). Controlled synthetic augmentation (2x dark melanoma + 2x dark benign, diffusion generator conditioned on Fitzpatrick + diagnosis, train-only) restores overall AUC to 0.774 and reduces gap to -6.56% (delta +4.1% AUC). All images SHA256-hashed, zero cross-split duplicates, stratified 60/20/20 seed 42, bootstrap 1000x 95% BCa CIs. Small n=10 dark melanoma limits power; we report CIs not point estimates. Code MIT, paper CC-BY-4.0.`,
  methods: [
    { aspect: "Data", detail: "ISIC 2020 (33k), Fitzpatrick17k (16.5k with Fitzpatrick labels), DDI (656 biopsy-confirmed, diverse)" },
    { aspect: "Model", detail: "ResNet-50 ImageNet baseline, then full finetune with same hyperparams across regimes" },
    { aspect: "Leakage check", detail: "SHA256 of decoded pixels, cross-split exact + near-duplicate (pHash <=4) removal, manifest in /hashes" },
    { aspect: "Split", detail: "Stratified by diagnosis x Fitzpatrick group (I-II / III-IV / V-VI) x source, 60/20/20, seed 42, CSV published" },
    { aspect: "Threshold", detail: "Youden J on val, applied to test, per-group AUC + TPR@FPR 10%" },
    { aspect: "Synthetic", detail: "Train-only, 2x dark (V-VI) melanoma + benign, conditioned diffusion, FID 12.3 stratified, no test leakage" },
  ],
  tables: [
    { id: "T1", title: "Dataset composition", summary: "ISIC 84% light, Fitz 42% dark, DDI 78% dark. Melanoma dark n=10." },
    { id: "T2", title: "Baseline AUC", summary: "Overall 0.611 [0.58-0.64], dark 0.572, light 0.644, gap -0.0719" },
    { id: "T3", title: "Finetuned AUC", summary: "Overall 0.733 [0.70-0.76], dark 0.612, light 0.831, gap -0.2187" },
    { id: "T4", title: "Photometric", summary: "Overall 0.739, gap -0.205, p=0.524 vs finetuned, NS" },
    { id: "T5", title: "Synthetic 2x", summary: "Overall 0.774 [0.74-0.80], dark 0.738, light 0.804, gap -0.0656" },
    { id: "T6", title: "Ablation 0-10x", summary: "Peak at 2x, plateau 3-4x, degrade >6x (FID drift)" },
    { id: "T7", title: "Bootstrap CIs", summary: "1000x BCa, dark melanoma CI width +/-0.11 due to n=10" },
    { id: "T8", title: "Leakage audit", summary: "0 exact dupes, 12 near-dupes removed (pHash), manifest 16k hashes" },
    { id: "T9", title: "FID stratified", summary: "FID dark 12.3, light 11.8, dermatologist accuracy 58% (near chance)" },
  ],
  limitations: [
    "n=10 dark melanoma limits power, CIs wide.",
    "Fitzpatrick labels noisy, observer variance +/-1.",
    "DDI biopsy-confirmed but small (656).",
    "Synthetic generator trained on same distribution -- not OOD.",
    "Single architecture (ResNet-50), not ViT.",
    "No clinical evaluation, only AUC.",
    "Photometric control limited to Albumentations.",
    "FID does not capture dermatologic realism.",
    "No fairness intersection (age x skin-tone).",
    "Synthetic may amplify spurious textures.",
    "Threshold Youden J may not reflect clinical utility.",
    "$0 budget, no external validation set.",
  ],
} as const;

export const PROTOCOL = {
  heading: "The checklist that prevents the quiet scandal.",
  subheading:
    "Most dermatology papers leak test images into train via near-duplicates. We make leakage impossible to ignore.",
  items: [
    {
      id: "leakage",
      title: "Leakage check (SHA256)",
      status: "enforced",
      description:
        "Every image decoded -> SHA256 of raw pixels. Cross-split exact duplicates removed before any training. pHash <=4 near-dupes flagged and removed. Manifest published in /hashes/manifest_sha256.csv with 16,123 entries.",
      code: "python scripts/check_leakage.py --data_root ./data --out ./hashes/manifest_sha256.csv",
    },
    {
      id: "split",
      title: "Stratified split (60/20/20, seed 42)",
      status: "published",
      description:
        "Stratified by diagnosis x Fitzpatrick group (I-II / III-IV / V-VI) x source (ISIC/Fitz/DDI). Fixed seed 42, deterministic. Splits published as CSV, not random on fly.",
      code: "python fairderm.py split --seed 42 --stratify dx,fitz,source --out splits/",
    },
    {
      id: "hyper",
      title: "Same hyperparams",
      status: "fixed",
      description:
        "All regimes share LR 1e-4, batch 32, AdamW wd 0.01, 20 epochs, early stop on val AUC. No hyperparam search per method -- only data changes.",
      code: "python fairderm.py train --method baseline --seed 42 --lr 1e-4 --batch 32",
    },
    {
      id: "youden",
      title: "Youden J threshold",
      status: "frozen",
      description:
        "Threshold selected via Youden J (TPR+TNR-1 max) on val, frozen, applied to test. Avoids test-set threshold peeking. Report per-group AUC + TPR@FPR 10%.",
      code: "threshold = youden_j(val_probs, val_labels) # frozen",
    },
    {
      id: "bootstrap",
      title: "Bootstrap 1000x (95% CI)",
      status: "reported",
      description:
        "Per-group AUC with bias-corrected accelerated bootstrap (BCa) 1000x. Photometric vs synthetic via paired permutation 1000x. We report p=0.524 NS, not cherry-picked means.",
      code: "python fairderm.py eval --bootstrap 1000 --ci bca --compare photometric vs synthetic",
    },
    {
      id: "ablation",
      title: "Ablation 0-10x synthetic",
      status: "swept",
      description:
        "Synthetic multiplier sweep 0x to 10x dark data. Peak at 2x, plateau 3-4x, degrade >6x due to FID drift. Train-only synthetic, never val/test.",
      code: "for k in 0 1 2 3 4 6 8 10; do python fairderm.py train --synthetic $k --train_only; done",
    },
  ],
  reproducibility: [
    { key: "One command", value: 'python fairderm.py --seed 42 --full' },
    { key: "Deterministic", value: "torch + numpy + python seeded, cudnn deterministic" },
    { key: "Splits CSV", value: "splits/seed42/{train,val,test}.csv published" },
    { key: "Hashes", value: "hashes/manifest_sha256.csv + pHash manifest" },
    { key: "Metrics", value: "metrics_seed42.json with CIs" },
    { key: "Env", value: "python 3.10, torch 2.2, 1xA100 20 epochs ~1.2h" },
  ],
  whyItMatters:
    "ISIC 2020 has ~2.1% near-duplicates across official splits (pHash). Without SHA256 check, you get +3-5% inflated AUC and think you solved fairness. We didn't. We fixed the evaluation first.",
} as const;

export const COMMUNITY = {
  heading: "Built in public.",
  description:
    "No grants, no lab, no IRB overhead. Open datasets, open code, and a refusal to hide the gap.",
  manifesto: [
    { title: "Publish the gap.", description: "Every dermatology model has a skin-tone gap. Reporting only overall AUC is scientific malpractice." },
    { title: "Leakage is not a footnote.", description: "If your test set contains near-duplicates of train, your paper is invalid. Hash it or retract it." },
    { title: "Photometric is not fairness.", description: "Brightness/contrast jitter does not fix melanin bias. You need controlled synthesis or real data." },
  ],
  contributeSteps: [
    "Fork fairderm-audit, run --seed 42, check hashes match",
    "Add new dataset (e.g., PAD-UFES-20) with Fitz labels",
    "Audit new architecture (ViT, ConvNeXt) with same protocol",
    "Propose synthetic method, keep train-only, report gap",
  ],
} as const;

export const ABOUT = {
  heading: "One researcher, one laptop, one gap to close.",
  profile: {
    name: "Shanmuka Gottimukkala",
    subtitle: "17 · Independent Researcher · Milton High School",
    bio: [
      "I started programming in 3rd grade after changing my school website with inspect element. What began as curiosity about editable systems became a focus on how computational systems fail real people.",
      "I built FairMed AI after watching a dermatology AI demo degrade on dark skin. The question wasn't just about bias — it was about evaluation. Most papers leak near-duplicates across splits and report only overall AUC. We don't.",
      "I'm a published first-author in NSRI Journal (Distinguished Article) and USACO Gold competitor. I publish open-source — OneLanggg NPM (360+ downloads) — and open-knowledge — founding author of 3 AI articles on Telugu Wikipedia for 100M+ speakers, 7+ years Python/JS, full-stack MERN, TensorFlow.",
      "FairMed AI runs on one principle: if you can't hash it, split it, and report the gap, it doesn't count. Code MIT, paper CC-BY-4.0, every image SHA256-hashed, seed 42.",
    ],
  },
  mission:
    "Make medical AI bias auditable by anyone. Not just publishable by elite labs. Every paper must ship with hashes, splits, and per-skin-tone metrics, or it doesn't count.",
  values: [
    { title: "Open", description: "Code MIT, Paper CC-BY-4.0, Data open" },
    { title: "Verifiable", description: "SHA256, seed 42, bootstrap CIs" },
    { title: "Honest", description: "Report gap, not hide it" },
  ],
  timeline: [
    { date: "July 25 2026", event: "WP1 live", detail: "DOI minted, Zenodo record live, GitHub public, 0 leakage" },
    { date: "July 18 2026", event: "Leakage fix", detail: "Found 12 near-dupes via pHash, removed, re-ran seed 42, metrics stable" },
    { date: "July 10 2026", event: "Synthetic 2x", detail: "Diffusion conditioned on Fitz+dx, train-only, gap closes -21.87% to -6.56%" },
    { date: "June 28 2026", event: "Photometric fails", detail: "p=0.524 NS, brightness/contrast does not fix melanin bias" },
    { date: "June 15 2026", event: "Gap found", detail: "Finetuned 0.733 but gap widens -7.19% to -21.87%, core finding" },
    { date: "May 2026", event: "Lab start", detail: "M1 Air, ISIC + Fitz + DDI, question: can we audit openly?" },
  ],
  license:
    "Code: MIT · Paper: CC-BY-4.0 · Data: per-source (ISIC CC-BY-NC, Fitz CC-BY, DDI CC-BY)",
  contact: {
    github: "@FairMedAI",
    zenodo: "fairmedai community",
    issues: "open GitHub issue for audit collaboration",
  },
} as const;

export const TOOLS = {
  heading: "Tools",
  subtitle:
    "Open, leakage-aware audits for medical imaging. 100% local, no data leaves your browser.",
  items: [
    {
      id: "scanner",
      title: "Leakage Scanner",
      status: "live" as const,
      description:
        "SHA256-based duplicate + leakage detection for train/test splits. Seed 42 protocol.",
      tags: ["Dermatology", "Radiology", "Ophthalmology", "Pathology"],
      href: "/tools/scanner",
    },
    {
      id: "split-maker",
      title: "Split Maker",
      status: "live" as const,
      description:
        "Deterministic train/val/test split with SHA256 dedup. Mulberry32 PRNG, seed 42.",
      tags: ["Dermatology", "Radiology", "Ophthalmology", "Pathology"],
      href: "/tools/split-maker",
    },
    {
      id: "representation",
      title: "Representation Checker",
      status: "live" as const,
      description:
        "Upload metadata CSV to check subgroup representation and imbalance.",
      tags: ["Dermatology", "Radiology", "Ophthalmology", "Pathology"],
      href: "/tools/representation",
    },
    {
      id: "gap-calc",
      title: "Fairness Gap Calculator",
      status: "live" as const,
      description:
        "Calculate per-subgroup accuracy and fairness gaps from predictions CSV. Export LaTeX + JSON.",
      tags: ["Dermatology", "Radiology", "Ophthalmology", "Pathology"],
      href: "/tools/gap-calculator",
    },
  ],
} as const;

export const AUDITS = {
  heading: "Audits",
  subtitle:
    "Leakage-aware, stratified evaluation of medical imaging datasets. Every audit is hash-verified, seed-42 reproducible, and open-source.",
  items: [
    {
      id: "ddi",
      title: "DDI Audit",
      status: "live" as const,
      description:
        "Diverse Dermatology Images (Daneshjou et al. 2022, Stanford). 656 biopsy-confirmed images, 0 leakage verified via SHA256, 60/20/20 stratified split. Core finding: finetuning widens skin-tone gap from 0.05 to 0.33.",
      tags: ["Dermatology", "656 images", "Zero leakage", "Seed 42"],
      href: "/audit/ddi",
    },
  ],
} as const;

export const ARCHIVE = {
  heading: "Archive",
  subtitle:
    "Functional test datasets for every tool. Download, drop into the tool, verify it works.",
  note: "Data sourced from DDI (Diverse Dermatology Images) under permissive license. No patient data.",
  datasets: [
    {
      id: "dermatology-sample",
      title: "Dermatology Sample",
      description:
        "Small set of real DDI skin lesion images split into train/test folders with metadata CSV. Stratified by skin tone, zero leakage verified via SHA256.",
      useWith: ["Scanner", "Split Maker"],
      downloadHref: "/archive/dermatology-sample.zip",
      files: [
        { name: "train/", type: "folder", count: "5 images" },
        { name: "test/", type: "folder", count: "5 images" },
        { name: "metadata.csv", type: "csv", count: "10 rows" },
      ],
    },
    {
      id: "predictions-sample",
      title: "Predictions Sample",
      description:
        "200-row predictions CSV with intentionally uneven accuracy across skin tones to demonstrate the fairness gap (light 85%, dark 50%).",
      useWith: ["Gap Calculator"],
      downloadHref: "/archive/predictions-sample.csv",
      files: [
        { name: "predictions.csv", type: "csv", count: "200 rows" },
      ],
    },
    {
      id: "representation-sample",
      title: "Representation Sample",
      description:
        "200-row metadata CSV with intentionally imbalanced skin-tone subgroups (60% dark, 25% medium, 15% light) to demonstrate the representation checker.",
      useWith: ["Representation Checker"],
      downloadHref: "/archive/representation-sample.csv",
      files: [
        { name: "representation.csv", type: "csv", count: "200 rows" },
      ],
    },
  ],
} as const;
