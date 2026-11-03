"use client";

import { useState } from "react";

const EXAMPLE =
  "Write an idea\nTurn it into text\nGenerate a visual\nShare with your team";

const FEATURES = [
  {
    icon: "✍️",
    title: "Paste your text",
    body: "Drop in notes, a process or an idea. No design skills needed.",
  },
  {
    icon: "✨",
    title: "Get instant visuals",
    body: "Your words become a clean diagram in a single click.",
  },
  {
    icon: "🎨",
    title: "Make it yours",
    body: "Change colors and layout, then export to share anywhere.",
  },
];

/** Split text into short steps (one per line, or per sentence). */
function toSteps(text: string): string[] {
  return text
    .split(/\n|(?<=[.!?])\s+/)
    .map((s) => s.replace(/^[-*\d.\s]+/, "").trim())
    .filter(Boolean)
    .slice(0, 8);
}

export default function Home() {
  const [text, setText] = useState("");
  const [steps, setSteps] = useState<string[]>([]);

  const generate = () => setSteps(toSteps(text));

  return (
    <div className="relative flex-1 overflow-hidden">
      <div className="glow -top-32 -left-24 h-96 w-96 bg-brand" />
      <div className="glow top-40 -right-24 h-96 w-96 bg-brand-2" />

      {/* Navbar */}
      <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <span className="text-lg font-bold">
          Diagram<span className="gradient-text">AI</span>
        </span>
        <nav className="hidden gap-8 text-sm text-muted sm:flex">
          <a href="#try" className="transition hover:text-foreground">Try it</a>
          <a href="#features" className="transition hover:text-foreground">Features</a>
        </nav>
        <a
          href="#try"
          id="nav-cta"
          className="glass rounded-full px-5 py-2 text-sm font-medium transition hover:bg-white/10"
        >
          Get started
        </a>
      </header>

      <main className="relative z-10 mx-auto max-w-6xl px-6">
        {/* Hero */}
        <section className="pt-16 pb-12 text-center sm:pt-24">
          <p className="glass mx-auto mb-6 w-fit rounded-full px-4 py-1.5 text-xs text-muted">
            ✨ Turn text into visuals
          </p>
          <h1 className="mx-auto max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
            Your words, instantly turned into{" "}
            <span className="gradient-text">beautiful diagrams</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base text-muted sm:text-lg">
            Paste any text and get a clear visual in seconds. Great for
            presentations, docs and quick sketches.
          </p>
        </section>

        {/* Try it */}
        <section id="try" className="glass mx-auto max-w-3xl rounded-3xl p-6 sm:p-8">
          <label htmlFor="prompt" className="mb-3 block text-sm font-medium">
            What do you want to visualize?
          </label>
          <textarea
            id="prompt"
            rows={5}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type one step per line..."
            className="w-full resize-none rounded-2xl border border-white/10 bg-black/30 p-4 text-sm outline-none transition placeholder:text-muted focus:border-brand focus:ring-2 focus:ring-brand/40"
          />
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              id="generate-btn"
              onClick={generate}
              disabled={!text.trim()}
              className="rounded-full bg-gradient-to-r from-brand to-brand-2 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/30 transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
            >
              Generate visual
            </button>
            <button
              id="example-btn"
              onClick={() => setText(EXAMPLE)}
              className="rounded-full px-5 py-3 text-sm text-muted transition hover:text-foreground"
            >
              Use an example
            </button>
          </div>

          {steps.length > 0 && (
            <div className="mt-8 flex flex-col items-center gap-2">
              {steps.map((step, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div
                    className="pop-in glass w-72 max-w-full rounded-2xl px-5 py-3 text-center text-sm font-medium"
                    style={{ animationDelay: `${i * 120}ms` }}
                  >
                    <span className="gradient-text mr-2 font-bold">{i + 1}</span>
                    {step}
                  </div>
                  {i < steps.length - 1 && (
                    <span className="py-1 text-muted">↓</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Features */}
        <section id="features" className="grid gap-5 py-24 sm:grid-cols-3">
          {FEATURES.map((f) => (
            <article
              key={f.title}
              className="glass rounded-3xl p-6 transition hover:-translate-y-1 hover:bg-white/10"
            >
              <div className="mb-4 text-3xl">{f.icon}</div>
              <h2 className="mb-2 text-lg font-semibold">{f.title}</h2>
              <p className="text-sm text-muted">{f.body}</p>
            </article>
          ))}
        </section>
      </main>

      <footer className="relative z-10 pb-10 text-center text-xs text-muted">
        © {new Date().getFullYear()} Diagram AI. Built as a learning project.
      </footer>
    </div>
  );
}
