'use client';
import React from 'react';
import { useUser } from '@clerk/nextjs';
import { CalendarDays, Zap, ArrowRight } from 'lucide-react';
import AddNewInterview from './_components/AddNewInterview';
import InterviewList from './_components/InterviewList';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const stats = [
  { value: '12', label: 'Total interviews', note: 'This month' },
  { value: '78%', label: 'Average score', note: 'Last 5 sessions' },
  { value: '3', label: 'Upcoming', note: 'Scheduled' },
  { value: '7.5h', label: 'Practice time', note: 'This month' },
];

function Dashboard() {
  const router = useRouter();
  const { user } = useUser();
  const firstName = user?.firstName || 'there';

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 md:px-10 md:py-16">
      {/* Masthead */}
      <div className="animate-stagger">
        <p className="eyebrow">Welcome back</p>
        <h1 className="font-display text-display mt-3 text-foreground">
          Hello, {firstName}.
        </h1>
        <p className="measure mt-3 text-lg text-muted-foreground">
          Build a session, rehearse it out loud, and review the notes. Every rep
          is one fewer surprise in the real room.
        </p>
      </div>

      {/* Stat ledger */}
      <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-card p-5 md:p-6">
            <div className="nums font-display text-4xl text-foreground">
              {s.value}
            </div>
            <div className="mt-2 text-sm font-semibold text-foreground">
              {s.label}
            </div>
            <div className="text-xs text-muted-foreground">{s.note}</div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-lg border border-border bg-secondary/40 p-6 lg:col-span-2 md:p-8">
          <p className="eyebrow">Jump in</p>
          <h2 className="font-display mt-2 text-2xl text-foreground">
            Start a session
          </h2>
          <p className="measure mt-2 text-sm text-muted-foreground">
            Warm up with a quick set, or book a focused slot when you have time to
            go deep.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              className="sm:flex-1"
              onClick={() => router.push('/dashboard/quick-practice')}
            >
              <Zap className="h-4 w-4" />
              Quick practice
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="sm:flex-1"
              onClick={() => router.push('/dashboard/schedule-session')}
            >
              <CalendarDays className="h-4 w-4" />
              Schedule a session
            </Button>
          </div>
        </div>

        <AddNewInterview />
      </div>

      {/* History */}
      <div className="mt-14">
        <InterviewList />
      </div>
    </div>
  );
}

export default Dashboard;
