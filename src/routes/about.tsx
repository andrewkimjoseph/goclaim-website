import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/Shell";
import { Step } from "@/components/Step";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About | GoClaim" },
      { name: "description", content: "Learn how GoClaim automates your daily GoodDollar UBI on Celo." },
      { property: "og:title", content: "About | GoClaim" },
      { property: "og:description", content: "Learn how GoClaim automates your daily GoodDollar UBI on Celo." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <Shell nav="inner">
      <header className="mb-6">
        <h1 className="font-display font-extrabold text-3xl text-white">About GoClaim</h1>
        <p className="mt-2 text-sm text-white/80 font-sans">
          Autopilot GoodDollar UBI for verified humans on Celo.
        </p>
      </header>

      <div className="space-y-3">
        <article className="card">
          <h2 className="font-display font-bold text-lg">What is GoClaim?</h2>
          <p className="mt-2 text-sm font-sans text-black/85">
            GoClaim is a decentralized app that claims your daily GoodDollar (G$) Universal Basic Income for you. After a one-time setup, a smart account runs in the background — claiming every day at 12:00 PM UTC and sending G$ straight to your wallet. You do not need to open the app every day.
          </p>
        </article>

        <article className="card">
          <h2 className="font-display font-bold text-lg">Who is it for?</h2>
          <p className="mt-2 text-sm font-sans text-black/85">
            GoClaim is for anyone with a <strong>GoodDollar-verified root wallet</strong> on Celo. You must connect the wallet that receives your UBI — linked wallets will not work. If you have not verified yet, you can complete GoodDollar face verification from the app.
          </p>
        </article>

        <section>
          <h2 className="font-display font-bold text-white text-lg mb-3">How it works</h2>
          <div className="space-y-3">
            <Step n={1} title="Connect" description="Connect the wallet where you receive GoodDollar." />
            <Step n={2} title="Link" description="One quick approval links your GoClaim smart account to GoodDollar." />
            <Step n={3} title="Earn" description="G$ is claimed daily and sent to your wallet automatically." />
          </div>
        </section>

        <article className="card">
          <h2 className="font-display font-bold text-lg">Your wallet stays yours</h2>
          <p className="mt-2 text-sm font-sans text-black/85">
            GoClaim does not hold your personal wallet. You sign in with a free message and approve one on-chain link to GoodDollar. GoClaim operates a dedicated smart account that claims on your behalf — you control access through GoodDollar's identity system. Agent keys are encrypted at rest.
          </p>
        </article>

        <article className="card">
          <h2 className="font-display font-bold text-lg">Built with</h2>
          <ul className="mt-2 space-y-2 text-sm font-sans text-black/85">
            <li>
              <strong>
                <a href="https://celo.org" target="_blank" rel="noopener noreferrer" className="underline">Celo</a>
              </strong>{" "}— fast, low-cost blockchain for real-world payments
            </li>
            <li>
              <strong>
                <a href="https://gooddollar.org" target="_blank" rel="noopener noreferrer" className="underline">GoodDollar</a>
              </strong>{" "}— verified-human UBI and identity on Celo
            </li>
            <li>
              <strong>ERC-4337 smart accounts</strong> — gas-efficient automated claiming
            </li>
          </ul>
        </article>
      </div>

      <div className="mt-10">
        <a href="https://app.goclaim.xyz" rel="noopener noreferrer" className="btn-hero-primary">
          Open GoClaim
        </a>
      </div>
    </Shell>
  );
}