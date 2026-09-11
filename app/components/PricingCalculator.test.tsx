import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import PricingCalculator from "./PricingCalculator";

// Pricing rules under test (from the component):
//   Team = $49 base + $18/seat, annual billing = 15% off, premium support = +$99/mo
//   formatUSD rounds to whole dollars.

function estimatedTotal() {
  return screen.getByText("Estimated total").nextElementSibling as HTMLElement;
}

describe("PricingCalculator", () => {
  it("should show the Team plan at 10 seats with the annual discount by default", () => {
    render(<PricingCalculator />);
    // (49 + 18 * 10) * 0.85 = 194.65 -> "$195"
    expect(estimatedTotal()).toHaveTextContent("$195");
  });

  it("should recalculate when the plan changes", async () => {
    const user = userEvent.setup();
    render(<PricingCalculator />);
    await user.click(screen.getByRole("button", { name: "Business" }));
    // (199 + 30 * 10) * 0.85 = 424.15 -> "$424"
    expect(estimatedTotal()).toHaveTextContent("$424");
  });

  it("should add premium support to the total", async () => {
    const user = userEvent.setup();
    render(<PricingCalculator />);
    await user.click(screen.getByRole("button", { name: "Toggle premium support" }));
    // (49 + 18 * 10 + 99) * 0.85 = 278.8 -> "$279"
    expect(estimatedTotal()).toHaveTextContent("$279");
  });

  it("should restore plan, seats, annual billing, and premium support to defaults", async () => {
    const user = userEvent.setup();
    render(<PricingCalculator />);

    // Move every input away from its default.
    await user.click(screen.getByRole("button", { name: "Business" }));
    await user.click(screen.getByRole("button", { name: "Toggle premium support" }));
    await user.click(screen.getByRole("button", { name: "Monthly" }));
    // Business + premium + monthly is far from the default total.
    expect(estimatedTotal()).not.toHaveTextContent("$195");

    await user.click(screen.getByRole("button", { name: "Reset to defaults" }));

    // Team, 10 seats, annual (-15%), no premium support: (49 + 18 * 10) * 0.85 -> "$195"
    expect(estimatedTotal()).toHaveTextContent("$195");
    // Annual discount line is only rendered when annual billing is on.
    expect(screen.getByText(/Billed annually/)).toBeInTheDocument();
  });
});
