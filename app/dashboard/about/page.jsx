"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const AboutUs = () => {
  const [activeTab, setActiveTab] = useState("mission");

  const teamMembers = [
    { name: "Sarah Johnson", role: "CEO & Founder", bio: "Former tech lead at Google. Ten years in AI and machine learning.", avatar: "/john2.jpeg" },
    { name: "Michael Chen", role: "CTO", bio: "MIT graduate. Full-stack and systems architecture.", avatar: "/john3.jpg" },
    { name: "Aisha Patel", role: "Head of Product", bio: "Product strategist, previously at Microsoft and Amazon.", avatar: "/john1.webp" },
    { name: "David Rodriguez", role: "Lead Developer", bio: "Open-source contributor focused on user experience.", avatar: "/john.jpeg" },
  ];

  const stats = [
    { label: "Candidates", value: "10,000+" },
    { label: "Countries", value: "45+" },
    { label: "Success rate", value: "94%" },
    { label: "Satisfaction", value: "4.9/5" },
  ];

  const values = [
    { title: "Accessibility", body: "Quality interview prep within reach for everyone, whatever their background." },
    { title: "Honesty", body: "Feedback that tells you the truth — kindly, but without flattery." },
    { title: "Calm", body: "Interviews are stressful enough. The practice shouldn’t be." },
    { title: "Craft", body: "We sweat the details so the product feels like a coach, not a tool." },
  ];

  return (
    <div>
      {/* Masthead + hero */}
      <section className="mx-auto max-w-7xl px-5 pb-16 pt-16 md:px-10 md:pb-20 md:pt-24">
        <div className="max-w-3xl">
          <p className="eyebrow">About Intervue</p>
          <h1 className="font-display text-marquee mt-5 text-foreground">
            We built the coach we wish we&apos;d had.
          </h1>
          <p className="measure mt-6 text-lg text-muted-foreground">
            Intervue helps candidates practice the real interview — the exact
            questions, answered out loud, with honest feedback — so the room
            feels familiar before you ever walk in.
          </p>
        </div>

        <div className="relative mt-12 aspect-[16/7] overflow-hidden rounded-lg border border-border">
          <Image src="/collaborate.jpg" alt="The team" fill className="object-cover" priority />
        </div>
      </section>

      {/* Stats ledger */}
      <section className="border-y border-border bg-secondary/40">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px bg-border md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-secondary/40 px-5 py-10 md:py-12">
              <div className="nums font-display text-4xl text-foreground md:text-5xl">{s.value}</div>
              <div className="mt-2 text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Story tabs */}
      <section className="mx-auto max-w-7xl px-5 py-20 md:px-10 md:py-28">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="mission">Mission</TabsTrigger>
            <TabsTrigger value="story">Story</TabsTrigger>
            <TabsTrigger value="values">Values</TabsTrigger>
          </TabsList>

          <TabsContent value="mission" className="mt-10">
            <div className="grid items-center gap-10 md:grid-cols-2">
              <div>
                <p className="eyebrow">Our mission</p>
                <h2 className="font-display mt-3 text-3xl text-foreground">
                  Level the playing field.
                </h2>
                <p className="measure mt-4 text-muted-foreground">
                  Great interview prep shouldn’t be a privilege. We make
                  affordable, realistic practice available to anyone — no matter
                  their background or experience.
                </p>
                <p className="measure mt-4 text-muted-foreground">
                  With the right preparation, anyone can succeed in a technical
                  interview and build the career they deserve.
                </p>
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-border">
                <Image src="/misson.jpg" alt="Our mission" fill className="object-cover" />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="story" className="mt-10">
            <div className="max-w-2xl">
              <p className="eyebrow">Our story</p>
              <h2 className="font-display mt-3 text-3xl text-foreground">
                From struggle to solution.
              </h2>
              <p className="measure mt-4 text-muted-foreground">
                Intervue was born from a personal struggle with technical
                interviews. After a string of rejections, our founder built her
                own preparation method — and it landed the job she wanted.
              </p>
              <p className="measure mt-4 text-muted-foreground">
                What started as a small blog in 2020 is now a platform helping
                thousands of candidates worldwide prepare for, and succeed in,
                their interviews.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="values" className="mt-10">
            <p className="eyebrow">What we stand for</p>
            <ol className="mt-6 border-t border-border md:max-w-3xl">
              {values.map((v, i) => (
                <li key={v.title} className="flex gap-5 border-b border-border py-6">
                  <span className="nums font-display text-2xl text-primary/80">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-bold text-foreground">{v.title}</h3>
                    <p className="measure mt-1 text-sm text-muted-foreground">{v.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </TabsContent>
        </Tabs>
      </section>

      {/* Team */}
      <section className="border-t border-border bg-secondary/40">
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-10 md:py-28">
          <div className="max-w-2xl">
            <p className="eyebrow">The people</p>
            <h2 className="font-display text-display mt-4 text-foreground">
              Behind the coach.
            </h2>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member) => (
              <div key={member.name} className="overflow-hidden rounded-lg border border-border bg-card">
                <div className="relative aspect-[4/5] bg-secondary">
                  <Image src={member.avatar} alt={member.name} fill className="object-cover" />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-foreground">{member.name}</h3>
                  <p className="text-sm text-primary">{member.role}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ink text-ink-foreground">
        <div className="mx-auto max-w-7xl px-5 py-24 md:px-10 md:py-28">
          <div className="max-w-2xl">
            <h2 className="font-display text-display text-ink-foreground">
              Ready when you are.
            </h2>
            <p className="measure mt-4 text-lg text-ink-foreground/70">
              Whether it’s next week’s interview or a skill you want to sharpen,
              we’re here to help you walk in ready.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/sign-up"><Button size="lg">Get started</Button></Link>
              <Link href="/dashboard/upgrade">
                <Button size="lg" variant="outline" className="border-ink-foreground/30 text-ink-foreground hover:border-ink-foreground/60 hover:bg-ink-foreground/[0.06]">
                  View plans
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
