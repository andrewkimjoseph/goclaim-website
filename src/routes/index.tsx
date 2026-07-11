import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/Shell";
import { Step } from "@/components/Step";
import { BrandLogo } from "@/components/BrandLogo";
import { AppLink } from "@/components/AppLink";
import { HERO_SUBTITLE, HERO_TAGLINE, STEPS, WHY_GOCLAIM } from "@/lib/copy";

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
          <BrandLogo size="hero" priority className="h-32 w-32 lg:h-36 lg:w-36" />
          <h1 className="mt-6 font-display font-extrabold text-4xl md:text-5xl lg:text-6xl text-white leading-[1.05]">
            {HERO_TAGLINE}
          </h1>
          <p className="mt-4 text-base md:text-lg text-white/85 font-sans max-w-md">{HERO_SUBTITLE}</p>
          <div className="mt-8 w-full grid gap-3 md:grid-cols-2 lg:max-w-md">
            <AppLink />
            <Link to="/faqs" className="btn-hero-tertiary">
              Read FAQs
            </Link>
          </div>
        </div>

        <div className="hidden lg:block">
          <div className="space-y-3">
            {STEPS.map((step, i) => (
              <Step key={step.title} n={i + 1} title={step.title} description={step.description} variant="card" />
            ))}
          </div>
        </div>
      </section>

      <section className="mt-12 lg:hidden">
        <h2 className="font-display font-bold text-white text-lg mb-4">How it works</h2>
        <div className="grid gap-4">
          {STEPS.map((step, i) => (
            <Step key={step.title} n={i + 1} title={step.title} description={step.description} variant="inline" />
          ))}
        </div>
      </section>

      <section className="hidden lg:block mt-16">
        <h2 className="font-display font-bold text-white text-lg mb-4">Why GoClaim</h2>
        <div className="grid grid-cols-3 gap-4">
          {WHY_GOCLAIM.map((item) => (
            <div key={item.title} className="surface-inline">
              <div>
                <h3 className="font-display font-bold text-base text-white">{item.title}</h3>
                <p className="mt-1 text-sm font-sans text-white/80">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Shell>
  );
}
