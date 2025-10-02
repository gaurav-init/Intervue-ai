'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Github, Linkedin, Twitter, ArrowUpRight } from 'lucide-react';

const columns = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '/dashboard/features' },
      { label: 'Pricing', href: '/dashboard/upgrade' },
      { label: 'Quick practice', href: '/dashboard/quick-practice' },
      { label: 'Schedule a session', href: '/dashboard/schedule-session' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/dashboard/about' },
      { label: 'Contact', href: '/dashboard/contacts' },
    ],
  },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const year = 2026;

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.includes('@') && email.includes('.')) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
          {/* Brand + manifesto */}
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-3xl leading-none tracking-tight">
                Intervue
              </span>
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
                AI
              </span>
            </div>
            <p className="measure mt-5 max-w-xs text-sm leading-relaxed text-ink-foreground/65">
              A patient AI coach for the night before. Practice the real room,
              hear what landed and what didn&apos;t, and walk in ready.
            </p>
            <div className="mt-6 flex gap-3">
              {[
                { Icon: Twitter, label: 'Twitter' },
                { Icon: Linkedin, label: 'LinkedIn' },
                { Icon: Github, label: 'GitHub' },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-ink-foreground/20 text-ink-foreground/70 transition-colors hover:border-primary hover:text-primary"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="eyebrow !text-ink-foreground/45">{col.title}</h3>
              <ul className="mt-5 space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center text-sm text-ink-foreground/75 transition-colors hover:text-ink-foreground"
                    >
                      {link.label}
                      <ArrowUpRight
                        size={13}
                        className="ml-0.5 opacity-0 transition-opacity group-hover:opacity-100"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div>
            <h3 className="eyebrow !text-ink-foreground/45">Field notes</h3>
            <p className="mt-5 text-sm leading-relaxed text-ink-foreground/65">
              Occasional, useful interview craft. No spam.
            </p>
            <form onSubmit={handleSubscribe} className="mt-4">
              <div className="flex items-center border-b border-ink-foreground/25 focus-within:border-primary">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  className="w-full bg-transparent py-2 text-sm text-ink-foreground placeholder:text-ink-foreground/40 focus:outline-none"
                />
                <button
                  type="submit"
                  className="shrink-0 text-sm font-semibold text-primary transition-opacity hover:opacity-80"
                >
                  Join
                </button>
              </div>
              {subscribed && (
                <p className="mt-2 text-xs text-primary">
                  Thanks — you&apos;re on the list.
                </p>
              )}
            </form>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-ink-foreground/15 pt-6 text-xs text-ink-foreground/50 sm:flex-row sm:items-center">
          <p>© {year} Intervue AI. All rights reserved.</p>
          <div className="flex flex-wrap gap-5">
            <Link href="/dashboard/about" className="transition-colors hover:text-ink-foreground">
              Privacy
            </Link>
            <Link href="/dashboard/about" className="transition-colors hover:text-ink-foreground">
              Terms
            </Link>
            <Link href="/dashboard/contacts" className="transition-colors hover:text-ink-foreground">
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
