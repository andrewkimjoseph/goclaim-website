import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/Shell";
import { Step } from "@/components/Step";
import { AppLink } from "@/components/AppLink";
import {
  ABOUT_BLURB,
  ABOUT_SUBTITLE,
  BUILT_WITH,
  STEPS,
  TRUST_BLURB,
  TRUST_TITLE,
} from "@/lib/copy";

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
        <h1 className="font-display font-extrabold text-3xl md:text-4xl text-white">About GoClaim</h1>
        <p className="mt-2 text-sm text-white/80 font-sans">{ABOUT_SUBTITLE}</p>
      </header>

      <p className="text-sm text-white/85 font-sans leading-relaxed max-w-2xl">{ABOUT_BLURB}</p>

      <section className="mt-8">
        <h2 className="font-display font-bold text-white text-lg mb-4">How it works</h2>
        <div className="grid gap-4 max-w-2xl">
          {STEPS.map((step, i) => (
            <Step key={step.title} n={i + 1} title={step.title} description={step.description} variant="inline" />
          ))}
        </div>
      </section>

      <section className="mt-8 surface-panel lg:grid lg:grid-cols-2 lg:gap-6">
        <div>
          <h2 className="font-display font-bold text-lg">{TRUST_TITLE}</h2>
          <p className="mt-2 text-sm font-sans text-black/85">{TRUST_BLURB}</p>
        </div>
        <div>
          <h2 className="font-display font-bold text-lg">Built with</h2>
          <ul className="mt-2 space-y-2 text-sm font-sans text-black/85">
            {BUILT_WITH.map((item) => (
              <li key={item.name}>
                <strong>
                  {"href" in item ? (
                    <a href={item.href} target="_blank" rel="noopener noreferrer" className="underline">
                      {item.name}
                    </a>
                  ) : (
                    item.name
                  )}
                </strong>{" "}
                — {item.description}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <p className="mt-8 text-sm font-sans text-white/80">
        More questions?{" "}
        <Link to="/faqs" className="underline text-white hover:text-white/90">
          Read the FAQs
        </Link>
      </p>

      <div className="mt-10 w-full">
        <AppLink />
      </div>
    </Shell>
  );
}
