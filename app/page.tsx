import { ButtonLink } from "@/components/ui/button";
import { Badge } from "@/components/ui/status-badge";

const features = [
  {
    icon: "🛰️",
    title: "Satellite MRV",
    body: "AI models cross-check geotagged plantation uploads against satellite imagery to block fraud.",
  },
  {
    icon: "⛓️",
    title: "On-chain registry",
    body: "Verified projects mint tokenized carbon credits on an Ethereum-backed registry.",
  },
  {
    icon: "🌿",
    title: "Blue carbon focus",
    body: "Mangroves, seagrass and salt marshes — ecosystems that store carbon far faster than forests.",
  },
];

const steps = [
  ["Upload", "Field teams submit geotagged plantation data."],
  ["Verify", "Verifiers + AI confirm the restoration is real."],
  ["Approve", "Admins sign off and issue carbon credits."],
  ["Trade", "Credits are listed and traded on the marketplace."],
];

export default function Landing() {
  return (
    <div className="min-h-screen">
      {/* nav */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
        <span className="text-lg font-bold text-ocean-700">🌊 AquaCreds</span>
        <div className="flex items-center gap-2">
          <ButtonLink href="/login" variant="ghost" size="sm">
            Log in
          </ButtonLink>
          <ButtonLink href="/signup" size="sm">
            Get started
          </ButtonLink>
        </div>
      </header>

      {/* hero */}
      <section className="mx-auto max-w-6xl px-5 pb-16 pt-10 text-center">
        <Badge className="mb-5">🏆 Smart India Hackathon 2025 Finalist</Badge>
        <h1 className="mx-auto max-w-3xl text-4xl font-bold leading-tight text-ink sm:text-5xl">
          Transparent, tokenized{" "}
          <span className="text-ocean-600">blue carbon</span> credits
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600">
          AquaCreds is an AI + blockchain MRV platform that verifies coastal
          ecosystem restoration and issues trustworthy carbon credits.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <ButtonLink href="/signup" size="lg">
            Start a project
          </ButtonLink>
          <ButtonLink href="/login" variant="outline" size="lg">
            Explore demo
          </ButtonLink>
        </div>

        {/* hero panel */}
        <div className="mx-auto mt-14 grid max-w-4xl gap-4 rounded-3xl border border-ocean-100 bg-gradient-to-br from-ocean-50 to-white p-6 sm:grid-cols-3">
          {[
            ["1,120", "Credits issued"],
            ["73 ha", "Area restored"],
            ["4", "Active projects"],
          ].map(([v, l]) => (
            <div key={l} className="rounded-2xl bg-white/70 p-5">
              <p className="text-3xl font-bold text-ocean-700">{v}</p>
              <p className="mt-1 text-sm text-slate-500">{l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* features */}
      <section className="mx-auto max-w-6xl px-5 py-12">
        <div className="grid gap-5 sm:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-slate-200 bg-white p-6"
            >
              <div className="text-3xl">{f.icon}</div>
              <h3 className="mt-3 font-semibold text-ink">{f.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* how it works */}
      <section className="mx-auto max-w-6xl px-5 py-12">
        <h2 className="text-center text-2xl font-bold text-ink">How it works</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(([t, b], i) => (
            <div key={t} className="rounded-2xl border border-slate-200 bg-white p-5">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-ocean-600 font-semibold text-white">
                {i + 1}
              </div>
              <h3 className="mt-3 font-semibold text-ink">{t}</h3>
              <p className="mt-1 text-sm text-slate-600">{b}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-slate-200 py-8 text-center text-sm text-slate-400">
        Built by Team VISSDOM · AquaCreds · Demo build
      </footer>
    </div>
  );
}
