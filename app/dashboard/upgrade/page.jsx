"use client";

import React, { useState } from "react";
import planData from "@/utils/planData";
import PlanItemCard from "./_components/PlanItemCard";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

function Upgrade() {
  const [billingCycle, setBillingCycle] = useState("monthly");

  const popularPlanIndex =
    planData.findIndex((plan) => plan.isPopular) !== -1
      ? planData.findIndex((plan) => plan.isPopular)
      : 1;

  return (
    <div className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-24">
      {/* Masthead */}
      <div className="max-w-2xl">
        <p className="eyebrow">Plans</p>
        <h1 className="font-display text-display mt-3 text-foreground">
          Practice as much as it takes.
        </h1>
        <p className="measure mt-4 text-lg text-muted-foreground">
          Start free. Upgrade when you want unlimited sessions, practice
          questions, and a coach in your corner for the whole search.
        </p>
      </div>

      {/* Billing toggle */}
      <div className="mt-10">
        <Tabs value={billingCycle} onValueChange={setBillingCycle}>
          <TabsList className="grid w-72 grid-cols-2">
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="yearly">
              Yearly
              <span className="ml-1.5 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                −20%
              </span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Plan sheets — shared hairline borders */}
      <div className="mt-10 grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-3">
        {planData.map((plan, index) => (
          <PlanItemCard
            key={index}
            plan={{
              ...plan,
              cost:
                billingCycle === "yearly"
                  ? Math.round(plan.cost * 0.8)
                  : plan.cost,
            }}
            isPopular={index === popularPlanIndex}
          />
        ))}
      </div>

      {/* Testimonial band */}
      <figure className="mt-16 border-t border-border pt-12">
        <blockquote className="font-display max-w-3xl text-2xl leading-snug text-foreground md:text-3xl">
          “The premium sessions were the difference. I walked into the FAANG
          loop having already had every conversation once.”
        </blockquote>
        <figcaption className="mt-5 text-sm text-muted-foreground">
          Sarah J. · Software Engineer
        </figcaption>
      </figure>

      <p className="mt-12 text-sm text-muted-foreground">
        Questions about a plan?{" "}
        <a href="/dashboard/contacts" className="font-semibold text-primary hover:underline">
          Talk to us
        </a>
        .
      </p>
    </div>
  );
}

export default Upgrade;
