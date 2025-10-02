"use client";

import { useUser } from "@clerk/nextjs";
import React from "react";
import { Check, Minus, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function parseOffering(raw) {
  const text = (raw || "").trim();
  const included = text.startsWith("✔️");
  const label = text.replace(/^✔️/, "").replace(/^❌/, "").trim();
  return { included, label };
}

function PlanItemCard({ plan, isPopular }) {
  const { user } = useUser();

  return (
    <div
      className={cn(
        "flex h-full flex-col p-7 md:p-8",
        isPopular ? "bg-ink text-ink-foreground" : "bg-card text-foreground"
      )}
    >
      <div className="flex items-center justify-between">
        <span
          className={cn(
            "eyebrow",
            isPopular && "!text-ink-foreground/50"
          )}
        >
          {plan.name}
        </span>
        {isPopular && (
          <span className="rounded-full bg-primary px-2.5 py-0.5 text-xs font-semibold text-primary-foreground">
            Recommended
          </span>
        )}
      </div>

      <div className="mt-5 flex items-baseline gap-1">
        <span className="nums font-display text-5xl">${plan.cost}</span>
        <span
          className={cn(
            "text-sm",
            isPopular ? "text-ink-foreground/60" : "text-muted-foreground"
          )}
        >
          /month
        </span>
      </div>

      <ul
        className={cn(
          "mt-7 flex-1 space-y-px border-t",
          isPopular ? "border-ink-foreground/15" : "border-border"
        )}
      >
        {plan.offering.map((item, index) => {
          const { included, label } = parseOffering(item.value);
          return (
            <li
              key={index}
              className={cn(
                "flex items-center gap-3 border-b py-3 text-sm",
                isPopular ? "border-ink-foreground/15" : "border-border"
              )}
            >
              {included ? (
                <Check className="h-4 w-4 shrink-0 text-primary" />
              ) : (
                <Minus
                  className={cn(
                    "h-4 w-4 shrink-0",
                    isPopular ? "text-ink-foreground/35" : "text-muted-foreground/50"
                  )}
                />
              )}
              <span
                className={cn(
                  !included &&
                    (isPopular
                      ? "text-ink-foreground/40"
                      : "text-muted-foreground/70")
                )}
              >
                {label}
              </span>
            </li>
          );
        })}
      </ul>

      <Button
        className={cn("mt-7 w-full")}
        variant={isPopular ? "default" : "outline"}
        size="lg"
        onClick={() => {
          if (plan.paymentLink) window.location.href = `${plan.paymentLink}`;
        }}
      >
        {user ? "Get started" : "Sign up & start"}
        <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
  );
}

export default PlanItemCard;
