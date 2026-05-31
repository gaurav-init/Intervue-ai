'use client'
import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from 'next/link';

const features = [
  {
    title: 'Role-specific question sets',
    description: 'Questions generated from the exact title, stack, and seniority you’re interviewing for — not a generic bank.',
  },
  {
    title: 'Speak your answers out loud',
    description: 'Answer on camera with live transcription, so you practice the delivery and not just the talking points.',
  },
  {
    title: 'A rating on every answer',
    description: 'Each response is scored 1–10 against what strong candidates tend to say, so you know where you actually stand.',
  },
  {
    title: 'A strong answer to compare',
    description: 'See a model response next to your own and close the gap between what you said and what landed.',
  },
  {
    title: 'Progress across sessions',
    description: 'Track scores and response times over time, and watch the nerves give way to fluency.',
  },
  {
    title: 'Practice on your schedule',
    description: 'Warm up for five minutes or run a full loop at midnight. The coach is always available.',
  },
];

const stats = [
  { value: '50k+', label: 'Candidates coached' },
  { value: '95%', label: 'Felt more prepared' },
  { value: '200+', label: 'Role-specific sets' },
  { value: '1M+', label: 'Answers reviewed' },
];

const demos = {
  technical: {
    label: 'Technical',
    prompt: 'Implement a function to find the longest palindromic substring in a string.',
    response: 'I’d expand around each center — every index, plus each gap — tracking the longest window where the left and right characters match…',
    bars: [
      { label: 'Algorithm knowledge', score: '9.0/10', width: '90%' },
      { label: 'Code quality', score: '8.5/10', width: '85%' },
      { label: 'Complexity reasoning', score: '7.5/10', width: '75%' },
    ],
    note: 'Strong grasp of the expand-around-center approach. Correct O(n²) / O(1) solution. Next time, name the trade-off against the DP table out loud.',
  },
  behavioral: {
    label: 'Behavioral',
    prompt: 'Describe a challenging project and how you got through the obstacles.',
    response: 'I led five engineers redesigning a customer portal on top of legacy systems. The resistance was the real problem, so I built a migration plan that addressed each concern…',
    bars: [
      { label: 'Structure (STAR)', score: '8.5/10', width: '85%' },
      { label: 'Specific outcomes', score: '9.0/10', width: '90%' },
      { label: 'Conciseness', score: '7.5/10', width: '75%' },
    ],
    note: 'Great use of a concrete metric (42% satisfaction lift). Tighten the setup — you reach the result a little late. Land the stakes in one sentence.',
  },
  cultural: {
    label: 'Culture fit',
    prompt: 'How do you approach collaboration with cross-functional teams?',
    response: 'I start by understanding each team’s objectives and constraints, then make the requirements transparent in one shared space everyone can see…',
    bars: [
      { label: 'Team orientation', score: '8.5/10', width: '85%' },
      { label: 'Conflict resolution', score: '9.0/10', width: '90%' },
      { label: 'Adaptability', score: '8.0/10', width: '80%' },
    ],
    note: 'Clear, structured, and backed by a measurable result. The rotating-facilitation detail is memorable — keep concrete touches like that.',
  },
};

const IntervueAIFeaturePage = () => {
  const [activeDemo, setActiveDemo] = useState('technical');

  return (
    <div>
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-5 pb-16 pt-16 md:px-10 md:pb-24 md:pt-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div className="animate-stagger">
            <p className="eyebrow">What you get</p>
            <h1 className="font-display text-marquee mt-5 text-foreground">
              Everything you need to walk in ready.
            </h1>
            <p className="measure mt-6 text-lg text-muted-foreground">
              Intervue turns interview prep into something you can practice —
              real questions, real answers out loud, and a coach that tells you
              the truth.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/sign-up">
                <Button size="lg" className="w-full sm:w-auto">
                  Start free <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="#demo">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  See a sample review
                </Button>
              </Link>
            </div>
          </div>

          {/* Live-session sheet */}
          <div className="animate-fade-in rounded-lg border border-border bg-card p-6">
            <span className="eyebrow">In session</span>
            <p className="mt-4 font-display text-xl leading-snug text-foreground">
              “What’s your approach to debugging a complex issue in production?”
            </p>
            <div className="mt-5 flex items-center gap-2 border-t border-border pt-4 text-sm text-muted-foreground">
              <span className="flex h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
              Transcribing your answer…
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border bg-secondary/40">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px bg-border md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-secondary/40 px-5 py-10 text-center md:py-12">
              <div className="nums font-display text-4xl text-foreground md:text-5xl">
                {s.value}
              </div>
              <div className="mt-2 text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Feature list */}
      <section className="mx-auto max-w-7xl px-5 py-20 md:px-10 md:py-28">
        <div className="max-w-2xl">
          <p className="eyebrow">The toolkit</p>
          <h2 className="font-display text-display mt-4 text-foreground">
            Built around how interviews actually feel.
          </h2>
        </div>

        <ol className="mt-14 border-t border-border">
          {features.map((f, i) => (
            <li
              key={f.title}
              className="grid grid-cols-1 gap-2 border-b border-border py-7 md:grid-cols-[80px_1fr_1.4fr] md:gap-8 md:py-8"
            >
              <span className="nums font-display text-3xl text-primary/80">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="text-xl font-bold tracking-tight text-foreground">
                {f.title}
              </h3>
              <p className="measure text-[0.95rem] leading-relaxed text-muted-foreground">
                {f.description}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* Demo */}
      <section id="demo" className="border-t border-border bg-secondary/40">
        <div className="mx-auto max-w-4xl px-5 py-20 md:px-10 md:py-28">
          <div className="max-w-2xl">
            <p className="eyebrow">A sample review</p>
            <h2 className="font-display text-display mt-4 text-foreground">
              See the kind of notes you’ll get.
            </h2>
          </div>

          <Tabs defaultValue="technical" className="mt-12" onValueChange={setActiveDemo}>
            <TabsList className="grid w-full grid-cols-3">
              {Object.entries(demos).map(([key, d]) => (
                <TabsTrigger key={key} value={key}>{d.label}</TabsTrigger>
              ))}
            </TabsList>

            {Object.entries(demos).map(([key, d]) => (
              <TabsContent key={key} value={key} className="mt-8">
                <div className="overflow-hidden rounded-lg border border-border bg-card">
                  <div className="border-b border-border p-5">
                    <span className="eyebrow">Question</span>
                    <p className="mt-2 font-medium text-foreground">{d.prompt}</p>
                  </div>
                  <div className="border-b border-border bg-background/60 p-5">
                    <span className="eyebrow">Your answer</span>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {d.response}
                    </p>
                  </div>
                  <div className="p-5 md:p-6">
                    <span className="eyebrow">Coach&apos;s read</span>
                    <div className="mt-4 space-y-4">
                      {d.bars.map((b) => (
                        <div key={b.label}>
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-medium text-foreground">{b.label}</span>
                            <span className="nums text-muted-foreground">{b.score}</span>
                          </div>
                          <div className="mt-1.5 h-1.5 rounded-full bg-muted">
                            <div
                              className="h-1.5 rounded-full bg-primary"
                              style={{ width: b.width }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="measure mt-5 border-t border-border pt-4 text-sm leading-relaxed text-muted-foreground">
                      {d.note}
                    </p>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ink text-ink-foreground">
        <div className="mx-auto max-w-7xl px-5 py-24 md:px-10 md:py-28">
          <h2 className="font-display text-display max-w-2xl text-ink-foreground">
            Try it on the role you&apos;re chasing.
          </h2>
          <div className="mt-8">
            <Link href="/sign-up">
              <Button size="lg">
                Start free <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IntervueAIFeaturePage;
