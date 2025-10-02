'use client';
import { Button } from '@/components/ui/button';
import Header from './dashboard/_components/Header';
import Footer from './dashboard/_components/Footer';
import { useState } from 'react';
import { ArrowRight, Plus, Minus } from 'lucide-react';
import Link from 'next/link';

const stats = [
  { value: '50k+', label: 'Candidates coached' },
  { value: '95%', label: 'Felt more prepared' },
  { value: '200+', label: 'Role-specific sets' },
];

const steps = [
  {
    n: '01',
    title: 'Describe the role',
    body: 'Paste the job title, the stack, and your years of experience. The questions are built for the exact seat you’re interviewing for — not a generic bank.',
  },
  {
    n: '02',
    title: 'Answer on camera',
    body: 'Speak your answers out loud, the way you will in the room. We transcribe as you go, so the pressure feels real but the stakes don’t.',
  },
  {
    n: '03',
    title: 'Hear what landed',
    body: 'Get an honest rating and specific notes per answer — what was strong, what to tighten, and the answer a hiring manager hoped to hear.',
  },
];

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Software Engineer · Google',
    content:
      'I rehearsed the exact system-design rounds three nights running. By the real interview I wasn’t nervous — I’d already had the conversation.',
    feature: true,
  },
  {
    name: 'Michael Chen',
    role: 'Product Manager · Meta',
    content:
      'The behavioral feedback was blunt in the best way. It told me which stories were wandering and where to land the point.',
  },
  {
    name: 'Emily Rodriguez',
    role: 'Data Scientist · Amazon',
    content:
      'It felt like a mentor who’d sat on the other side of the table. That’s the part most prep tools miss.',
  },
];

const faqs = [
  {
    question: 'How does the AI interviewer work?',
    answer:
      'It reads the role you describe and generates questions a real panel for that position would ask, then evaluates each spoken answer against what strong candidates tend to say — returning a rating and specific, actionable notes.',
  },
  {
    question: 'What kinds of interviews can I practice?',
    answer:
      'Technical rounds across most languages and stacks, behavioral and leadership questions, and role-specific sets for fields like product, data, finance, and design. You define the seat; the questions follow.',
  },
  {
    question: 'How accurate is the feedback?',
    answer:
      'The model is tuned on patterns from thousands of strong answers and reviewed against industry expectations. Treat it as a sharp, consistent second opinion — not a verdict — and you’ll improve fast.',
  },
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-5 pb-12 pt-16 md:px-10 md:pb-20 md:pt-24">
          <div className="grid items-end gap-12 lg:grid-cols-[1.55fr_1fr]">
            <div className="animate-stagger">
              <p className="eyebrow">AI mock interviews · for the night before</p>
              <h1 className="font-display text-marquee mt-5 text-foreground">
                Walk in
                <br />
                already <span className="text-primary">ready.</span>
              </h1>
              <p className="measure mt-7 text-lg leading-relaxed text-muted-foreground">
                Intervue is a patient interview coach. Build the exact round you’re
                facing, answer it out loud on camera, and hear precisely what to
                fix — long before it counts.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link href="/sign-in">
                  <Button size="lg" className="w-full sm:w-auto">
                    Start practicing
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link href="#how" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    See how it works
                  </Button>
                </Link>
              </div>
            </div>

            {/* Editorial stat ledger */}
            <div className="animate-fade-in border-t border-foreground/15 lg:border-l lg:border-t-0 lg:pl-8">
              <dl className="divide-y divide-border">
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="flex items-baseline justify-between py-5"
                  >
                    <dt className="text-sm text-muted-foreground">{s.label}</dt>
                    <dd className="nums font-display text-4xl text-foreground">
                      {s.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="border-t border-border bg-secondary/40">
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-10 md:py-28">
          <div className="max-w-2xl">
            <p className="eyebrow">The practice loop</p>
            <h2 className="font-display text-display mt-4 text-foreground">
              Three honest reps between you and the offer.
            </h2>
          </div>

          <div className="mt-16 grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-3">
            {steps.map((step) => (
              <div
                key={step.n}
                className="group bg-card p-8 transition-colors hover:bg-accent/40 md:p-10"
              >
                <span className="nums font-display text-5xl text-primary/80">
                  {step.n}
                </span>
                <h3 className="mt-6 text-xl font-bold tracking-tight text-foreground">
                  {step.title}
                </h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-muted-foreground">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-7xl px-5 py-20 md:px-10 md:py-28">
        <div className="max-w-2xl">
          <p className="eyebrow">From the other side of the table</p>
          <h2 className="font-display text-display mt-4 text-foreground">
            They rehearsed the room. Then they got the seat.
          </h2>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className={t.feature ? 'lg:col-span-1 lg:row-span-1' : ''}
            >
              <blockquote
                className={`font-display leading-snug text-foreground ${
                  t.feature ? 'text-2xl md:text-3xl' : 'text-xl'
                }`}
              >
                “{t.content}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-secondary text-sm font-bold text-foreground">
                  {t.name
                    .split(' ')
                    .map((w) => w[0])
                    .join('')}
                </span>
                <span>
                  <span className="block text-sm font-semibold text-foreground">
                    {t.name}
                  </span>
                  <span className="block text-xs text-muted-foreground">
                    {t.role}
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-border bg-secondary/40">
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-10 md:py-28">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="eyebrow">Questions, answered</p>
              <h2 className="font-display text-display mt-4 text-foreground">
                Before you begin.
              </h2>
            </div>

            <div className="border-t border-foreground/15">
              {faqs.map((faq, index) => {
                const open = openFaq === index;
                return (
                  <div key={index} className="border-b border-foreground/15">
                    <button
                      className="flex w-full items-center justify-between gap-6 py-6 text-left"
                      onClick={() => setOpenFaq(open ? null : index)}
                      aria-expanded={open}
                    >
                      <span className="text-lg font-semibold tracking-tight text-foreground">
                        {faq.question}
                      </span>
                      <span className="shrink-0 text-primary">
                        {open ? <Minus className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                      </span>
                    </button>
                    <div
                      className="grid transition-all duration-300 ease-out"
                      style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
                    >
                      <div className="overflow-hidden">
                        <p className="measure pb-6 text-[0.95rem] leading-relaxed text-muted-foreground">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="bg-ink text-ink-foreground">
        <div className="mx-auto max-w-7xl px-5 py-24 md:px-10 md:py-32">
          <div className="max-w-3xl">
            <h2 className="font-display text-marquee text-ink-foreground">
              Your next interview is
              <span className="text-primary"> already in here.</span>
            </h2>
            <p className="measure mt-6 text-lg leading-relaxed text-ink-foreground/70">
              Build it tonight, rehearse it twice, and let the real one feel like
              the third take.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link href="/sign-up">
                <Button size="lg" className="w-full sm:w-auto">
                  Start free
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/sign-in">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full border-ink-foreground/30 text-ink-foreground hover:border-ink-foreground/60 hover:bg-ink-foreground/[0.06] sm:w-auto"
                >
                  I have an account
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
