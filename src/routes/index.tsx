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
      <section className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-12">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <img src="/brand/watermelon.png" alt="GoClaim" width={128} height={128} className="h-32 w-32 lg:h-36 lg:w-36" />
          <h1 className="mt-6 font-display font-extrabold text-4xl md:text-5xl lg:text-6xl text-white leading-[1.05]">
            Your UBI, on autopilot.
          </h1>
          <p className="mt-4 text-base md:text-lg text-white/85 font-sans max-w-md">
            GoClaim creates a smart account that claims GoodDollar for you every day and sends G$ straight to your wallet.
          </p>
          <div className="mt-8 w-full grid gap-3 md:grid-cols-2 lg:max-w-md">
            <a href="https://app.goclaim.xyz" rel="noopener noreferrer" className="btn-hero-primary">
              Get started
            </a>
            <a href="/faqs" className="btn-hero-tertiary">Read FAQs</a>
          </div>
        </div>

        <div className="hidden lg:block">
          <div className="space-y-3">
            <Step n={1} title="Connect" description="Connect the wallet where you receive GoodDollar." />
            <Step n={2} title="Link" description="One quick approval links your GoClaim smart account to GoodDollar." />
            <Step n={3} title="Earn" description="G$ is claimed daily and sent to your wallet automatically." />
          </div>
        </div>
      </section>

      <section className="mt-12 lg:hidden">
        <h2 className="font-display font-bold text-white text-lg mb-4">How it works</h2>
        <div className="grid gap-3 md:grid-cols-3">
          <Step n={1} title="Connect" description="Connect the wallet where you receive GoodDollar." />
          <Step n={2} title="Link" description="One quick approval links your GoClaim smart account to GoodDollar." />
          <Step n={3} title="Earn" description="G$ is claimed daily and sent to your wallet automatically." />
        </div>
      </section>

      <section className="hidden lg:block mt-16">
        <h2 className="font-display font-bold text-white text-lg mb-4">Why GoClaim</h2>
        <div className="grid grid-cols-3 gap-3">
          <div className="card">
            <h3 className="font-display font-bold text-base">Set it once</h3>
            <p className="mt-2 text-sm font-sans text-black/80">A one-time GoodDollar link, then nothing to remember.</p>
          </div>
          <div className="card">
            <h3 className="font-display font-bold text-base">Daily at 12:00 UTC</h3>
            <p className="mt-2 text-sm font-sans text-black/80">Claims run every day and land in your wallet right after.</p>
          </div>
          <div className="card">
            <h3 className="font-display font-bold text-base">Your wallet, your G$</h3>
            <p className="mt-2 text-sm font-sans text-black/80">G$ goes straight to the verified wallet you connected.</p>
          </div>
        </div>
      </section>
    </Shell>
  );
}
