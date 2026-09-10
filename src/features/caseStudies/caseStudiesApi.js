export const CASE_STUDY_CATEGORIES = ["Web", "Mobile", "AI", "Blockchain"];

const CASE_STUDIES = [
  {
    id: "cs-01",
    title: "Telehealth Patient Portal",
    category: "Web",
    summary:
      "HIPAA-aware appointment booking, video consults and e-prescriptions for a regional clinic network.",
    year: 2024,
  },
  {
    id: "cs-02",
    title: "Fitness Coaching App",
    category: "Mobile",
    summary:
      "Cross-platform React Native app with offline workout plans, wearables sync and in-app subscriptions.",
    year: 2023,
  },
  {
    id: "cs-03",
    title: "Support Ticket Triage Assistant",
    category: "AI",
    summary:
      "LLM-powered classification and reply drafting that cut first-response time by 60% for a SaaS help desk.",
    year: 2024,
  },
  {
    id: "cs-04",
    title: "NFT Marketplace",
    category: "Blockchain",
    summary:
      "ERC-721 minting, auctions and royalty splits with a wallet-first checkout on Polygon.",
    year: 2022,
  },
  {
    id: "cs-05",
    title: "Construction Bid Management",
    category: "Web",
    summary:
      "Role-based workflows for estimators and subcontractors, with document e-signature and deadline tracking.",
    year: 2023,
  },
  {
    id: "cs-06",
    title: "Grocery Delivery for Vendors",
    category: "Mobile",
    summary:
      "Multi-vendor ordering, live courier tracking and cash-on-delivery reconciliation across 12 cities.",
    year: 2024,
  },
  {
    id: "cs-07",
    title: "Competitor Research Copilot",
    category: "AI",
    summary:
      "Automated SEO audits, competitor monitoring and campaign briefs generated from a single product description.",
    year: 2025,
  },
  {
    id: "cs-08",
    title: "Supply Chain Provenance Ledger",
    category: "Blockchain",
    summary:
      "Immutable batch tracking for food exporters with QR verification for end customers.",
    year: 2023,
  },
  {
    id: "cs-09",
    title: "Sports League Portal",
    category: "Web",
    summary:
      "Fixtures, live scores and fan memberships served to 200k monthly users with sub-second page loads.",
    year: 2022,
  },
  {
    id: "cs-10",
    title: "Survey & Feedback Analytics",
    category: "AI",
    summary:
      "Sentiment clustering and theme extraction over open-text survey responses with an executive dashboard.",
    year: 2025,
  },
];

const LATENCY_MS = 800;
const FAILURE_RATE = 0.15;

/**
 * Mock API: resolves after ~800ms with a fresh copy of the seed data.
 * Rejects ~15% of the time with Error("Network failed").
 * Accepts an optional AbortSignal so in-flight requests can be cancelled.
 */
export function fetchCaseStudies({ signal } = {}) {
  return new Promise((resolve, reject) => {
    let timer = null;

    const onAbort = () => {
      clearTimeout(timer);
      reject(new DOMException("Aborted", "AbortError"));
    };

    if (signal) {
      if (signal.aborted) {
        onAbort();
        return;
      }
      signal.addEventListener("abort", onAbort, { once: true });
    }

    timer = setTimeout(() => {
      signal?.removeEventListener("abort", onAbort);
      if (Math.random() < FAILURE_RATE) {
        reject(new Error("Network failed"));
        return;
      }
      resolve(CASE_STUDIES.map((item) => ({ ...item })));
    }, LATENCY_MS);
  });
}
