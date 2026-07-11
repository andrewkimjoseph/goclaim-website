export const APP_URL = "https://app.goclaim.xyz";
export const OPEN_GOCLAIM_LABEL = "Open GoClaim";

export const HERO_TAGLINE = "Your UBI, on autopilot.";
export const HERO_SUBTITLE =
  "GoClaim claims GoodDollar daily and sends G$ straight to your wallet.";

export const ABOUT_SUBTITLE = "Autopilot GoodDollar UBI for verified humans on Celo.";
export const ABOUT_BLURB =
  "GoClaim is a decentralized app that claims your daily GoodDollar UBI for you. After a one-time setup, a smart account runs in the background — no daily check-ins needed.";

export const STEPS = [
  { title: "Connect", description: "Connect the wallet where you receive GoodDollar." },
  { title: "Link", description: "One quick approval links your GoClaim smart account to GoodDollar." },
  { title: "Earn", description: "G$ is claimed daily and sent to your wallet automatically." },
] as const;

export const WHY_GOCLAIM = [
  { title: "Set it once", description: "A one-time GoodDollar link, then nothing to remember." },
  { title: "Daily at 12:00 UTC", description: "Claims run every day and land in your wallet right after." },
  { title: "Your wallet, your G$", description: "G$ goes straight to the verified wallet you connected." },
] as const;

export const TRUST_TITLE = "Your wallet stays yours";
export const TRUST_BLURB =
  "You sign in with a free message and approve one on-chain link. GoClaim operates a dedicated smart account that claims on your behalf — agent keys are encrypted at rest.";

export const BUILT_WITH = [
  {
    name: "Celo",
    href: "https://celo.org",
    description: "Fast, low-cost blockchain for real-world payments",
  },
  {
    name: "GoodDollar",
    href: "https://gooddollar.org",
    description: "Verified-human UBI and identity on Celo",
  },
  {
    name: "ERC-4337 smart accounts",
    description: "Gas-efficient automated claiming",
  },
] as const;

export const FAQS = [
  {
    q: "What is GoClaim?",
    a: "GoClaim claims your daily GoodDollar UBI and sends G$ to your wallet automatically.",
  },
  {
    q: "Who can use it?",
    a: "Anyone with a GoodDollar-verified root wallet on Celo. Linked wallets won't work.",
  },
  {
    q: "How does setup work?",
    a: "Connect your wallet, sign in, then link your GoClaim smart account to GoodDollar once.",
  },
  {
    q: "When are claims made?",
    a: "Every day at 12:00 PM UTC. G$ is sent to your wallet right after each claim.",
  },
  {
    q: "Where does my G$ go?",
    a: "Straight to the root wallet you connected — where you receive GoodDollar.",
  },
  {
    q: "What is the smart account?",
    a: "A GoClaim-managed account on Celo that claims UBI on your behalf after one GoodDollar approval.",
  },
  {
    q: "Do I need to come back every day?",
    a: "No. After setup, GoClaim handles daily claims automatically.",
  },
  {
    q: "Is sign-in free?",
    a: "Yes. Sign-in uses a free wallet message. You only pay gas for the one-time GoodDollar link.",
  },
] as const;
