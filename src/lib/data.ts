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
  { id: "team", label: "Team", href: "/team" },
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
  split: "60/20/20 stratified label x skin_tone",
  n_total: 656,
  n_test: 132,
  leakage_check: "SHA256 cross-split dupes=0",
  synthetic: {
    n: 290,
    source: "29 train-split dark melanomas",
    check: "SHA256 zero overlap with 132 test images",
  },
  results: [
    { method: "baseline_imagenet", auc_dark: 0.5875, auc_light: 0.7188, gap: -0.1313 },
    { method: "finetuned_derm", auc_dark: 0.5469, auc_light: 0.7563, gap: -0.2094 },
    { method: "finetuned+synthetic_dark_mel", auc_dark: 0.4813, auc_light: 0.7719, gap: -0.2906, delta_auc_dark: -0.0663 },
  ],
  paired_dark_delta: { delta: -0.0663, ci_95: [-0.1508, 0.0080], p: 0.9620 },
  bootstrap: { n: 1000, ci: "95% BCa" },
  test_groups: "42 Light / 48 Medium / 42 Dark, 10 melanomas per reported subgroup",
  caveat:
    "Baseline checkpoint is partial (best validation epoch 5); a full 15-epoch run is pending. Bootstrap CIs are wide - results are directional, not definitive.",
} as const;

export const HOME = {
  subtitle: "Leakage-aware, stratified evaluation of medical imaging AI. Starting with dermatology.",
  intro: "Medical imaging AI models degrade across subgroups. Most evaluations hide this by conflating algorithmic bias with dataset leakage. We audit openly: every image SHA256-hashed, every split published [60/20/20 seed 42], every metric reported with subgroup breakdowns. Starting with dermatology [skin-tone], expanding to radiology, ophthalmology, pathology.",
  finding:
    "On the DDI test set (n=132; 42 Light / 48 Medium / 42 Dark, 10 melanomas per reported subgroup), the baseline ResNet-50 achieves Light AUROC 0.7188 vs. Dark AUROC 0.5875 (gap -0.1313). Fine-tuning changes these to 0.7563 vs. 0.5469 (gap -0.2094). Adding synthetic dark melanomas changes them to 0.7719 vs. 0.4813 (gap -0.2906); the paired Dark AUROC delta is -0.0663 (95% CI [-0.1508, 0.0080], p = 0.9620). Simple photometric augmentation cannot meaningfully close the skin-tone gap. The next step is richer generative models, such as GANs or diffusion models.",
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
      "We audit three training regimes on DDI (Diverse Dermatology Images, n=656; test n=132, 42 Light / 48 Medium / 42 Dark, 10 melanomas per reported subgroup). Baseline Light AUROC 0.7188 vs. Dark 0.5875 (gap -0.1313). Fine-tuning changes these to 0.7563 vs. 0.5469 (gap -0.2094). Adding 290 synthetic dark-skin melanoma images generated from the 29 train-split dark melanomas (zero overlap verified via SHA256) changes them to 0.7719 vs. 0.4813 (gap -0.2906); the paired Dark AUROC delta is -0.0663 (95% CI [-0.1508, 0.0080], p = 0.9620).",
    results: [
      { method: "Baseline", light: "0.7188", dark: "0.5875", gap: "-0.1313", delta: "--" },
      { method: "Fine-tuned", light: "0.7563", dark: "0.5469", gap: "-0.2094", delta: "--" },
      { method: "+ Synthetic dark mel.", light: "0.7719", dark: "0.4813", gap: "-0.2906", delta: "-0.0663" },
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
  abstract: `FairDerm-Audit investigates skin-tone bias in melanoma detection and whether synthetic augmentation can close the gap. This update reflects our clean, leakage-free run. All 290 synthetic dark-skin melanoma images were generated exclusively from the 29 training-split dark melanomas; byte-level SHA256 verification confirms zero overlap with the 132 test images. Results (DDI test, n=132; 42 Light / 48 Medium / 42 Dark, 10 melanomas per reported subgroup): baseline Light AUROC 0.7188 vs. Dark AUROC 0.5875 (gap -0.1313). Fine-tuning changes these to 0.7563 vs. 0.5469 (gap -0.2094). Adding synthetic dark melanomas changes them to 0.7719 vs. 0.4813 (gap -0.2906); the paired Dark AUROC delta is -0.0663 (95% CI [-0.1508, 0.0080], p = 0.9620). Takeaway: simple photometric augmentation cannot meaningfully close the skin-tone gap; the next step is richer generative models, such as GANs or diffusion models. Caveat: the baseline checkpoint is partial (best validation epoch 5); a full 15-epoch run is pending. Bootstrap CIs are wide -- results are directional, not definitive.`,
  methods: [
    { aspect: "Data", detail: "DDI (Diverse Dermatology Images, Daneshjou et al. 2022, Stanford). 656 biopsy-confirmed images, enriched for dark skin. Test n=132: 42 Light / 48 Medium / 42 Dark, 10 melanomas per reported subgroup." },
    { aspect: "Model", detail: "ResNet-50 ImageNet baseline, then full fine-tune with the same hyperparameters across regimes." },
    { aspect: "Leakage check", detail: "SHA256 of decoded pixels, cross-split exact duplicate removal, manifest published. 290 synthetic images verified: zero overlap with the 132 test images." },
    { aspect: "Split", detail: "Stratified 60/20/20 (393/131/132) by label x skin_tone, seed 42, CSV published." },
    { aspect: "Threshold", detail: "Youden J on val, applied to test, per-group AUROC reported." },
    { aspect: "Synthetic", detail: "290 dark-skin melanoma images generated exclusively from the 29 training-split dark melanomas, train-only, no test leakage." },
  ],
  tables: [
    { id: "T1", title: "Dataset composition", summary: "DDI 656 biopsy-confirmed images, intentionally enriched for dark skin. Test n=132: 42 Light / 48 Medium / 42 Dark." },
    { id: "T2", title: "Baseline AUROC", summary: "Light 0.7188, dark 0.5875, gap -0.1313" },
    { id: "T3", title: "Fine-tuned AUROC", summary: "Light 0.7563, dark 0.5469, gap -0.2094" },
    { id: "T4", title: "+ Synthetic dark mel.", summary: "Light 0.7719, dark 0.4813, gap -0.2906, paired dark delta -0.0663" },
    { id: "T5", title: "Paired dark delta", summary: "-0.0663, 95% CI [-0.1508, 0.0080], p=0.9620, NS" },
    { id: "T6", title: "Split", summary: "60/20/20 seed 42 -> 393/131/132; test 42 Light / 48 Medium / 42 Dark" },
    { id: "T7", title: "Synthetic pipeline", summary: "290 images generated exclusively from 29 train-split dark melanomas" },
    { id: "T8", title: "Leakage audit", summary: "0 exact cross-split dupes; synthetic zero overlap with test (SHA256)" },
    { id: "T9", title: "Bootstrap", summary: "1000x BCa; CIs wide - results directional, not definitive" },
    { id: "T10", title: "Caveat", summary: "Baseline checkpoint partial (best val epoch 5); full 15-epoch run pending" },
  ],
  limitations: [
    "Baseline checkpoint is partial (best validation epoch 5); a full 15-epoch run is pending.",
    "Bootstrap CIs are wide -- results are directional, not definitive.",
    "Small subgroup sizes (10 melanomas per reported subgroup) limit statistical power.",
    "Photometric augmentation evaluated only; richer generative models (GAN/diffusion) not yet run.",
    "Fitzpatrick labels noisy, observer variance +/-1.",
    "Single architecture (ResNet-50), not ViT.",
    "No clinical evaluation, only AUROC.",
    "Synthetic generator trained on the same distribution -- not OOD.",
    "No fairness intersection (age x skin-tone).",
    "No external validation set.",
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
        "Every image decoded -> SHA256 of raw pixels. Cross-split exact duplicates removed before any training. Manifest published with all 656 entries.",
      code: "python scripts/check_leakage.py --data_root ./data --out ./hashes/manifest_sha256.csv",
    },
    {
      id: "split",
      title: "Stratified split (60/20/20, seed 42)",
      status: "published",
      description:
        "Stratified by label x skin_tone on DDI, 60/20/20 -> 393/131/132. Fixed seed 42, deterministic. Splits published as CSV, not random on the fly.",
      code: "python fairderm.py split --seed 42 --stratify label,skin_tone --out splits/",
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
        "Per-group AUROC with bias-corrected accelerated bootstrap (BCa) 1000x. Paired Dark AUROC delta (synthetic vs fine-tuned) via paired permutation: -0.0663, 95% CI [-0.1508, 0.0080], p=0.9620 NS. We report CIs and p-values, not cherry-picked means.",
      code: "python fairderm.py eval --bootstrap 1000 --ci bca --compare synthetic vs finetuned",
    },
    {
      id: "ablation",
      title: "Synthetic dark melanoma (train-only)",
      status: "swept",
      description:
        "290 dark-skin melanoma images generated exclusively from the 29 training-split dark melanomas. Train-only, never val/test. Byte-level SHA256 verification confirms zero overlap with the 132 test images.",
      code: "python fairderm.py synth --source train_dark_mel 29 --n 290 --train_only",
    },
  ],
  reproducibility: [
    { key: "One command", value: 'python fairderm.py --seed 42 --full' },
    { key: "Deterministic", value: "torch + numpy + python seeded, cudnn deterministic" },
    { key: "Splits CSV", value: "splits/seed42/{train,val,test}.csv published" },
    { key: "Hashes", value: "hashes/manifest_sha256.csv + pHash manifest" },
    { key: "Metrics", value: "metrics_seed42.json with CIs" },
    { key: "Env", value: "python 3.10, torch 2.2, GPU; deterministic seed-42 only" },
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

export const TEAM = {
  heading: "Team",
  founder: {
    name: "Shanmuka Gottimukkala",
    role: "Founder & Lead Researcher",
    initials: "SG",
    photo: "/images/shanmuka.jpeg",
    bio: [
      "I'm Shanmuka Gottimukkala, a Junior at Milton High School and founder of FairMed AI, a student-led research platform advancing fairness and open science in medical imaging.",
      "I started coding in 3rd grade after I used inspect element to put my name on my school website and realized systems aren't fixed — they're editable. Since then I've built full-stack MERN apps, a restaurant order tracker with live status, a desktop-style OS interface with draggable windows, an emotion-aware IoT desk assistant with Raspberry Pi and environmental sensors, an ultrasonic laser measurement tool, and a CNN satellite pollution classifier that won 2nd Place in Fulton County Student Technology Competition 2026.",
      "My flagship work is FairMed AI: a research platform which works to advancing fairness and open science in medical imaging. I worked with Stanford's 656-image Diverse Dermatology Images dataset. I built a reproducible benchmark 393/131/132 with SHA-256 verification and zero leakage, and measured a -0.1313 baseline skin-tone gap in AUROC (light 0.7188 vs. dark 0.5875) that widens after training to -0.2094. Adding 290 synthetic dark-skin melanoma images generated from the 29 train-split dark melanomas did not close it (-0.2906, paired dark delta -0.0663, p=0.9620 NS). Simple photometric augmentation cannot close the gap, which is why I'm now building bias-aware generative methods.",
      "I also publish for builders: I created and published an open-source NPM package OneLanggg with 360+ downloads, published 3D models like Doc Ock arms with inverse kinematics with 3.7k+ views and 1000+ downloads on Sketchfab, produced Blender VFX short films, and released a music album across Spotify and YouTube with 400+ streams.",
      "I founded Telugu AI/CS content on Telugu Wikipedia, writing Neural Networks, Deep Learning, and CNN articles from scratch for 100M+ speakers, now linked to 70+ global editions.",
      "I founded Welcome Programming to teach beginners CS with zero experience required, and serve as Secretary of Milton Coders, a nationally recognized Hack Club chapter of 30+ where I led workshops driving 50% growth.",
      "Awards: USACO Gold — with perfect 1000/1000 and Rank 1 in Bronze out of 2,374 and Silver out of 1,916, 2nd Place GaSTC Programming Competition 11-12 band, 2nd Place Novice / 5th Overall Lockheed Martin Code Quest solving 26 problems, Honorable Mention Scholastic Art & Writing for Digital Art.",
    ],
    linkedin: "https://www.linkedin.com/in/shanmuka-gottimukkala/",
  },
  advisors: [
    {
      name: "Vaibhav C. Gandhi",
      role: "Volunteer Research Advisor — AI Fairness & Medical Imaging",
      initials: "VG",
      photo: "/images/VB.jpg",
      bio: [
        "Vaibhav C. Gandhi is Assistant Professor in the Department of Computer Engineering at Madhuben and Bhanubhai Patel Institute of Technology, CVM University, Anand, Gujarat, with 12 years of teaching experience, and Research Scholar at Gujarat Technological University, Ahmedabad.",
        "His core expertise is medical AI imaging — he is first author of MelanomaNet: Deep Learning for Skin Cancer Diagnosis Through Inception V3, directly aligned with FairMed AI's dermatology focus, and co-author of HyperComplEx: Adaptive Multi-Space Knowledge Graph Embeddings as 4th author for structured medical knowledge representation. His portfolio includes a survey on ML and DL in Health Domain, signal optimization with machine learning, and a 2024 patent filing as Assistant Professor Department of Computer Engineering MBIT CVM University for AI-driven Muscle Activity Recognition in EMG Signals.",
        "At FairMed AI, he advises on leakage-proof benchmark design, skin-tone stratified evaluation, and moving beyond naive color augmentation — a volunteer role, 1 hr/month, listed only with written approval.",
      ],
      linkedin: "https://www.linkedin.com/in/dr-vaibhav-c-gandhi-29b40b51/",
    },
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
    { date: "July 18 2026", event: "Leakage check", detail: "SHA256 manifest finalized, zero cross-split duplicates, metrics stable" },
    { date: "July 10 2026", event: "Synthetic dark mel.", detail: "290 dark-skin melanomas generated from 29 train-split dark melanomas, train-only, zero overlap with test" },
    { date: "June 28 2026", event: "Photometric fails", detail: "Simple augmentation does not close the skin-tone gap; next step is richer generative models (GANs/diffusion)" },
    { date: "June 15 2026", event: "Gap found", detail: "Baseline skin-tone gap -0.1313; fine-tuning widens it to -0.2094, core finding" },
    { date: "May 2026", event: "Lab start", detail: "M1 Air, DDI, question: can we audit openly?" },
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
        "Diverse Dermatology Images (Daneshjou et al. 2022, Stanford). 656 biopsy-confirmed images, 0 leakage verified via SHA256, 60/20/20 stratified split. Core finding: the skin-tone gap widens from -0.1313 (baseline) to -0.2094 (fine-tuned); 290 synthetic dark-skin melanomas (from 29 train-split dark melanomas) do not close it (-0.2906, paired dark delta -0.0663, p=0.9620 NS).",
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
