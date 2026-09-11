"use client";

import { useMemo, useState } from "react";

type Plan = "Starter" | "Team" | "Business";

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function formatUSD(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function PricingCalculator() {
  // Inputs
  const [plan, setPlan] = useState<Plan>("Team");
  const [seats, setSeats] = useState<number>(10);
  const [annual, setAnnual] = useState<boolean>(true);
  const [premiumSupport, setPremiumSupport] = useState<boolean>(false);

  // Pricing rules (easy to tweak later)
  const pricing = useMemo(() => {
    const safeSeats = clamp(Number.isFinite(seats) ? seats : 0, 1, 250);

    const planConfig: Record<Plan, { base: number; perSeat: number }> = {
      Starter: { base: 0, perSeat: 12 },
      Team: { base: 49, perSeat: 18 },
      Business: { base: 199, perSeat: 30 },
    };

    const { base, perSeat } = planConfig[plan];

    // Subtotal (monthly)
    const monthlySubtotal = base + perSeat * safeSeats;

    // Add-ons (monthly)
    const supportAddOn = premiumSupport ? 99 : 0;

    const monthlyTotal = monthlySubtotal + supportAddOn;

    // Billing
    const annualDiscountRate = 0.15; // 15% off for annual billing
    const billedMonthly = annual ? monthlyTotal * (1 - annualDiscountRate) : monthlyTotal;

    // Helpful derived numbers
    const billedPerYear = billedMonthly * 12;
    const effectivePerSeat = billedMonthly / safeSeats;

    return {
      safeSeats,
      monthlySubtotal,
      supportAddOn,
      monthlyTotal,
      billedMonthly,
      billedPerYear,
      effectivePerSeat,
      annualDiscountRate,
    };
  }, [plan, seats, annual, premiumSupport]);

  return (
    <section className="mt-16 w-full max-w-4xl rounded-2xl border-2 border-pink-500/70 bg-black/60 p-6 shadow-[0_0_30px_rgba(236,72,153,0.7)] backdrop-blur-md">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-pink-300 drop-shadow-[0_0_10px_rgba(236,72,153,0.9)]">
            Pricing Calculator
          </h2>
          <p className="mt-1 text-sm text-cyan-200/80">
            Adjust seats, plan, and add-ons. No database or API required.
          </p>
        </div>

        <div className="mt-2 inline-flex items-center gap-2 rounded-full border-2 border-pink-400/50 bg-black/40 p-1 shadow-[0_0_15px_rgba(236,72,153,0.5)]">
          <button
            type="button"
            onClick={() => setAnnual(false)}
            className={`rounded-full px-3 py-1 text-sm transition ${
              !annual
                ? "bg-pink-400/20 text-pink-200 shadow-[0_0_10px_rgba(236,72,153,0.6)]"
                : "text-pink-300/70 hover:text-pink-200"
            }`}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setAnnual(true)}
            className={`rounded-full px-3 py-1 text-sm transition ${
              annual
                ? "bg-pink-400/20 text-pink-200 shadow-[0_0_10px_rgba(236,72,153,0.6)]"
                : "text-pink-300/70 hover:text-pink-200"
            }`}
          >
            Annual <span className="ml-1 text-xs text-pink-300/70">(-15%)</span>
          </button>
        </div>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {/* Controls */}
        <div className="rounded-xl border-2 border-pink-400/50 bg-black/50 p-5 shadow-[0_0_20px_rgba(236,72,153,0.4)]">
          <div className="space-y-5">
            {/* Plan */}
            <div>
              <label className="text-sm font-medium text-pink-300">Plan</label>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {(["Starter", "Team", "Business"] as Plan[]).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPlan(p)}
                    className={`rounded-lg border-2 px-3 py-2 text-sm transition ${
                      plan === p
                        ? "border-pink-400/70 bg-pink-400/20 text-pink-200 shadow-[0_0_10px_rgba(236,72,153,0.6)]"
                        : "border-pink-400/40 bg-black/30 text-pink-300/70 hover:text-pink-200 hover:border-pink-400/60"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Seats */}
            <div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-pink-300">Seats</label>
                <span className="text-sm tabular-nums text-pink-200 font-semibold">
                  {pricing.safeSeats}
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={250}
                value={pricing.safeSeats}
                onChange={(e) => setSeats(parseInt(e.target.value, 10))}
                className="mt-3 w-full accent-pink-500"
              />
              <div className="mt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setSeats((s) => clamp(s - 5, 1, 250))}
                  className="rounded-lg border-2 border-pink-400/40 bg-black/30 px-3 py-2 text-sm text-pink-300 hover:bg-pink-400/10 hover:border-pink-400/60 transition"
                >
                  -5
                </button>
                <button
                  type="button"
                  onClick={() => setSeats((s) => clamp(s + 5, 1, 250))}
                  className="rounded-lg border-2 border-pink-400/40 bg-black/30 px-3 py-2 text-sm text-pink-300 hover:bg-pink-400/10 hover:border-pink-400/60 transition"
                >
                  +5
                </button>
                <div className="ml-auto flex items-center gap-2">
                  <label className="text-sm text-pink-300/80">Exact</label>
                  <input
                    type="number"
                    min={1}
                    max={250}
                    value={pricing.safeSeats}
                    onChange={(e) => setSeats(clamp(parseInt(e.target.value || "1", 10), 1, 250))}
                    className="w-24 rounded-lg border-2 border-pink-400/50 bg-black/40 px-3 py-2 text-sm text-pink-200 outline-none focus:border-pink-400/80 focus:shadow-[0_0_10px_rgba(236,72,153,0.6)]"
                  />
                </div>
              </div>
            </div>

            {/* Add-ons */}
            <div className="rounded-lg border-2 border-pink-400/40 bg-black/30 p-4 shadow-[0_0_15px_rgba(236,72,153,0.3)]">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-pink-300">Premium Support</p>
                  <p className="mt-1 text-xs text-pink-200/70">
                    Priority response and guided setup.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setPremiumSupport((v) => !v)}
                  className={`h-7 w-12 rounded-full border-2 transition ${
                    premiumSupport
                      ? "border-pink-400/70 bg-pink-400/20 shadow-[0_0_10px_rgba(236,72,153,0.6)]"
                      : "border-pink-400/40 bg-black/40"
                  }`}
                  aria-label="Toggle premium support"
                >
                  <div
                    className={`h-5 w-5 rounded-full transition ${
                      premiumSupport
                        ? "translate-x-6 bg-pink-500 shadow-[0_0_10px_rgba(236,72,153,1)]"
                        : "translate-x-1 bg-pink-400/50"
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Small note */}
            <p className="text-xs text-pink-300/60">
              Tip: Try weird inputs (0 seats, 999 seats, blank number) and we&apos;ll debug
              behaviors together.
            </p>
          </div>
        </div>

        {/* Output */}
        <div className="rounded-xl border-2 border-pink-400/50 bg-black/50 p-5 shadow-[0_0_20px_rgba(236,72,153,0.4)]">
          <div className="flex items-baseline justify-between">
            <p className="text-sm text-pink-300/80">Estimated total</p>
            <p className="text-3xl font-semibold tabular-nums text-pink-200 drop-shadow-[0_0_10px_rgba(236,72,153,0.9)]">
              {formatUSD(pricing.billedMonthly)}
              <span className="ml-2 text-sm font-normal text-pink-300/70">/mo</span>
            </p>
          </div>

          {annual && (
            <p className="mt-2 text-sm text-pink-200/70">
              Billed annually:{" "}
              <span className="font-medium text-pink-200">{formatUSD(pricing.billedPerYear)}</span>{" "}
              <span className="text-pink-300/60">
                (includes {(pricing.annualDiscountRate * 100).toFixed(0)}% discount)
              </span>
            </p>
          )}

          <div className="mt-6 space-y-3 rounded-lg border-2 border-pink-400/40 bg-black/30 p-4 text-sm shadow-[0_0_15px_rgba(236,72,153,0.3)]">
            <div className="flex items-center justify-between">
              <span className="text-pink-300/80">Plan</span>
              <span className="text-pink-200 font-semibold">{plan}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-pink-300/80">Seats</span>
              <span className="text-pink-200 font-semibold tabular-nums">{pricing.safeSeats}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-pink-300/80">Subtotal (monthly)</span>
              <span className="text-pink-200 font-semibold tabular-nums">
                {formatUSD(pricing.monthlySubtotal)}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-pink-300/80">Premium Support</span>
              <span className="text-pink-200 font-semibold tabular-nums">
                {formatUSD(pricing.supportAddOn)}
              </span>
            </div>

            <div className="mt-2 border-t border-pink-400/40 pt-3 flex items-center justify-between">
              <span className="text-pink-300/80">Effective per seat</span>
              <span className="text-pink-200 font-semibold tabular-nums">
                {formatUSD(pricing.effectivePerSeat)}/mo
              </span>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => {
                setPlan("Team");
                setSeats(10);
                setAnnual(true);
                setPremiumSupport(false);
              }}
              className="rounded-lg border-2 border-pink-400/40 bg-black/30 px-4 py-2 text-sm text-pink-300 hover:bg-pink-400/10 hover:border-pink-400/60 transition"
            >
              Reset
            </button>

            <button
              type="button"
              onClick={() => {
                // Intentionally simple: this is a great place to practice errors later
                alert(
                  `Plan: ${plan}\nSeats: ${pricing.safeSeats}\nBilling: ${
                    annual ? "Annual" : "Monthly"
                  }\nTotal: ${formatUSD(pricing.billedMonthly)}/mo`,
                );
              }}
              className="rounded-lg bg-pink-400/20 border-2 border-pink-400/50 px-4 py-2 text-sm text-pink-200 hover:bg-pink-400/30 hover:shadow-[0_0_15px_rgba(236,72,153,0.6)] transition"
            >
              Copy summary (demo)
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
