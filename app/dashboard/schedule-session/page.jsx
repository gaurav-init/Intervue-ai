'use client'

import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { ArrowLeft, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useRouter } from 'next/navigation';

const interviewTypes = [
  { id: "frontend", name: "Frontend Development" },
  { id: "backend", name: "Backend Development" },
  { id: "fullstack", name: "Full Stack Development" },
  { id: "devops", name: "DevOps" },
  { id: "data", name: "Data Science" },
  { id: "product", name: "Product Management" },
  { id: "design", name: "UX/UI Design" },
];

const timeSlots = ["09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"];

const steps = [
  { n: 1, label: "Interview type" },
  { n: 2, label: "Date & time" },
  { n: 3, label: "Details" },
];

const ScheduleSession = () => {
  const router = useRouter();
  const [date, setDate] = useState(null);
  const [timeSlot, setTimeSlot] = useState("");
  const [interviewType, setInterviewType] = useState("");
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); router.push('/dashboard'); }, 1500);
  };

  const goBack = () => {
    if (step > 1) setStep(step - 1);
    else router.push('/dashboard');
  };

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 md:px-10 md:py-16">
      <Button variant="ghost" className="mb-6 -ml-2" onClick={goBack}>
        <ArrowLeft className="h-4 w-4" /> Back
      </Button>

      <div className="mb-10">
        <p className="eyebrow">Schedule</p>
        <h1 className="font-display text-display mt-3 text-foreground">Plan your next session.</h1>
        <p className="measure mt-3 text-lg text-muted-foreground">
          Three quick steps and it&apos;s on the calendar.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[260px_1fr]">
        {/* Step rail */}
        <ol className="flex gap-6 lg:flex-col lg:gap-0">
          {steps.map((s, i) => {
            const done = step > s.n;
            const active = step === s.n;
            return (
              <li key={s.n} className={`flex items-center gap-3 lg:py-4 ${i > 0 ? 'lg:border-t lg:border-border' : ''}`}>
                <span className={cnStep(done, active)}>
                  {done ? <Check className="h-4 w-4" /> : s.n}
                </span>
                <span className={`text-sm font-semibold ${active || done ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {s.label}
                </span>
              </li>
            );
          })}
        </ol>

        {/* Content */}
        <div className="rounded-lg border border-border bg-card p-6 md:p-8">
          <div className="border-b border-border pb-5">
            <h2 className="font-display text-2xl text-foreground">
              {step === 1 && "What would you like to practice?"}
              {step === 2 && "Pick a date and time"}
              {step === 3 && "A few last details"}
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="pt-6">
            {/* Step 1 */}
            {step === 1 && (
              <div className="overflow-hidden rounded-lg border border-border">
                {interviewTypes.map((type, i) => {
                  const selected = interviewType === type.id;
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setInterviewType(type.id)}
                      className={`flex w-full items-center justify-between p-4 text-left transition-colors ${i > 0 ? 'border-t border-border' : ''} ${selected ? 'bg-accent/40' : 'hover:bg-accent/30'}`}
                    >
                      <span className="font-medium text-foreground">{type.name}</span>
                      <span className={`flex h-5 w-5 items-center justify-center rounded-full border ${selected ? 'border-primary bg-primary text-primary-foreground' : 'border-border'}`}>
                        {selected && <Check className="h-3 w-3" />}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <div className="space-y-8">
                <div>
                  <Label className="eyebrow mb-3 block">Date</Label>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-lg border border-border p-4"
                    disabled={(d) => d < new Date()}
                  />
                </div>
                <div>
                  <Label className="eyebrow mb-3 block">Time slot</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map((time) => {
                      const selected = timeSlot === time;
                      return (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setTimeSlot(time)}
                          className={`nums rounded-md border p-2.5 text-center text-sm transition-colors ${selected ? 'border-primary bg-primary text-primary-foreground' : 'border-border hover:bg-accent/40'}`}
                        >
                          {time}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <div className="space-y-5">
                <div className="space-y-1.5">
                  <Label htmlFor="title">Session title</Label>
                  <Input id="title" placeholder="e.g. React Developer interview practice" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="experience-level">Experience level</Label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Select experience level" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="junior">Junior (0–2 years)</SelectItem>
                      <SelectItem value="mid">Mid-level (3–5 years)</SelectItem>
                      <SelectItem value="senior">Senior (5+ years)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="notes">Preparation notes</Label>
                  <Textarea id="notes" placeholder="Any specific topics or technologies to focus on…" rows={4} value={notes} onChange={(e) => setNotes(e.target.value)} />
                </div>
              </div>
            )}

            <div className="mt-8 flex justify-between border-t border-border pt-6">
              {step > 1 ? (
                <Button type="button" variant="outline" onClick={() => setStep(step - 1)}>Previous</Button>
              ) : <span />}
              {step < 3 ? (
                <Button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  disabled={(step === 1 && !interviewType) || (step === 2 && (!date || !timeSlot))}
                >
                  Continue
                </Button>
              ) : (
                <Button type="submit" disabled={loading || !title}>
                  {loading ? 'Scheduling…' : 'Schedule session'}
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

function cnStep(done, active) {
  const base = "nums flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold";
  if (done) return `${base} bg-primary text-primary-foreground`;
  if (active) return `${base} border border-primary text-primary`;
  return `${base} border border-border text-muted-foreground`;
}

export default ScheduleSession;
