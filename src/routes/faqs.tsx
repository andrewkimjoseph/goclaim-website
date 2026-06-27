import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/Shell";
import { Faq } from "@/components/Faq";

const FAQS = [
  { q: "What is GoClaim?", a: "GoClaim claims your daily GoodDollar UBI for you and sends G$ to your wallet automatically." },
  { q: "Who can use it?", a: "Anyone with a GoodDollar-verified root wallet on Celo. Linked wallets won't work — connect the wallet that receives your UBI." },
  { q: "How does setup work?", a: "Connect your wallet, sign in, then link your GoClaim smart account to GoodDollar once. After that, claims run on their own." },
  { q: "When are claims made?", a: "Every day at 12:00 PM UTC. G$ is sent to your wallet right after each claim." },
  { q: "Where does my G$ go?", a: "Straight to the root wallet you connected — the same wallet where you receive GoodDollar." },
  { q: "What is the smart account?", a: "A GoClaim-managed account on Celo that claims UBI on your behalf. You approve it once in GoodDollar, then it runs in the background." },
  { q: "Do I need to come back every day?", a: "No. After setup, GoClaim handles daily claims automatically. Check your dashboard anytime to see claim history." },
  { q: "Is sign-in free?", a: "Yes. Sign-in uses a free wallet message — no gas fee. You only pay gas for the one-time GoodDollar link step." },
];

export const Route = createFileRoute("/faqs")({
  head: () => ({
    meta: [
      { title: "FAQs | GoClaim" },
      { name: "description", content: "Frequently asked questions about GoClaim and autopilot GoodDollar UBI." },
      { property: "og:title", content: "FAQs | GoClaim" },
      { property: "og:description", content: "Frequently asked questions about GoClaim and autopilot GoodDollar UBI." },
      { property: "og:url", content: "/faqs" },
    ],
    links: [{ rel: "canonical", href: "/faqs" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: FaqsPage,
});

function FaqsPage() {
  return (
    <Shell nav="inner">
      <div className="lg:grid lg:grid-cols-[18rem_1fr] lg:gap-10">
        <header className="mb-6 lg:mb-0">
          <h1 className="font-display font-extrabold text-3xl md:text-4xl text-white">FAQs</h1>
          <p className="mt-2 text-sm text-white/80 font-sans">Quick answers about how GoClaim works.</p>
          <div className="hidden lg:block mt-8 max-w-xs">
            <a href="https://app.goclaim.xyz" rel="noopener noreferrer" className="btn-hero-primary">
              Get started
            </a>
          </div>
        </header>

        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-2">
          {FAQS.map((f) => (
            <Faq key={f.q} q={f.q} a={f.a} />
          ))}
        </div>
      </div>

      <div className="mt-10 lg:hidden max-w-sm">
        <a href="https://app.goclaim.xyz" rel="noopener noreferrer" className="btn-hero-primary">
          Get started
        </a>
      </div>
    </Shell>
  );
}