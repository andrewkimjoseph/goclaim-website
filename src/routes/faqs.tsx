import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Shell } from "@/components/Shell";
import { Faq } from "@/components/Faq";
import { AppLink } from "@/components/AppLink";
import { FAQS } from "@/lib/copy";

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
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  return (
    <Shell nav="inner">
      <div className="lg:grid lg:grid-cols-[18rem_1fr] lg:gap-10">
        <header className="mb-6 lg:mb-0">
          <h1 className="font-display font-extrabold text-3xl md:text-4xl text-white">FAQs</h1>
          <p className="mt-2 text-sm text-white/80 font-sans">Quick answers about how GoClaim works.</p>
          <div className="hidden lg:block mt-8 w-full">
            <AppLink />
          </div>
        </header>

        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-2 auto-rows-min items-start">
          {FAQS.map((f, i) => (
            <Faq
              key={f.q}
              q={f.q}
              a={f.a}
              open={openIdx === i}
              onToggle={() => setOpenIdx((cur) => (cur === i ? null : i))}
            />
          ))}
        </div>
      </div>

      <div className="mt-10 lg:hidden w-full">
        <AppLink />
      </div>
    </Shell>
  );
}
