import { SignUp } from '@clerk/nextjs';
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

const value = [
  {
    n: '01',
    title: 'Built for your exact role',
    body: 'Questions generated from the title, stack, and seniority you’re actually interviewing for.',
  },
  {
    n: '02',
    title: 'Answer out loud, on camera',
    body: 'Practice the delivery, not just the answer. The pressure feels real; the stakes don’t.',
  },
  {
    n: '03',
    title: 'Honest, specific feedback',
    body: 'A rating and clear notes per answer — what landed, and what a panel hoped to hear.',
  },
];

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Brand / value panel */}
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
          <p className="eyebrow !text-ink-foreground/45">Start free</p>
          <h1 className="font-display mt-4 text-4xl leading-tight xl:text-5xl">
            Walk in already ready.
          </h1>
          <ol className="mt-10 space-y-7">
            {value.map((v) => (
              <li key={v.n} className="flex gap-5">
                <span className="nums font-display text-2xl text-primary/80">
                  {v.n}
                </span>
                <div>
                  <h3 className="font-semibold text-ink-foreground">{v.title}</h3>
                  <p className="measure mt-1 text-sm text-ink-foreground/65">
                    {v.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <p className="text-sm text-ink-foreground/45">
          Free to start. No card required.
        </p>
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
          <p className="eyebrow">Create account</p>
          <h2 className="font-display mt-2 text-3xl text-foreground">
            Make your first session
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Already practicing?{' '}
            <Link href="/sign-in" className="font-semibold text-primary hover:underline">
              Sign in
            </Link>
          </p>

          <div className="mt-8">
            <SignUp appearance={clerkAppearance} />
          </div>
        </div>
      </main>
    </div>
  );
}
