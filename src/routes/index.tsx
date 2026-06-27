import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/Shell";
import { Step } from "@/components/Step";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GoClaim | Your UBI, on autopilot." },
      { name: "description", content: "GoClaim claims GoodDollar for you every day and sends it straight to your wallet." },
      { property: "og:title", content: "GoClaim | Your UBI, on autopilot." },
      { property: "og:description", content: "GoClaim claims GoodDollar for you every day and sends it straight to your wallet." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <Shell nav="home">
      <section className="flex flex-col items-center text-center">
        <img src="/brand/watermelon.png" alt="GoClaim" width={128} height={128} className="h-32 w-32" />
        <h1 className="mt-6 font-display font-extrabold text-4xl text-white leading-tight">
          Your UBI, on autopilot.
        </h1>
        <p className="mt-4 text-base text-white/85 font-sans">
          GoClaim creates a smart account that claims GoodDollar for you every day and sends G$ straight to your wallet.
        </p>
        <div className="mt-8 flex flex-col gap-3 w-full">
          <a href="https://app.goclaim.xyz" rel="noopener noreferrer" className="btn-hero-primary">
            Get started
          </a>
          <a href="/faqs" className="btn-hero-tertiary">Read FAQs</a>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-display font-bold text-white text-lg mb-4">How it works</h2>
        <div className="space-y-3">
          <Step n={1} title="Connect" description="Connect the wallet where you receive GoodDollar." />
          <Step n={2} title="Link" description="One quick approval links your GoClaim smart account to GoodDollar." />
          <Step n={3} title="Earn" description="G$ is claimed daily and sent to your wallet automatically." />
        </div>
      </section>
    </Shell>
  );
}
