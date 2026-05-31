import { SignIn } from '@clerk/nextjs';
import Link from 'next/link';

const clerkAppearance = {
  elements: {
    rootBox: 'w-full',
    card: 'shadow-none bg-transparent p-0',
    headerTitle: 'hidden',
    headerSubtitle: 'hidden',
    socialButtonsBlockButton:
      'border border-border bg-card hover:bg-accent/40 text-foreground',
    dividerLine: 'bg-border',
    dividerText: 'text-muted-foreground',
    formFieldLabel: 'text-foreground font-medium',
    formFieldInput:
      'border-input bg-background focus:ring-2 focus:ring-ring/40',
    formButtonPrimary:
      'bg-primary hover:bg-primary/90 text-primary-foreground font-semibold normal-case',
    footerActionLink: 'text-primary hover:text-primary/80',
  },
};

export default function SignInPage() {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Brand panel */}
      <aside className="relative hidden flex-col justify-between bg-ink p-12 text-ink-foreground lg:flex lg:w-1/2">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="font-display text-3xl leading-none tracking-tight">
            Intervue
          </span>
          <span className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
            AI
          </span>
        </Link>

        <div className="max-w-md">
          <p className="eyebrow !text-ink-foreground/45">Welcome back</p>
          <h1 className="font-display mt-4 text-4xl leading-tight xl:text-5xl">
            The room is waiting. Let&apos;s rehearse it once more.
          </h1>
          <p className="measure mt-6 text-ink-foreground/70">
            Pick up where you left off — your sessions, your scores, and the
            notes on what to tighten next.
          </p>
        </div>

        <figure className="max-w-md border-t border-ink-foreground/15 pt-6">
          <blockquote className="font-display text-xl leading-snug">
            “By the real interview I wasn&apos;t nervous — I&apos;d already had
            the conversation.”
          </blockquote>
          <figcaption className="mt-3 text-sm text-ink-foreground/55">
            Sarah J. · Software Engineer, Google
          </figcaption>
        </figure>
      </aside>

      {/* Form */}
      <main className="flex w-full flex-col items-center justify-center px-6 py-12 md:px-12 lg:w-1/2">
        <div className="w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <Link href="/" className="flex items-baseline gap-2">
              <span className="font-display text-2xl tracking-tight text-foreground">
                Intervue
              </span>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                AI
              </span>
            </Link>
          </div>
          <p className="eyebrow">Sign in</p>
          <h2 className="font-display mt-2 text-3xl text-foreground">
            Continue your prep
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            New here?{' '}
            <Link href="/sign-up" className="font-semibold text-primary hover:underline">
              Create an account
            </Link>
          </p>

          <div className="mt-8">
            <SignIn appearance={clerkAppearance} />
          </div>
        </div>
      </main>
    </div>
  );
}
