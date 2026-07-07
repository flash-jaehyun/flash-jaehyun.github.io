/* ============================================================
   SITE DATA — edit this file to update the site.
   No build step: the HTML pages render directly from these
   values via js/main.js.
   ============================================================ */

// ---- Profile ----------------------------------------------------
const PROFILE = {
  name: "Jaehyun Kim, Ph.D.",
  shortName: "Jaehyun Kim",
  initial: "JK",
  title: "Postdoctoral Researcher",
  institution: "Seoul National University",
  department: "School of Chemical & Biological Engineering",
  role: "Electrochemical Interfaces · Computation + Experiment",
  // Short intro paragraph shown under the name (plain, factual).
  subhead:
    "My research combines computational catalyst screening (machine-learned interatomic " +
    "potentials and DFT) with synthesis, operando spectroscopy, and membrane-electrode-assembly " +
    "testing. I work on catalysts and interfaces for water electrolysis, CO₂ reduction, and " +
    "ammonia oxidation.",
  // One credential line shown under the tagline (linked).
  flagship: {
    text: "First-author Nature Communications (2026): ML-designed W₁-NiFeOOH for noble-metal-free anion-exchange-membrane water electrolysis",
    url: "https://doi.org/10.1038/s41467-026-68735-3",
  },
  // Plain-text affiliations strip (no logos).
  affiliations: "Seoul National University · POSTECH · KRISS–SNU MPI · NRF Basic Research Lab",
  affiliation:
    "School of Chemical & Biological Engineering, Seoul National University",
  advisor: "Prof. Jungwon Park",
  email: "jaehyunkim@snu.ac.kr",
  scholar: "https://scholar.google.com/citations?user=1VA58skAAAAJ",
  github: "", // optional — leave "" to hide
  orcid: "", // optional — leave "" to hide
};

// ---- Headline metrics (3 numbers that land immediately) ---------
// value + short label + optional mono sub-line.
// Citation figures are a snapshot — update the date when you refresh them.
const METRICS = [
  { value: "1,574", label: "citations", sub: "Google Scholar, Jul 2026" },
  { value: "39", label: "publications", sub: "12 first / co-first author" },
  { value: "23", label: "h-index", sub: "i10-index 30" },
];

// ---- Closed-loop workflow (his signature method) ----------------
// Each stage has a `detail` shown when you hover / tap it, and a `phase`
// (comp = computation, exp = experiment) that color-codes the loop graphic.
const LOOP = [
  { label: "ML screening", phase: "comp", detail: "Screen candidate catalysts with an EquiformerV2 potential fine-tuned on DFT data." },
  { label: "DFT · MLIP · MD", phase: "comp", detail: "Validate energetics with DFT and model interfaces and ion transport with machine-learned potentials and explicit-solvent MD." },
  { label: "Synthesis", phase: "exp", detail: "Synthesize the selected catalysts by cyclic electrodeposition." },
  { label: "Operando", phase: "exp", detail: "Characterize the working catalyst with operando Raman, synchrotron XAS, and identical-location TEM." },
  { label: "MEA device", phase: "exp", detail: "Test the catalysts in zero-gap membrane-electrode-assembly electrolyzers." },
];
const LOOP_NOTE = "Hover or tap a stage for detail.";
const LOOP_CENTER = ["Prediction", "to device"]; // center label of the graphic (2 lines)

// ---- About / vision ---------------------------------------------
const ABOUT =
  "I am a postdoctoral researcher at Seoul National University (Prof. Jungwon Park), " +
  "specializing in high-flux electrochemical interfaces that connect atomistic " +
  "computational catalyst design to industrial-relevant molecular-conversion devices. " +
  "Rather than optimizing catalysts alone, I run a closed-loop workflow — AI-guided " +
  "screening, atomistic modeling, scalable synthesis, operando X-ray and Raman analysis, " +
  "and membrane-electrode-assembly validation — end to end.";

// ---- Biography (career narrative, shown on the CV page) ----------
// First-person narrative arc; may contain simple <strong>/<em>.
const BIO =
  "I am a postdoctoral researcher at Seoul National University, working with Prof. Jungwon Park. " +
  "I completed my Ph.D. at SNU under Prof. Ho Won Jang, on single-atom catalysts for " +
  "electrochemical energy conversion, and my B.S. (<em>cum laude</em>) at POSTECH. My work " +
  "combines machine-learning and DFT catalyst screening with synthesis, operando spectroscopy, " +
  "and membrane-electrode-assembly testing. This work produced the noble-metal-free " +
  "<strong>W₁-NiFeOOH</strong> catalyst, published as a first-author paper in " +
  "<em>Nature Communications</em> (2026). I have 39 publications (12 first or co-first author) " +
  "and 1,574 citations.";

// Short third-person bio (for conference intros) — copyable on the CV page.
const BIO_SHORT =
  "Jaehyun Kim is a postdoctoral researcher at Seoul National University working on " +
  "electrochemical interface engineering. He connects machine-learning catalyst design and " +
  "DFT/MLIP simulation to synthesis, operando spectroscopy, and membrane-electrode-assembly " +
  "devices. His first-author work in Nature Communications (2026) introduced the " +
  "noble-metal-free W1-NiFeOOH catalyst for anion-exchange-membrane water electrolysis. " +
  "He holds a Ph.D. from Seoul National University.";

// ---- Contact --------------------------------------------------
const WORKWITHME = {
  headline: "Contact",
  pitch:
    "I am open to research collaborations and new positions, especially work that connects " +
    "catalyst design, spectroscopy, and device engineering.",
  brings: [],
  cta: "Reach me by email:",
};

// ---- Research directions (the four pillars) ---------------------
const PROJECTS = [
  {
    n: "01",
    title: "ML-guided catalyst design",
    desc: "Fine-tune EquiformerV2 on DFT data to screen single-atom catalyst configurations before synthesis.",
    tags: ["EquiformerV2", "DFT", "single-atom catalysts"],
  },
  {
    n: "02",
    title: "Synthesis and operando mechanism",
    desc: "Electrodeposition combined with operando Raman, synchrotron XAS, and identical-location TEM to resolve reaction mechanisms.",
    tags: ["operando Raman", "synchrotron XAS", "IL-TEM"],
  },
  {
    n: "03",
    title: "High-flux electrochemical interfaces",
    desc: "Noble-metal-free catalyst, ionomer, and membrane interfaces that remain selective and durable at practical current density.",
    tags: ["AEM electrolysis", "CO₂ reduction", "zero-gap MEA"],
  },
  {
    n: "04",
    title: "Multiscale interface modeling",
    desc: "DFT, machine-learned potentials, and explicit-solvent MD for ion transport in anion-exchange membranes and ionomers.",
    tags: ["MLIP", "MD", "ion transport"],
  },
];

// ---- Publications -----------------------------------------------
// Full record. `first: true` marks first / co-first author (#).
// `selected: true` surfaces the entry on the homepage.
// Your name is bolded automatically (HIGHLIGHT_AUTHOR below).
const PUBLICATIONS = [
  {
    year: 2026, first: true, selected: true,
    title: "Machine-learning-guided tungsten single atoms promote oxyhydroxides for noble-metal-free water electrolysis",
    authors: "J. Kim, I. S. Kwon, J. Lim, S. A. Lee, W. S. Cheon, J. H. Cho, S. H. Park, Y. J. Kim, M. G. Lee, K. C. Kwon, S. H. Park, S. Y. Kim, H. W. Jang",
    venue: "Nature Communications", venueDetail: "17, 2344",
    links: { doi: "https://doi.org/10.1038/s41467-026-68735-3" },
    image: "assets/pubs/natcomm2026_fig1.jpg",
    imageCaption: "Fig. 1 — ML-guided catalyst screening: EquiformerV2 + DFT, OER activity volcano, and raw-material cost analysis.",
  },
  {
    year: 2026, first: false, selected: false,
    title: "Programmable ferroelectric rectifier for reliable and efficient neuromorphic crossbar array",
    authors: "Y. Kim, Y. J. Lee, J. Yang, B. Kim, S. J. Kim, J. Kim, I. Im, et al., H. W. Jang",
    venue: "Nature Communications", venueDetail: "accepted",
    links: {},
  },
  {
    year: 2026, first: false, selected: false,
    title: "Bias-free solar-to-hydrogen peroxide production using nanoporous BiVO₄-based photoanode with atomic layer deposited SnO₂",
    authors: "J. Wang, J. Kim, J. W. Yang, S. J. Park, T. Kim, et al., J. Y. Kim, H. W. Jang",
    venue: "Advanced Energy Materials", venueDetail: "16, e05447",
    links: {},
  },
  {
    year: 2025, first: true, selected: false,
    title: "Thermally induced surface-Cu-enriched NiCuOₓ electrocatalysts for stable ammonia oxidation to nitrite toward hydrogen production",
    authors: "S. A. Lee, J. Lee, J. Kim, W. S. Cheon, T. H. Lee, S. Choi, S. H. Ahn, S. Y. Kim, J. Park, H. W. Jang",
    venue: "Chemical Engineering Journal", venueDetail: "521, 166493",
    links: {},
  },
  {
    year: 2025, first: false, selected: false,
    title: "Electrodeposited Pt on NiFe layered double hydroxide/Ni foam electrode for an extremely active and durable electrocatalyst for ammonia oxidation reaction",
    authors: "J. Lee, S. A. Lee, J. Kim, T. H. Lee, W. S. Cheon, S. Choi, S. H. Park, H. W. Jang",
    venue: "Applied Catalysis B: Environment and Energy", venueDetail: "371, 125251",
    links: {},
  },
  {
    year: 2025, first: true, selected: true,
    title: "Spontaneous metal-chelation strategy for highly dense Ni single-atom catalysts with asymmetric coordination in CO₂ electroreduction",
    authors: "J. H. Kim, J. Kim, J. Ma, J. H. Cho, J. Jeong, S. Iimura, H. W. Jang, S. Y. Kim",
    venue: "Small", venueDetail: "2409481",
    links: {},
  },
  {
    year: 2025, first: true, selected: false,
    title: "Challenges and strategies in catalysts design towards efficient and durable alkaline seawater electrolysis for green hydrogen production",
    authors: "J. Kim, J. H. Seo, J. K. Lee, M. H. Oh, H. W. Jang",
    venue: "Energy Materials", venueDetail: "5, 5000076",
    links: {},
  },
  {
    year: 2025, first: false, selected: false,
    title: "Solar production of fuels from CO₂ with high efficiency and stability via in situ transformation of Bi electrocatalysts",
    authors: "W. S. Cheon, S. G. Ji, J. Kim, S. Choi, J. W. Yang, et al., J. Y. Kim, H. W. Jang",
    venue: "EES Catalysis", venueDetail: "3, 140–151",
    links: {},
  },
  {
    year: 2025, first: false, selected: false,
    title: "Novel production process for lithium sulfide from lithium hydroxide by reacting with hydrogen sulfide gas generated from iron sulfide",
    authors: "S.-H. Park, B. Choi, J. Kim, H. W. Jang, J. Kang",
    venue: "Sustainable Materials and Technologies", venueDetail: "43, e01269",
    links: {},
  },
  {
    year: 2025, first: false, selected: false,
    title: "Tuning hydrogen binding on Ru sites by Ni alloying on MoO₂ enables efficient alkaline hydrogen evolution for anion exchange membrane water electrolysis",
    authors: "G. Lee, S. E. Jun, J. Lim, J. Kim, H. Lee, et al., H. W. Jang, S. H. Park, K. C. Kwon",
    venue: "Advanced Science", venueDetail: "12, 2414622",
    links: {},
  },
  {
    year: 2025, first: false, selected: false,
    title: "In-situ growth of 2D MOFs as a molecular sieving layer on SnS₂ nanoflakes for realizing ultraselective H₂S detection",
    authors: "S. M. Lee, Y. J. Kim, S. J. Park, W. S. Cheon, J. Kim, G. B. Nam, Y. Kim, H. W. Jang",
    venue: "Advanced Functional Materials", venueDetail: "35, 2417019",
    links: {},
  },
  {
    year: 2025, first: true, selected: false,
    title: "Probing activation and deactivation mechanisms in electrochemical CO₂ reduction reaction and water splitting through in-situ/operando analysis",
    authors: "W. S. Cheon, J. Kim, H. W. Jang",
    venue: "Chemistry–Methods", venueDetail: "5, e202400066",
    links: {},
  },
  {
    year: 2025, first: true, selected: false,
    title: "Augmenting overall water splitting with transition-metal-doped NiCr-LDH as a bifunctional electrocatalyst",
    authors: "M. A. Tekalgne, J. H. Cho, J. Kim, H. W. Jang, S. H. Ahn, S. Y. Kim",
    venue: "Chemical Engineering Journal", venueDetail: "514, 163398",
    links: {},
  },
  {
    year: 2024, first: false, selected: false,
    title: "High-efficiency unbiased water splitting with photoanodes harnessing polycarbazole hole transport layers",
    authors: "J. W. Yang, S. G. Ji, C.-S. Jeong, J. Kim, H. R. Kwon, et al., J. Moon, J. Y. Kim, H. W. Jang",
    venue: "Energy & Environmental Science", venueDetail: "17, 2541–2553",
    links: {},
  },
  {
    year: 2024, first: false, selected: false,
    title: "A MOF-derived pyrrolic N-stabilized Ni single atom catalyst for selective electrochemical reduction of CO₂ to CO at high current density",
    authors: "J. W. Lim, D. H. Choo, J. H. Cho, J. Kim, W. S. Cho, et al., H. W. Jang, S. Y. Kim, J.-L. Lee",
    venue: "Journal of Materials Chemistry A", venueDetail: "12, 11090–11100",
    links: {},
  },
  {
    year: 2024, first: false, selected: false,
    title: "Halide perovskites-based diffusive memristors for artificial mechano-nociceptive system",
    authors: "I. H. Im, J. H. Baek, S. J. Kim, J. Kim, S. H. Park, J. Y. Kim, J. J. Yang, H. W. Jang",
    venue: "Advanced Materials", venueDetail: "36, 2307334",
    links: {},
  },
  {
    year: 2024, first: false, selected: false,
    title: "Highly selective ammonia detection in NiO-functionalized graphene micropatterns for beef quality monitoring",
    authors: "S. S. Kim, Y. Kim, J. Kim, S. J. Kim, T. Kim, et al., M.-H. Oh, Y. S. Huh, H. W. Jang",
    venue: "Advanced Functional Materials", venueDetail: "34, 2407885",
    links: {},
  },
  {
    year: 2024, first: false, selected: false,
    title: "Conjugated polythiophene frameworks as a hole-selective layer on Ta₃N₅ photoanode for high-performance solar water oxidation",
    authors: "J. W. Yang, H. R. Kwon, S. G. Ji, J. Kim, S. A. Lee, et al., J. Y. Kim, H. W. Jang",
    venue: "Advanced Functional Materials", venueDetail: "34, 2400806",
    links: {},
  },
  {
    year: 2024, first: false, selected: false,
    title: "Exsolved Ru-mediated stabilization of MoO₂-Ni₄Mo electrocatalysts for anion exchange membrane water electrolysis and unbiased solar-driven saline water splitting",
    authors: "S. E. Jun, S.-W. Myeong, B.-G. Cho, J. Kim, S. J. Park, et al., H. W. Jang, S. H. Park",
    venue: "Applied Catalysis B: Environmental and Energy", venueDetail: "358, 124364",
    links: {},
  },
  {
    year: 2024, first: false, selected: false,
    title: "Crystallographically vacancy-induced MOF nanosheet as rational single-atom support for accelerating CO₂ electroreduction to CO",
    authors: "J. H. Cho, J. Ma, C. Lee, J. W. Lim, Y. Kim, H. Y. Jang, J. Kim, et al., S. Back, J.-L. Lee, S. Y. Kim",
    venue: "Carbon Energy", venueDetail: "6, e510",
    links: {},
  },
  {
    year: 2024, first: false, selected: false,
    title: "Real-time detection of sub-ppm aromatic compounds in alcohol by surface plasmon resonance using label-free graphene",
    authors: "S. H. Cho, J. M. Suh, W. Kim, J. Kim, Y. J. Kim, et al., B. H. Hong, S. Y. Kim, H. W. Jang",
    venue: "Energy & Environmental Materials", venueDetail: "e12801",
    links: {},
  },
  {
    year: 2024, first: false, selected: false,
    title: "Rapid and ultrahighly sensitive ethanol sensing in p-type SrTi₁₋ₓFeₓO₃",
    authors: "S. H. Cho, M.-J. Choi, B. Koo, J. Kim, T. H. Lee, et al., W. Jung, H. W. Jang",
    venue: "Sensors and Actuators B: Chemical", venueDetail: "403, 135137",
    links: {},
  },
  {
    year: 2024, first: false, selected: false,
    title: "Memristive artificial synapses based on brownmillerite for endurable weight modulation",
    authors: "Y. J. Lee, E. S. Choi, J. H. Baek, J. Yang, J. Kim, et al., S. Lee, H. W. Jang",
    venue: "Small", venueDetail: "2405749",
    links: {},
  },
  // ---------------------------------------------------------------
  // REMOVED — mis-attributed. The authoritative record for
  // "Stabilization of tetragonal phase in hafnium zirconium oxide"
  // (ACS Appl. Mater. Interfaces 16, 60811–60818, 2024; DOI
  // 10.1021/acsami.4c12407 / PubMed 39445472) lists NO "Jaehyun Kim"
  // — only "Jae Hyun Kim" (J. H. Kim), a different person. The author
  // list in the source CV was a copy-paste of the Carbon Energy MOF/CO₂
  // paper. Restore ONLY if you confirm you are actually an author:
  // {
  //   year: 2024, first: false, selected: false,
  //   title: "Stabilization of tetragonal phase in hafnium zirconium oxide by cation doping for high-K dielectric insulators",
  //   authors: "J. Y. Kim, S. H. Park, Y. J. Kim, J. H. Kim, ..., H.-S. Jung, H. W. Jang",
  //   venue: "ACS Applied Materials & Interfaces", venueDetail: "16, 60811–60818",
  //   links: {},
  // },
  // ---------------------------------------------------------------
  {
    year: 2024, first: false, selected: false,
    title: "Highly durable chemoresistive micropatterned PdAu hydrogen sensors: performance and mechanism",
    authors: "Y. J. Kim, S. Lee, S. Choi, T. H. Eom, S. H. Cho, et al., J. Kim, H. W. Jang",
    venue: "ACS Sensors", venueDetail: "9, 5363–5373",
    links: {},
  },
  {
    year: 2024, first: false, selected: false,
    title: "Enhanced oxygen evolution reaction of 2-dimensional metal-organic frameworks with tunable nitrogen functionalities by ion beam sputtering",
    authors: "W. S. Cheon, J. Bu, S. Jung, J.-Y. Yang, S. Choi, J. Kim, et al., M. Senna, H. W. Jang",
    venue: "Chemical Engineering Journal", venueDetail: "489, 151004",
    links: {},
  },
  {
    year: 2023, first: false, selected: true,
    title: "Atomically dispersed iridium catalysts on silicon photoanode for efficient photoelectrochemical water splitting",
    authors: "S. E. Jun, Y. H. Kim, J. Kim, W. S. Cheon, S. Choi, et al., J. Moon, S-H. Kim, H. W. Jang",
    venue: "Nature Communications", venueDetail: "14, 609",
    links: {}, // TODO: add "doi" once confirmed
  },
  {
    year: 2023, first: true, selected: false,
    title: "Non-noble metal single atom catalysts for electrochemical energy conversion reactions",
    authors: "S. E. Jun, S. Choi, J. Kim, K. C. Kwon, S. H. Park, H. W. Jang",
    venue: "Chinese Journal of Catalysis", venueDetail: "50, 195–214",
    links: {},
  },
  {
    year: 2023, first: true, selected: false,
    title: "Can artificial intelligence boost developing electrocatalysts for efficient water splitting to produce green hydrogen?",
    authors: "J. Kim, H. W. Jang",
    venue: "Korean Journal of Materials Research", venueDetail: "33, 175–188",
    links: {},
  },
  {
    year: 2023, first: false, selected: false,
    title: "Boosted charge transport through Au-modified NiFe layered double hydroxide on silicon for efficient photoelectrochemical water oxidation",
    authors: "S. Choi, S. A. Lee, J. W. Yang, W. Sohn, J. Kim, et al., J. Moon, S. Y. Kim, H. W. Jang",
    venue: "Journal of Materials Chemistry A", venueDetail: "11, 17503–17513",
    links: {},
  },
  {
    year: 2023, first: false, selected: false,
    title: "Two-terminal lithium-mediated artificial synapses with enhanced weight modulation for feasible hardware neural networks",
    authors: "J. H. Baek, K. J. Kwak, S. J. Kim, J. Kim, I. H. Im, S. Lee, K. Kang, H. W. Jang",
    venue: "Nano-Micro Letters", venueDetail: "15, 69",
    links: {},
  },
  {
    year: 2022, first: false, selected: false,
    title: "Vertically aligned two-dimensional halide perovskites for reliably operable artificial synapses",
    authors: "S. J. Kim, T. H. Lee, J.-M. Yang, J. W. Yang, Y. J. Lee, et al., J. Kim, S. Y. Kim, D. Lee, N.-G. Park, H. W. Jang",
    venue: "Materials Today", venueDetail: "52, 19–30",
    links: {},
  },
  {
    year: 2022, first: true, selected: false,
    title: "Magnetically recyclable nanocomposites via lanthanide-based MOFs grown on natural sea sponge: screening hydrogenation of nitrophenol to aminophenol",
    authors: "K. Zhang, J. Kim, K. O. Kirlikovali, J. Wang, T. H. Lee, et al., R. S. Varma, H. W. Jang, O. K. Farha, M. Shokouhimehr",
    venue: "Molecular Catalysis", venueDetail: "528, 112459",
    links: {},
  },
  {
    year: 2022, first: true, selected: false,
    title: "Toward multicomponent single-atom catalysis for efficient electrochemical energy conversion",
    authors: "J. Kim, S. Choi, J. H. Cho, S. Y. Kim, H. W. Jang",
    venue: "ACS Materials Au", venueDetail: "2, 1–20",
    links: {},
  },
  {
    year: 2022, first: true, selected: false,
    title: "Anion exchange membrane water electrolysis for sustainable large-scale hydrogen production",
    authors: "S. A. Lee, J. Kim, K. C. Kwon, S. H. Park, H. W. Jang",
    venue: "Carbon Neutralization", venueDetail: "1, 26–48",
    links: {},
  },
  {
    year: 2022, first: false, selected: false,
    title: "MOF-derived NiFe₂O₄ nanoparticles on molybdenum disulfide: magnetically reusable nanocatalyst for the reduction of nitroaromatics in aqueous media",
    authors: "J. Wang, J. Kim, J. Bu, D. Kim, S. Y. Kim, et al., R. S. Varma, H. W. Jang, R. Luque, M. Shokouhimehr",
    venue: "Journal of Industrial and Engineering Chemistry", venueDetail: "107, 428–435",
    links: {},
  },
  {
    year: 2022, first: false, selected: false,
    title: "Ambient stable all inorganic CsCu₂I₃ artificial synapses for neurocomputing",
    authors: "K. J. Kwak, J. H. Baek, D. E. Lee, I. H. Im, J. Kim, S. J. Kim, Y. J. Lee, J. Y. Kim, H. W. Jang",
    venue: "Nano Letters", venueDetail: "22, 6010–6017",
    links: {},
  },
  {
    year: 2021, first: true, selected: true,
    title: "Catalyze materials science with machine learning",
    authors: "J. Kim, D. Kang, S. Kim, H. W. Jang",
    venue: "ACS Materials Letters", venueDetail: "3, 1151–1171",
    links: {},
  },
  {
    year: 2020, first: false, selected: false,
    title: "Lead-free dual-phase halide perovskites for preconditioned conducting-bridge memory",
    authors: "J. S. Han, Q. V. Le, H. Kim, Y. J. Lee, D. E. Lee, et al., S. J. Kim, J. Kim, S. Y. Kim, H. W. Jang",
    venue: "Small", venueDetail: "16, 2003225",
    links: {},
  },
];

// Name (substring) to bold in author lists:
const HIGHLIGHT_AUTHOR = "J. Kim";

// ---- News / updates ---------------------------------------------
// Newest first. Use "YYYY-MM" where the month is known, else "YYYY".
// `type` drives a color-coded tag: paper · talk · award · milestone.
const NEWS = [
  { date: "2026-04", type: "paper", html: "First-author paper published in <em>Nature Communications</em> — ML-guided W₁-NiFeOOH for noble-metal-free water electrolysis." },
  { date: "2025-03", type: "milestone", html: "Started postdoctoral research at Seoul National University with Prof. Jungwon Park, on electrochemical interface engineering and direct CO₂ capture." },
  { date: "2025-02", type: "milestone", html: "Completed Ph.D. in Materials Science & Engineering at Seoul National University (advisor: Prof. Ho Won Jang)." },
  { date: "2025", type: "paper", html: "Co-first-author paper on highly dense Ni single-atom catalysts for CO₂ electroreduction published in <em>Small</em>." },
  { date: "2024-03", type: "milestone", html: "Filed a Korean patent (pending) on a catalyst electrode and manufacturing method for water electrolysis." },
  { date: "2023-04", type: "talk", html: "Gave an oral presentation at the <em>MRS Spring Meeting</em> in San Francisco, USA." },
  { date: "2023", type: "paper", html: "Co-authored paper on atomically dispersed iridium catalysts for photoelectrochemical water splitting published in <em>Nature Communications</em>." },
  { date: "2022-06", type: "talk", html: "Gave an oral presentation at <em>Nano 2022</em> in Seville, Spain." },
  { date: "2021", type: "award", html: "Received Best Oral Presentation Awards at IUMRS-ICA 2021 and KIEEME 2021." },
];

// ---- CV ----------------------------------------------------------
const CV = {
  education: [
    { period: "2025 – present", org: "Seoul National University", short: "Postdoc", title: "Postdoctoral Researcher, Chemical & Biological Engineering", where: "Seoul National University — advisor: Prof. Jungwon Park", keywords: ["Electrochemical interfaces", "MLIP + MD", "MEA devices", "CO₂ capture"] },
    { period: "2020 – 2025", org: "Seoul National University", short: "Ph.D.", title: "Ph.D., Materials Science & Engineering", where: "Seoul National University — advisor: Prof. Ho Won Jang", keywords: ["Single-atom catalysts", "DFT", "operando XAS / Raman", "water electrolysis"] },
    { period: "2015 – 2019", org: "POSTECH", short: "B.S.", title: "B.S., Materials Science & Engineering (cum laude)", where: "POSTECH — advisor: Prof. Dongwha Lee", keywords: ["Materials Science"] },
  ],
  experience: [
    { period: "2022 – 2025", title: "KRISS–SNU MPI project", where: "Single-atom catalysts for anion-exchange-membrane water electrolysis" },
    { period: "2021 – 2024", title: "NRF Basic Research Laboratory", where: "Multicomponent single-atom catalysts for selective CO₂ reduction" },
  ],
  skills: [
    { label: "Computation & AI", items: "VASP, ASE, Pymatgen, LAMMPS, ML interatomic potentials, EquiformerV2 fine-tuning, adsorption-energy prediction, Python, PyTorch, HPC" },
    { label: "Catalyst synthesis", items: "Single-atom catalysts, layered oxyhydroxides, multimetallic nanostructures, electrodeposition, solvothermal, catalyst-layer engineering" },
    { label: "Operando & structure", items: "Operando Raman, synchrotron XAS/EXAFS/XANES, XPS, XRD, SEM, TEM (HAADF-STEM, IL-TEM), AFM, FT-IR" },
    { label: "Electrochemical systems", items: "Zero-gap MEA, AEM water electrolysis, CO₂ reduction, ammonia oxidation, flow-/H-cell, EIS, GC & liquid-product analysis" },
    { label: "Interfacial science", items: "PCET analysis, ionomer & membrane coupling, transport-loss diagnosis, crossover & deactivation analysis" },
  ],
  honors: [
    { period: "2021", title: "Best Oral Presentation Award", where: "IUMRS-ICA (International Union of Materials Research Societies)" },
    { period: "2021", title: "Best Oral Presentation Award", where: "KIEEME (Korean Institute of Electrical & Electronic Material Engineers)" },
    { period: "2017 – 2019", title: "Academic Excellence Scholarship", where: "POSTECH" },
    { period: "2015 – 2019", title: "National Science & Engineering Scholarship", where: "Korea Student Aid Foundation" },
  ],
  talks: [
    { period: "2023", title: "MRS Spring Meeting — oral", where: "San Francisco, USA" },
    { period: "2022", title: "Nano 2022 — oral", where: "Seville, Spain" },
    { period: "2022", title: "Nano Korea 2022 — poster", where: "Ilsan, Korea" },
    { period: "2021", title: "IUMRS-ICA 2021 — oral", where: "Jeju, Korea" },
    { period: "2021", title: "KIEEME 2021 — oral", where: "Pyeongchang, Korea" },
  ],
  patents: [
    { period: "2024 (pending)", title: "Catalyst electrode for water electrolysis, method of manufacture, and water electrolysis device", where: "J. Kim, H. W. Jang, S. H. Park — South Korea" },
  ],
};
